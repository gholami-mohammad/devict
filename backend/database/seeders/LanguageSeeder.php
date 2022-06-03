<?php

namespace Database\Seeders;

use App\Models\Language;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LanguageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $langs = [
            [
                'alpha2code' => 'fa',
                'name' => 'Persian فارسی',
                'dir' => 'rtl',
            ],
            [
                'alpha2code' => 'en',
                'name' => 'English',
                'dir' => 'ltr',
            ],
        ];

        foreach ($langs as $v) {
            Language::updateOrCreate([
                "alpha2code" => $v['alpha2code']
            ], $v);
        }
    }
}
