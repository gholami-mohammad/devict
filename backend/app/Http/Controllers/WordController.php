<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWordRequest;
use App\Http\Requests\UpdateWordRequest;
use App\Models\Word;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class WordController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $r)
    {
        $user = Auth::user();

        $items = Word::with(['reviews', 'translations']);

        $todayReview = $r->input('today_review', null);
        if ($todayReview && ($todayReview == true || $todayReview == 'true')) {
            $items = $items->whereRaw('(
            (words.step_id IS NULL and words.archived = 0) OR
            (SELECT DATE_ADD(words.last_review, INTERVAL (SELECT days from steps where words.step_id = steps.id) DAY) ) <= (SELECT DATE_ADD(?, INTERVAL 8 HOUR) ) OR
            (words.last_review >=  DATE_ADD(?, INTERVAL -1 MINUTE) )
            )', [new \DateTime(), new \DateTime()]);
        }
        $items = $items
        ->where('created_by_id', $user->id)
        ->orderBy('step_id', 'desc')
        ->orderBy('id', 'desc')
        ->paginate($r->input('per_page', 50));

        return response()->json($items);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreWordRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreWordRequest $request)
    {
        $wordToSave = strtolower($request->input('word', null));
        $from = $request->input('language_alpha2code', null);

        $word = new Word();
        $word->word = $wordToSave;
        $word->language_alpha2code = $from;
        $word->created_by_id = Auth::user()->id;
        $word->save();

        $word->translations;

        return $this->saveResponse('Word created.', $word);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Word  $word
     * @return \Illuminate\Http\Response
     */
    public function show(Word $word)
    {
        $this->authorize('view', $word);
        $word->translations;
        return response()->json($word);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateWordRequest  $request
     * @param  \App\Models\Word  $word
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateWordRequest $request, Word $word)
    {
        $this->authorize('update', $word);
        $wordToSave = strtolower($request->input('word', null));
        $from = $request->input('language_alpha2code', null);

        $word->word = $wordToSave;
        $word->language_alpha2code = $from;
        $word->created_by_id = Auth::user()->id;
        $word->save();

        $word->translations;

        return $this->saveResponse('Word updated.', $word);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Word  $word
     * @return \Illuminate\Http\Response
     */
    public function destroy(Word $word)
    {
        $this->authorize('delete', $word);
        $word->delete();
        return $this->messageResponse('Word deleted!', 200);
    }
}
