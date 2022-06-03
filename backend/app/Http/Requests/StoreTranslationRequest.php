<?php

namespace App\Http\Requests;

use App\Models\Language;
use App\Models\PartOfSpeech;
use App\Models\Word;
use App\Rules\TranslationUnique;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTranslationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'part_of_speech_name' => ['nullable', Rule::exists((new PartOfSpeech())->getTable(), 'name')],
            'translation' => ['required', new TranslationUnique(null)],
            'language_alpha2code' => ['required', Rule::exists((new Language())->getTable(), 'alpha2code')],
            'word_id' => ['required'],
        ];
    }
}
