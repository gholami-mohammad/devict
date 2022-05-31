<?php

use App\Http\Controllers\BasicInfoController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\WordController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', [LoginController::class, 'login']);

Route::middleware('auth:sanctum')->get('/whoami', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->get('/basic_info', [BasicInfoController::class, 'basicInfo']);

Route::middleware('auth:sanctum')->prefix('words')->group(function () {
    Route::get('/', [WordController::class, 'index']);
    Route::post('/', [WordController::class, 'store']);
    Route::post('/{word}', [WordController::class, 'update']);
    Route::get('/{word}', [WordController::class, 'show']);
    Route::delete('/{word}', [WordController::class, 'destroy']);
});
