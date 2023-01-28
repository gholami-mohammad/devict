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

        $searchedtext = trim($r->input('q'));

        $qry = Word::with(['reviews', 'step'])
        ->where('created_by_id', $user->id);

        if (!empty($searchedtext)) {
            $qry = $qry->where('word', 'like', "%$searchedtext%");
        }
        $items = $qry->orderBy('id', 'desc')
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
        $wordToSave = $request->input('word', null);
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
        $word->load(['translations', 'reviews', 'step']);
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
        $wordToSave = $request->input('word', null);
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
