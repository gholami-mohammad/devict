<?php

namespace App\Rules;

use App\Models\Translation;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Auth;

class TranslationUnique implements Rule
{
    private $ignoreID;
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct(int $ignoreID = null)
    {
        $this->ignoreID = $ignoreID;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $qry = Translation::where('translation', strtolower($value))->where('created_by_id', Auth::user()->id);
        if ($this->ignoreID) {
            $qry = $qry->where('id', '<>', $this->ignoreID);
        }
        $dbItem = $qry->first();
        if (!$dbItem) {
            return true;
        }

        return false;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'This Translation exists.';
    }
}
