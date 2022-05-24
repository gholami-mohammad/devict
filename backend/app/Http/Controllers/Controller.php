<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected function saveResponse(string $message, $data) {
        return response()->json([
            'message' => $message,
            'data' => $data,
        ]);
    }

    protected function messageResponse(string $message, int $status) {
        return response()->json([
            'message' => $message,
        ], $status);
    }
}
