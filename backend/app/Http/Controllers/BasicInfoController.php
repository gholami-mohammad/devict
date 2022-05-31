<?php

namespace App\Http\Controllers;

use App\Models\PartOfSpeech;
use Illuminate\Http\Request;

class BasicInfoController extends Controller
{
    /**
     * The function to get basic informatin lists
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function basicInfo(Request $request)
    {
        $items = $request->items;
        if (!$items) {
            return response()->json([]);
        }

        $items = explode(',', $items);

        $results = [];
        foreach ($items as $item){
            switch($item) {
                case 'parts_of_speech': {
                    $results[$item] = PartOfSpeech::all();
                    break;
                }
            }
        }

        return response()->json($results);
    }
}
