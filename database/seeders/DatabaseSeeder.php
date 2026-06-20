<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Laboratory;
use App\Models\Equipment;
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
                'username' => 'ahmadzaki',
                'password' => Hash::make('password'),
            ]
        );

        // 3. Assign Role to User
        $user->assignRole($superAdminRole);

        // 4. Seed Mock Laboratories
        $lab1 = Laboratory::updateOrCreate(
            ['code' => 'LAB-FTKIP-001'],
            [
                'name' => 'Embedded Systems Laboratory',
                'capacity' => 25,
                'location' => 'Block B, Level 1, Room 204',
                'status' => 'active',
                'responsible_officer_id' => $user->id,
            ]
        );

        $lab2 = Laboratory::updateOrCreate(
            ['code' => 'LAB-FTKIP-002'],
            [
                'name' => 'Robotics and Automation Laboratory',
                'capacity' => 20,
                'location' => 'Block B, Level 1, Room 205',
                'status' => 'active',
                'responsible_officer_id' => $user->id,
            ]
        );

        $lab3 = Laboratory::updateOrCreate(
            ['code' => 'LAB-FTKIP-003'],
            [
                'name' => 'Network Security Lab',
                'capacity' => 30,
                'location' => 'Block C, Level 3, Room 302',
                'status' => 'maintenance',
                'responsible_officer_id' => $user->id,
            ]
        );

        // 5. Seed Mock Equipment
        Equipment::updateOrCreate(
            ['asset_tag' => 'EQ-FTKIP-001'],
            [
                'laboratory_id' => $lab1->id,
                'name' => 'Tektronix Digital Oscilloscope',
                'serial_number' => 'TEK9901428X',
                'status' => 'available',
            ]
        );

        Equipment::updateOrCreate(
            ['asset_tag' => 'EQ-FTKIP-002'],
            [
                'laboratory_id' => $lab1->id,
                'name' => 'Arduino Starter Kit v4',
                'serial_number' => 'ARD-V4-9921',
                'status' => 'available',
            ]
        );

        Equipment::updateOrCreate(
            ['asset_tag' => 'EQ-FTKIP-003'],
            [
                'laboratory_id' => $lab2->id,
                'name' => 'ABB Industrial Robotic Arm',
                'serial_number' => 'ABB-ROB-8831',
                'status' => 'maintenance',
            ]
        );
    }
}
