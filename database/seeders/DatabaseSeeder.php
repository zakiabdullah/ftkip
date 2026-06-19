<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create Roles
        $superAdminRole = Role::firstOrCreate(['name' => 'Super Administrator']);
        Role::firstOrCreate(['name' => 'Assistant Engineer / Admin']);
        Role::firstOrCreate(['name' => 'Lecturer / Supervisor']);
        Role::firstOrCreate(['name' => 'Student']);

        // 2. Create/Update the Base Super Admin User
        $user = User::updateOrCreate(
            ['email' => 'ahmadzaki@utem.edu.my'],
            [
                'id' => 1,
                'name' => 'Ahmad Zaki Abdullah',
                'password' => Hash::make('password'),
            ]
        );

        // 3. Assign Role to User
        $user->assignRole($superAdminRole);
    }
}
