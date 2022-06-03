<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReviewRequest;
use App\Http\Requests\UpdateReviewRequest;
use App\Models\Review;
use App\Models\Step;
use App\Models\Word;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();
        $qry = Word::with([
            'language',
            'translations',
            'translations.language',
            'translations.partOfSpeech',
            'reviews',
            'step',
        ])
        ->where('created_by_id', $user->id)
        ->whereRaw('(
        (words.step_id IS NULL and words.archived = 0) OR
        (SELECT DATE_ADD(words.last_review, INTERVAL (SELECT days from steps where words.step_id = steps.id) DAY) ) <= (SELECT DATE_ADD(NOW(), INTERVAL 8 HOUR) )
        )')
        ->orderBy('step_id', 'DESC')
        ->orderBy('last_review', 'asc');
        $words = $qry->paginate(50);

        return response()->json($words);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreReviewRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreReviewRequest $request, Word $word)
    {
        DB::beginTransaction();
        $this->authorize('view', $word);

        // if word is archived => no review needed
        if ($word->archived) {
            $this->messageResponse('This word is archived!', 422);
        }

        $now = now();
        $remembered = $request->remembered == 'true' ? true : false;
        $lastestStep = Step::max('id');
        $currentStep = intval($word->step_id); // if step_id is null; then $currentStep will be set to 0
        $reviewStep = $currentStep == 0 ? 1 : $currentStep;
        $nextStep = $currentStep + 1; // nextStep may be larger than the lastestStep but it will be handled

        // check if word can be reivewd now?
        $canBeReviewed = $this->canWordBeReviewd($word, $errorMessage);
        if (!$canBeReviewed) {
            return $this->messageResponse($errorMessage, 422);
        }

        // user don't remember the word
        // the word will move to step 1
        if (!$remembered) {
            $word->step_id = 1;
            $word->archived = false;
            $word->fail_reviews_count += 1;
            $word->total_reviews_count += 1;
            $word->last_review = $now;
            $word->save();
        } else if ($currentStep == $lastestStep) {
            // word is in the last step and remembered
            // word review cycle finished and it must be archived

            $word->step_id = null;
            $word->archived = true;
            $word->success_reviews_count = 0;
            $word->fail_reviews_count = 0;
            $word->total_reviews_count = 0;
            $word->last_review = null;
            $word->save();
        } else {
            $word->step_id = $nextStep;
            $word->archived = false;
            $word->success_reviews_count += 1;
            $word->total_reviews_count += 1;
            $word->last_review = $now;
            $word->save();
        }

        $review = new Review();
        $review->word_id = $word->id;
        $review->step_id = $reviewStep;
        $review->remembered = $remembered;
        $review->save();

        DB::commit();

        return $this->saveResponse('reviewd', $word);
    }


    /**
     * Check if the given word could be reviewed at this time
     *
     * @param Word $word
     * @return boolean
     */
    private function canWordBeReviewd(Word $word, &$error = null): bool
    {
        // new word to review
        if ($word->step_id == null) {
            return true;
        }

        /**
         * @var \Carbon\Carbon
         */
        $lastReview = $word->last_review;

        // no data about last review
        if (!$lastReview) {
            return true;
        }

        $step = $word->step;

        $lastReviewTimestamp = $lastReview->getTimestamp();
        $timeDiffSeconds = time() - $lastReviewTimestamp;
        $nextReview = $lastReviewTimestamp + ($step->days * (24 * 60 * 60));

        // next review can be done 8 hours before the exact time
        $minReviewAvailable = $nextReview - (8 * 60 * 60);
        if ($minReviewAvailable >= time()) {
            $error = sprintf(
                'Your last review was at %s and next reviwe will be available at %s.',
                $lastReview->format('Y-m-d H:i:s'),
                date('Y-m-d H:i:s', $minReviewAvailable)
            );

            return false;
        }

        return true;
    }
}
