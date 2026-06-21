<?php

namespace Database\Seeders;

use App\Models\Laboratory;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class LaboratorySeeder extends Seeder
{
    /**
     * Seed all 89 laboratories for FTKIP UTeM.
     * 
     * - 51 labs at Main Campus
     * - 38 labs at Technology Campus
     * - Default capacity: 30
     * - Default status: active
     */
    public function run(): void
    {
        $labs = [
            // ============================================
            // MAIN CAMPUS (51 Labs)
            // ============================================
            ['code' => 'CIM',   'name' => 'CIM AND FMS LABORATORY',                                    'staff' => 'Ahmad Faizul Bin Ahmad Tajudin',  'location' => 'Main Campus'],
            ['code' => 'ICL',   'name' => 'CONTROL AND INSTRUMENTATION LABORATORY',                    'staff' => 'Ahmad Faizul Bin Ahmad Tajudin',  'location' => 'Main Campus'],
            ['code' => 'RBL',   'name' => 'ROBOTICS LABORATORY',                                       'staff' => 'Ahmad Faizul Bin Ahmad Tajudin',  'location' => 'Main Campus'],
            ['code' => 'ASL1',  'name' => 'SIMULATION AUTOMATION LABORATORY 1',                        'staff' => 'Ahmad Faizul Bin Ahmad Tajudin',  'location' => 'Main Campus'],
            ['code' => 'ASL2',  'name' => 'SIMULATION AUTOMATION LABORATORY 2',                        'staff' => 'Ahmad Faizul Bin Ahmad Tajudin',  'location' => 'Main Campus'],
            ['code' => 'CWS',   'name' => 'CHEMICAL WASTE STORAGE',                                    'staff' => 'Amran Bin Ab. Sani',              'location' => 'Main Campus'],
            ['code' => 'SYN',   'name' => 'NANOMATERIAL TECHNOLOGY LABORATORY 1 (SYNTHESIS AREA)',     'staff' => 'Amran Bin Ab. Sani',              'location' => 'Main Campus'],
            ['code' => 'PTAN',  'name' => 'NANOMATERIAL TECHNOLOGY LABORATORY 2 (PERFORMANCE TESTING AREA)', 'staff' => 'Azhar Shah Bin Abu Hassan', 'location' => 'Main Campus'],
            ['code' => 'SEMN',  'name' => 'NANOMATERIAL TECHNOLOGY LABORATORY 3 (SEM ROOM)',           'staff' => 'Azhar Shah Bin Abu Hassan',       'location' => 'Main Campus'],
            ['code' => 'MMAN',  'name' => 'NANOMATERIAL TECHNOLOGY LABORATORY 4 (METALLURGY/MICROSCOPE AREA)', 'staff' => 'Azhar Shah Bin Abu Hassan', 'location' => 'Main Campus'],
            ['code' => 'XRD',   'name' => 'NANOMATERIAL TECHNOLOGY LABORATORY 6 (X-RAY DIFFRACTION ROOM)', 'staff' => 'Bahatiar Bin Zaid',          'location' => 'Main Campus'],
            ['code' => 'PHY',   'name' => 'PHYSICS LABORATORY',                                        'staff' => 'Bahatiar Bin Zaid',              'location' => 'Main Campus'],
            ['code' => 'EGL1',  'name' => 'ENGINEERING GRAPHICS LAB 1',                                'staff' => 'Hasnorizal Bin Hairuddin',        'location' => 'Main Campus'],
            ['code' => 'EGL2',  'name' => 'ENGINEERING GRAPHICS LAB 2',                                'staff' => 'Hasnorizal Bin Hairuddin',        'location' => 'Main Campus'],
            ['code' => 'MDL',   'name' => 'MANUFACTURING DESIGN LABORATORY',                           'staff' => 'Hasnorizal Bin Hairuddin',        'location' => 'Main Campus'],
            ['code' => 'MSL 1', 'name' => 'MACHINE SHOP LABORATORY 1 (LATHE MACHINE)',                 'staff' => 'Mazlan Bin Mamat@Awang Mat',     'location' => 'Main Campus'],
            ['code' => 'MSL 2', 'name' => 'MACHINE SHOP LABORATORY 2 (MILLING MACHINE)',               'staff' => 'Mazlan Bin Mamat@Awang Mat',     'location' => 'Main Campus'],
            ['code' => 'RMSB',  'name' => 'RAW MATERIAL STORAGE ROOM B',                               'staff' => 'Mazlan Bin Mamat@Awang Mat',     'location' => 'Main Campus'],
            ['code' => 'ACA',   'name' => 'NANOMATERIAL TECHNOLOGY LABORATORY 5 (ADVANCE CHARACTERIZATION AND ANALYSIS ROOM)', 'staff' => 'Mohd Farihan Bin Mohammad Sabtu', 'location' => 'Main Campus'],
            ['code' => 'SPL',   'name' => 'SUSTAINABLE LABORATORY 3 (POLYMER)',                        'staff' => 'Mohd Farihan Bin Mohammad Sabtu', 'location' => 'Main Campus'],
            ['code' => 'FAB',   'name' => 'FABRICATION LABORATORY',                                    'staff' => 'Mohd Ghazalan Bin Mohd Ghazi',   'location' => 'Main Campus'],
            ['code' => 'RMSA',  'name' => 'RAW MATERIAL STORAGE ROOM A',                               'staff' => 'Mohd Ghazalan Bin Mohd Ghazi',   'location' => 'Main Campus'],
            ['code' => 'SMF',   'name' => 'SHEET METAL FORMING LABORATORY',                            'staff' => 'Mohd Ghazalan Bin Mohd Ghazi',   'location' => 'Main Campus'],
            ['code' => 'APM 1', 'name' => 'ADVANCE PRECISION MACHINING LABORATORY 1 (CNC MACHINING)',  'staff' => 'Mohd Hanafiah Bin Mohd Isa',      'location' => 'Main Campus'],
            ['code' => 'APM 2', 'name' => 'ADVANCE PRECISION MACHINING LABORATORY 2 (MOULD AND DIE)',  'staff' => 'Mohd Hanafiah Bin Mohd Isa',      'location' => 'Main Campus'],
            ['code' => 'GPS',   'name' => 'GRAPHIC DESIGN, PRINTING AND SOUVENIR AREA',                'staff' => 'Mohd Hanafiah Bin Mohd Isa',      'location' => 'Main Campus'],
            ['code' => 'MSL1',  'name' => 'MODELLING SIMULATION LABORATORY 1',                         'staff' => 'Mohd Nazri Bin Abdul Mokte',      'location' => 'Main Campus'],
            ['code' => 'MSL2',  'name' => 'MODELLING SIMULATION LABORATORY 2',                         'staff' => 'Mohd Nazri Bin Abdul Mokte',      'location' => 'Main Campus'],
            ['code' => 'QCR',   'name' => 'QUALITY CONTROL AND RELIABILITY ENGINEERING',                'staff' => 'Mohd Nazri Bin Abdul Mokte',      'location' => 'Main Campus'],
            ['code' => 'BML',   'name' => 'BASIC MECHANICS LABORATORY',                                'staff' => 'Mohd Taufik Bin Abd Aziz',        'location' => 'Main Campus'],
            ['code' => 'ERG',   'name' => 'INDUSTRIAL ERGONOMICS LABORATORY',                          'staff' => 'Mohd Taufik Bin Abd Aziz',        'location' => 'Main Campus'],
            ['code' => 'MLA',   'name' => 'ADDITIVE MANUFACTURING LABORATORY',                         'staff' => 'Mohd Zahar Bin Sariman@Sarman',  'location' => 'Main Campus'],
            ['code' => 'BYOD',  'name' => 'BYOD ROOM',                                                 'staff' => 'Mohd Zahar Bin Sariman@Sarman',  'location' => 'Main Campus'],
            ['code' => 'CADCAM','name' => 'CAD/CAM LABORATORY',                                        'staff' => 'Mohd Zahar Bin Sariman@Sarman',  'location' => 'Main Campus'],
            ['code' => 'BFT',   'name' => 'NANOMATERIAL TECHNOLOGY LABORATORY 7 (BIAXIAL FATIGUE TORSION ROOM)', 'staff' => 'Muhammad Helmi Bin Kahar', 'location' => 'Main Campus'],
            ['code' => 'SCLS',  'name' => 'SUSTAINABLE LABORATORY 1 (COMPOSITE)',                      'staff' => 'Muhammad Helmi Bin Kahar',        'location' => 'Main Campus'],
            ['code' => 'SCFS',  'name' => 'SUSTAINABLE LABORATORY 2 (CERAMICS AND FURNACE)',            'staff' => 'Muhammad Helmi Bin Kahar',        'location' => 'Main Campus'],
            ['code' => 'PWJ',   'name' => 'PROJECT LABORATORY (WELDING AND JOINING)',                   'staff' => 'Nizamul Ikbal Bin Khaeruddin',    'location' => 'Main Campus'],
            ['code' => 'WEL',   'name' => 'WELDING LABORATORY',                                        'staff' => 'Nizamul Ikbal Bin Khaeruddin',    'location' => 'Main Campus'],
            ['code' => 'CST',   'name' => 'CASTING LABORATORY',                                        'staff' => 'Norzuriyahni Binti Abu Bakar',    'location' => 'Main Campus'],
            ['code' => 'FIT',   'name' => 'FITTING LABORATORY',                                        'staff' => 'Norzuriyahni Binti Abu Bakar',    'location' => 'Main Campus'],
            ['code' => 'MAA',   'name' => 'CONSUMABLE STORAGE',                                        'staff' => 'Sahar Bin Salehan',               'location' => 'Main Campus'],
            ['code' => 'IEL',   'name' => 'INDUSTRIAL ENGINEERING LABORATORY',                         'staff' => 'Sahar Bin Salehan',               'location' => 'Main Campus'],
            ['code' => 'MAA2',  'name' => 'MACHINING AREA',                                            'staff' => 'Sahar Bin Salehan',               'location' => 'Main Campus'],
            ['code' => 'PRA',   'name' => 'PROJECT AREA',                                              'staff' => 'Sahar Bin Salehan',               'location' => 'Main Campus'],
            ['code' => 'WEA',   'name' => 'WELDING AREA',                                              'staff' => 'Sahar Bin Salehan',               'location' => 'Main Campus'],
            ['code' => 'CLR',   'name' => 'CLEAR ROOM',                                                'staff' => 'Shamsiah Hasita Binti Shafie',    'location' => 'Main Campus'],
            ['code' => 'FPL',   'name' => 'FLUID POWER LABORATORY',                                    'staff' => 'Shamsiah Hasita Binti Shafie',    'location' => 'Main Campus'],
            ['code' => 'MEC',   'name' => 'MECHATRONICS LABORATORY',                                   'staff' => 'Shamsiah Hasita Binti Shafie',    'location' => 'Main Campus'],
            ['code' => 'MET 1', 'name' => 'METROLOGY LABORATORY 1',                                    'staff' => 'Siti Aisah Binti Khadisah',       'location' => 'Main Campus'],
            ['code' => 'MET 2', 'name' => 'METROLOGY LABORATORY 2',                                    'staff' => 'Siti Aisah Binti Khadisah',       'location' => 'Main Campus'],

            // ============================================
            // TECHNOLOGY CAMPUS (38 Labs)
            // ============================================
            ['code' => 'SVR',   'name' => 'VIRTUAL REALITY STUDIO',                                    'staff' => 'Abdul Razak Fathanah Bin Abdul Razak', 'location' => 'Technology Campus'],
            ['code' => 'MKT',   'name' => 'SURFACE TREATMENT AND COMPOSITE TECHNOLOGY LABORATORY',     'staff' => 'Abdul Razak Fathanah Bin Abdul Razak', 'location' => 'Technology Campus'],
            ['code' => 'MPB',   'name' => 'MATERIAL TESTING LABORATORY',                               'staff' => 'Azizul Ikhwan Bin Mohd',           'location' => 'Technology Campus'],
            ['code' => 'MDI',   'name' => 'INDUSTRIAL DESIGN LABORATORY',                              'staff' => 'Azizul Ikhwan Bin Mohd',           'location' => 'Technology Campus'],
            ['code' => 'MKW',   'name' => 'WELDING QUALITY LABORATORY',                                'staff' => 'Hairulhisham Bin Rosnan',          'location' => 'Technology Campus'],
            ['code' => 'MP2 (NDT)', 'name' => 'MACHINING LABORATORY 2 (NDT)',                          'staff' => 'Hairulhisham Bin Rosnan',          'location' => 'Technology Campus'],
            ['code' => 'MMP',   'name' => 'WELDING CHARACTERIZATION AND METALLURGY LAB',               'staff' => 'Hairulhisham Bin Rosnan',          'location' => 'Technology Campus'],
            ['code' => 'MIL',   'name' => 'INDUSTRIAL LASER LABORATORY',                               'staff' => 'Mohd Remy Bin Ab. Karim',          'location' => 'Technology Campus'],
            ['code' => 'MIP1',  'name' => 'INDUSTRIAL MACHINING LABORATORY 1',                         'staff' => 'Mohd Remy Bin Ab. Karim',          'location' => 'Technology Campus'],
            ['code' => 'MP2 (RP)', 'name' => 'MACHINING LABORATORY 2 (RP)',                             'staff' => 'Mohd Remy Bin Ab. Karim',          'location' => 'Technology Campus'],
            ['code' => 'MIP3',  'name' => 'INDUSTRIAL MACHINING LABORATORY 3',                         'staff' => 'Muhammad Azwan Bin Abdul Kadir',   'location' => 'Technology Campus'],
            ['code' => 'SAPI',  'name' => 'INDUSTRIAL MACHINING ANALYSIS STUDIO',                      'staff' => 'Muhammad Azwan Bin Abdul Kadir',   'location' => 'Technology Campus'],
            ['code' => 'MP2',   'name' => 'MACHINING TECHNOLOGY LABORATORY 2',                         'staff' => 'Muhammad Azwan Bin Abdul Kadir',   'location' => 'Technology Campus'],
            ['code' => 'MFL',   'name' => 'FITTING AND METAL FABRICATION TECHNOLOGY LABORATORY',       'staff' => 'Muhammad Zuhri Bin Shari',         'location' => 'Technology Campus'],
            ['code' => 'MDP',   'name' => 'PRODUCT DESIGN LABORATORY',                                 'staff' => 'Muhammad Zuhri Bin Shari',         'location' => 'Technology Campus'],
            ['code' => 'WDJ',   'name' => 'JOINING TECHNOLOGY LABORATORY',                             'staff' => 'Rohayat Bin Husin',                'location' => 'Technology Campus'],
            ['code' => 'MWDA',  'name' => 'ADVANCE JOINING TECHNOLOGY LABORATORY',                     'staff' => 'Rohayat Bin Husin',                'location' => 'Technology Campus'],
            ['code' => 'MLC',   'name' => 'ADVANCE FORMING TECHNOLOGY LABORATORY',                     'staff' => 'Tc. Basri Bin Bidin',              'location' => 'Technology Campus'],
            ['code' => 'MPL',   'name' => 'PLASTIC TECHNOLOGY LABORATORY',                             'staff' => 'Tc. Basri Bin Bidin',              'location' => 'Technology Campus'],
            ['code' => 'SAK',   'name' => 'MACHINING AND WELDING ANALYSIS STUDIO 1',                   'staff' => 'Tc. Fakhrulnaim Bin Ibrahim',      'location' => 'Technology Campus'],
            ['code' => 'MKB',   'name' => 'NON-CONVENTIONAL WELDING LABORATORY',                       'staff' => 'Tc. Fakhrulnaim Bin Ibrahim',      'location' => 'Technology Campus'],
            ['code' => 'MP2 (WELDING)', 'name' => 'MACHINING LABORATORY 2 (WELDING)',                   'staff' => 'Tc. Fakhrulnaim Bin Ibrahim',      'location' => 'Technology Campus'],
            ['code' => 'MMA',   'name' => 'ADVANCE MANUFACTURING TECHNOLOGY LABORATORY',               'staff' => 'Tc. Janatul Hafiz Bin Basir',     'location' => 'Technology Campus'],
            ['code' => 'MKKK',  'name' => 'QUALITY CONTROL AND INDUSTRIAL ENGINEERING LABORATORY (PC)', 'staff' => 'Tc. Janatul Hafiz Bin Basir',     'location' => 'Technology Campus'],
            ['code' => 'MPT',   'name' => 'RAPID MANUFACTURING LABORATORY',                            'staff' => 'Tc. Kamaruddin Bin Abu Bakar',    'location' => 'Technology Campus'],
            ['code' => 'MPI',   'name' => 'INNOVATION AND FYP LABORATORY / DFX STUDIO',                'staff' => 'Tc. Kamaruddin Bin Abu Bakar',    'location' => 'Technology Campus'],
            ['code' => 'MPS',   'name' => 'ADVANCE MACHINING LABORATORY',                              'staff' => 'Tc. Mohd Azimin Bin Ibrahim',     'location' => 'Technology Campus'],
            ['code' => 'SCNC',  'name' => 'CNC STUDIO',                                                'staff' => 'Tc. Mohd Azimin Bin Ibrahim',     'location' => 'Technology Campus'],
            ['code' => 'MCS',   'name' => 'METAL CASTING TECHNOLOGY LABORATORY',                       'staff' => 'Tc. Mohd Syafiq Bin Ismail',      'location' => 'Technology Campus'],
            ['code' => 'MWJ',   'name' => 'WATERJET LABORATORY',                                       'staff' => 'Tc. Mohd Syafiq Bin Ismail',      'location' => 'Technology Campus'],
            ['code' => 'MKK',   'name' => 'QUALITY CONTROL AND INDUSTRIAL ENGINEERING LABORATORY',      'staff' => 'Tc. Nor Zalipah Bte Suliman',     'location' => 'Technology Campus'],
            ['code' => 'MMT',   'name' => 'METROLOGY LABORATORY',                                      'staff' => 'Tc. Nor Zalipah Bte Suliman',     'location' => 'Technology Campus'],
            ['code' => 'MRE',   'name' => 'ERGONOMIC AND OSHE DESIGN LABORATORY',                      'staff' => 'Tc. Norhafizah Binti Ishak',      'location' => 'Technology Campus'],
            ['code' => 'MSK',   'name' => 'STATIC LABORATORY 2',                                       'staff' => 'Tc. Norhafizah Binti Ishak',      'location' => 'Technology Campus'],
            ['code' => 'MP1L',  'name' => 'LATHE MACHINING TECHNOLOGY LABORATORY',                     'staff' => 'Tc. Norhisham Bin Abdul Malik',   'location' => 'Technology Campus'],
            ['code' => 'MP1M',  'name' => 'MILLING MACHINING TECHNOLOGY LABORATORY',                   'staff' => 'Tc. Norhisham Bin Abdul Malik',   'location' => 'Technology Campus'],
            ['code' => 'SCP',   'name' => 'CATIA PLM STUDIO',                                         'staff' => 'Tc. Zulkifli Bin Jantan',         'location' => 'Technology Campus'],
            ['code' => 'MPJ',   'name' => 'PROJECT LABORATORY',                                        'staff' => 'Tc. Zulkifli Bin Jantan',         'location' => 'Technology Campus'],
        ];

        foreach ($labs as $lab) {
            // Find the responsible officer by name (case-insensitive)
            $officer = User::whereRaw('LOWER(name) = ?', [strtolower($lab['staff'])])->first();

            if (!$officer) {
                $this->command->warn("⚠️  Staff not found: {$lab['staff']} for lab {$lab['code']}");
                continue;
            }

            Laboratory::updateOrCreate(
                ['code' => $lab['code']],
                [
                    'name' => Str::title(Str::lower($lab['name'])),
                    'capacity' => 30,
                    'location' => $lab['location'],
                    'status' => 'active',
                    'responsible_officer_id' => $officer->id,
                ]
            );
        }

        $this->command->info("✅ Successfully seeded " . Laboratory::count() . " laboratories.");
    }
}
