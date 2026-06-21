<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class SupervisorSeeder extends Seeder
{
    public function run(): void
    {
        $supervisorRole = Role::firstOrCreate(['name' => 'Lecturer / Supervisor']);
        $supervisors = [
            ['name' => 'PROFESOR TS. DR. EFFENDI BIN MOHAMAD', 'email' => 'effendi@utem.edu.my'],
            ['name' => 'PROFESOR MADYA IR. DR. JARIAH BINTI MOHAMAD JUOI', 'email' => 'jariah@utem.edu.my'],
            ['name' => 'TS. DR. MOHD SOUFHWEE BIN ABD RAHMAN', 'email' => 'soufhwee@utem.edu.my'],
            ['name' => 'TS. DR. NOR ANA BINTI ROSLI', 'email' => 'ana@utem.edu.my'],
            ['name' => 'PROFESOR MADYA DR SERI RAHAYU BINTI KAMAT', 'email' => 'seri@utem.edu.my'],
            ['name' => 'UMI HAYATI BINTI AHMAD', 'email' => 'umihayati@utem.edu.my'],
            ['name' => 'DR. ZURINA BINTI SHAMSUDIN', 'email' => 'zurina.shamsudin@utem.edu.my'],
        ];

        foreach ($supervisors as $supervisor) {
            $user = User::updateOrCreate(
                ['email' => $supervisor['email']],
                [
                    'name' => $supervisor['name'],
                    'username' => str_replace('.', '_', strstr($supervisor['email'], '@', true)),
                    'password' => Hash::make('password'),
                ],
            );

            $user->syncRoles($supervisorRole);
        }
    }
}
