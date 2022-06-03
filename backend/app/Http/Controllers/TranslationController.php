<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTranslationRequest;
use App\Http\Requests\UpdateTranslationRequest;
use App\Models\Language;
use App\Models\Translation;
use App\Models\Word;
use App\Repository\WordRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TranslationController extends Controller
{
    /**
     * Display a listing of the resource.
     * @param \Illuminate\Http\Request $r
     * @return \Illuminate\Http\Response
     */
    public function index(Request $r)
    {
        $this->validate($r, ['word_id' => 'required|numeric', 'lang' => 'required']);

        $word = Word::where('id', $r->input('word_id'))->firstOrFail();
        $language = Language::where('alpha2code', $r->input('lang'))->firstOrFail();

        $this->authorize('view', $word);
        $repo = new WordRepository();
        $trans = $repo->getTranslations($word->id, $language->alpha2code);
        return response()->json($trans);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreTranslationRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTranslationRequest $request)
    {
        $word = Word::where('id', $request->word_id)->first();
        $this->authorize('view', $word);

        $translationToSave = strtolower($request->input('translation', null));

        $translation = new Translation();
        $translation->translation = $translationToSave;
        $translation->language_alpha2code = $request->input('language_alpha2code', null);
        $translation->part_of_speech_name = $request->part_of_speech_name;
        $translation->definition = $request->definition;
        $translation->example = $request->example;
        $translation->word_id = $request->word_id;
        $translation->created_by_id = Auth::user()->id;
        $translation->save();

        return $this->saveResponse('Translation created.', $translation);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Translation  $translation
     * @return \Illuminate\Http\Response
     */
    public function show(Translation $translation)
    {
        $this->authorize('view', $translation);
        return response()->json($translation);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateTranslationRequest  $request
     * @param  \App\Models\Translation  $translation
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateTranslationRequest $request, Translation $translation)
    {
        $word = Word::where('id', $request->word_id)->first();
        $this->authorize('view', $word);

        $this->authorize('update', $translation);

        $translationToSave = strtolower($request->input('translation', null));

        $translation->translation = $translationToSave;
        $translation->language_alpha2code = $request->input('language_alpha2code', null);
        $translation->part_of_speech_name = $request->part_of_speech_name;
        $translation->definition = $request->definition;
        $translation->example = $request->example;
        $translation->word_id = $request->word_id;
        $translation->created_by_id = Auth::user()->id;
        $translation->save();

        return $this->saveResponse('Translation updated.', $translation);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Translation  $translation
     * @return \Illuminate\Http\Response
     */
    public function destroy(Translation $translation)
    {
        $this->authorize('delete', $translation);
        $translation->delete();
        return $this->messageResponse('Translation deleted!', 200);
    }
}
