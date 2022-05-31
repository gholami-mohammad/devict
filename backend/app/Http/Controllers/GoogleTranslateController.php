<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GoogleTranslateController extends Controller
{
    public function translate(Request $request)
    {
        $text = trim($request->text);
        $url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=fa&hl=en-US&dt=t&dt=bd&dj=1&source=icon&tk=573754.573754&q={$text}";

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $res = curl_exec($ch);
        $err = curl_error($ch);
        abort_if(!empty($err), 500, $err);

        return response()->json(json_decode($res));
    }
}
