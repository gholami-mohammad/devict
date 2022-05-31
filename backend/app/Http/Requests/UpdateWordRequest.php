<?php

namespace App\Http\Requests;

use App\Models\Language;
use App\Rules\WordUnique;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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
            'language_alpha2code' => ['required', Rule::exists((new Language())->getTable(), 'alpha2code')],
        ];
    }
}
