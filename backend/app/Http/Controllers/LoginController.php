<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /**
     * Handle an authentication attempt.
     *
     * @param  \Illuminate\Http\Request  $r
     * @return \Illuminate\Http\Response
     */
    public function login(Request $r)
    {
        $credentials = $r->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {

            /**
             * @var User
             */
            $user = Auth::user();
            $token = $user->createToken('devict')->plainTextToken;

            return response()->json([
                'user' => $user,
                'token' => $token,
            ], 200, ['Authorization' => 'Bearer ' . $token]);
        }

        return response()->json(['message' => 'authentication failed'], 401);
    }
}
