<?php

namespace App\Repository;

use App\Models\Translation;
use App\Models\Word;

class WordRepository
{
    public function findWord(string $word, $languageAlpha2Code, $ownerID = null)
    {
        $qry = Word::query()
        ->where('word', $word)
        ->where('language_alpha2code', $languageAlpha2Code);
        if ($ownerID) {
            $qry = $qry->where('created_by_id', $ownerID);
        }

        return $qry->first();
    }


    public function getTranslations(int $wordID, string $languageAlpha2Code)
    {
        return Translation::query()
        ->with([
            'partOfSpeech',
        ])
        ->where('word_id', $wordID)
        ->where('language_alpha2code', $languageAlpha2Code)
        ->get();
    }
}
