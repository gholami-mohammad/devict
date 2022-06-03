<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run() {
        $users = [
            [
                'email' => 'gholami.mohammad.mgh@gmail.com',
                'name' => 'Mohammad Gholami',
                'password' => '$2a$12$szvr1YWETlJ./XW2qZfonuVs1syTlwgpAs9MNB7wha3d.PXD7I1fW',
                'enabled' => true,
            ],
        ];

        foreach ($users as $v) {
            User::updateOrCreate(['email' => $v['email']], $v);
        }
    }
}
