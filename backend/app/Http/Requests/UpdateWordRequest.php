<?php

namespace App\Http\Requests;

use App\Rules\LanguageExists;
use App\Rules\WordUnique;
use Illuminate\Foundation\Http\FormRequest;

class UpdateWordRequest extends FormRequest
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
            'word' => ['required', new WordUnique($this->route('word')->id)],
            'language_alpha2code' => ['required', new LanguageExists()],
        ];
    }
}
