<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Word extends Model
{
    use HasFactory;

    protected $fillable = [
        'word',
        'created_by_id',
        'language_alpha2code',
    ];

    protected $casts = [
        'archived' => 'boolean',
        'last_review' => 'datetime'
    ];

    /**
     * Get all translations of word.
     *
     * @return Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function translations()
    {
        return $this->hasMany(Translation::class, 'word_id');
    }

    public function language()
    {
        return $this->belongsTo(Language::class, 'language_alpha2code', 'alpha2code');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class, 'word_id')->orderBy('id', 'desc');
    }

    /**
     * Get current step of Leitner review.
     */
    public function step()
    {
        return $this->belongsTo(Step::class);
    }
}
