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

        // 6. Seed Assistant Engineers (Penolong Juruterera)
        $engineers = [
            ['name' => 'ABDUL RAZAK FATHANAH BIN ABDUL RAZAK', 'email' => 'abdulrazak@utem.edu.my'],
            ['name' => 'AZIZUL IKHWAN BIN MOHD', 'email' => 'azizulikhwan@utem.edu.my'],
            ['name' => 'HAIRULHISHAM BIN ROSNAN', 'email' => 'hairulhisham@utem.edu.my'],
            ['name' => 'MOHD REMY BIN AB. KARIM', 'email' => 'remy@utem.edu.my'],
            ['name' => 'MUHAMMAD AZWAN BIN ABDUL KADIR', 'email' => 'azwan@utem.edu.my'],
            ['name' => 'MUHAMMAD ZUHRI BIN SHARI', 'email' => 'zuhri@utem.edu.my'],
            ['name' => 'ROHAYAT BIN HUSIN', 'email' => 'rohayat@utem.edu.my'],
            ['name' => 'TC. BASRI BIN BININ', 'email' => 'basri.bidin@utem.edu.my'],
            ['name' => 'TC. FAKHRULNAIM BIN IBRAHIM', 'email' => 'fakhrulnaim@utem.edu.my'],
            ['name' => 'TC. JANATUL HAFIZ BIN BASIR', 'email' => 'janatulhafiz@utem.edu.my'],
            ['name' => 'TC. KAMARUDDIN BIN ABU BAKAR', 'email' => 'kamaruddinabakar@utem.edu.my'],
            ['name' => 'TC. MOHD AZIMIN BIN IBRAHIM', 'email' => 'azimin@utem.edu.my'],
            ['name' => 'TC. MOHD SYAFIQ BIN ISMAIL', 'email' => 'mohdsyafiq@utem.edu.my'],
            ['name' => 'TC. NOR ZALIPAH BTE SULIMAN', 'email' => 'norzalipah@utem.edu.my'],
            ['name' => 'TC. NORHAFIZAH BINTI ISHAK', 'email' => 'norhafizahishak@utem.edu.my'],
            ['name' => 'TC. NORHISHAM BIN ABDUL MALIK', 'email' => 'norhisham.abdulmalik@utem.edu.my'],
            ['name' => 'TC. ZULKIFLI BIN JANTAN', 'email' => 'zulkifli.jantan@utem.edu.my'],
            ['name' => 'AHMAD FAIZUL BIN AHMAD TAJUDIN', 'email' => 'ahmadfaizul@utem.edu.my'],
            ['name' => 'AMRAN BIN AB. SANI', 'email' => 'amran@utem.edu.my'],
            ['name' => 'AZHAR SHAH BIN ABU HASSAN', 'email' => 'azharshah@utem.edu.my'],
            ['name' => 'BAHATIAR BIN ZAID', 'email' => 'bahatiar@utem.edu.my'],
            ['name' => 'HASNORIZAL BIN HAIRUDDIN', 'email' => 'hasnorizal@utem.edu.my'],
            ['name' => 'MAZLAN BIN MAMAT@AWANG MAT', 'email' => 'mazlanmamat@utem.edu.my'],
            ['name' => 'MOHD FARIHAN BIN MOHAMMAD SABTU', 'email' => 'farihan@utem.edu.my'],
            ['name' => 'MOHD GHAZALAN BIN MOHD GHAZI', 'email' => 'ghazalan@utem.edu.my'],
            ['name' => 'MOHD HANAFIAH BIN MOHD ISA', 'email' => 'hanafiah@utem.edu.my'],
            ['name' => 'MOHD NAZRI BIN ABDUL MOKTE', 'email' => 'mohdnazri@utem.edu.my'],
            ['name' => 'MOHD TAUFIK BIN ABD AZIZ', 'email' => 'mohdtaufik@utem.edu.my'],
            ['name' => 'MOHD ZAHAR BIN SARIMAN@SARMAN', 'email' => 'zahar@utem.edu.my'],
            ['name' => 'MUHAMMAD HELMI BIN KAHAR', 'email' => 'helmi@utem.edu.my'],
            ['name' => 'NIZAMUL IKBAL BIN KHAERUDDIN', 'email' => 'nizamul@utem.edu.my'],
            ['name' => 'NORZURIYAHNI BINTI ABU BAKAR', 'email' => 'zuriyahni@utem.edu.my'],
            ['name' => 'SAHAR BIN SALEHAN', 'email' => 'sahar@utem.edu.my'],
            ['name' => 'SHAMSIAH HASITA BINTI SHAFIE', 'email' => 'hasita@utem.edu.my'],
            ['name' => 'SITI AISAH BINTI KHADISAH', 'email' => 'sitiaisah@utem.edu.my'],
        ];

        $assistantEngineerRole = Role::firstOrCreate(['name' => 'Assistant Engineer / Admin']);

        foreach ($engineers as $eng) {
            $username = explode('@', $eng['email'])[0];
            $username = str_replace('.', '_', $username);

            $newUser = User::updateOrCreate(
                ['email' => $eng['email']],
                [
                    'name' => $eng['name'],
                    'username' => $username,
                    'password' => Hash::make('password'),
                ]
            );

            $newUser->syncRoles($assistantEngineerRole);
        }
    }
}
