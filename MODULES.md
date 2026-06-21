# 📦 SPMP-FTKIP - Modul Sistem

<div align="center">

## 📋 Laporan Modul Sistem

**Sistem Pengurusan Makmal dan Peralatan FTKIP**
**Faculty of Industrial and Manufacturing Engineering Technology (FTKIP)**
**Universiti Teknikal Malaysia Melaka (UTeM)**

---

![Total Modules](https://img.shields.io/badge/Total_Modules-23-blue)
![Implemented](https://img.shields.io/badge/Implemented-4-green)
![Planned](https://img.shields.io/badge/Planned-19-orange)

</div>

---

## 📊 Ringkasan Jumlah Modul

| Kategori | Jumlah Modul | Status |
|----------|-------------|--------|
| 🖥️ Core Modules (Modul Teras) | 10 | 4 dilaksanakan, 6 direncanakan |
| 🔧 Asset & Maintenance (Aset & Penyelenggaraan) | 4 | Direncanakan |
| 🧪 Laboratory Safety (Keselamatan Makmal) | 4 | Direncanakan |
| 📦 Inventory & Consumables (Inventori) | 1 | Direncanakan |
| 📱 Smart Laboratory Features (Ciri Pintar) | 3 | Direncanakan |
| 📄 Document Management (Dokumentasi) | 1 | Direncanakan |
| **Jumlah** | **23** | **4 Dilaksanakan / 19 Direncanakan** |

---

## 📈 Status Pelaksanaan

```
Pelaksanaan Modul: [████████░░░░░░░░░░░░░░░] 17.4% (4/23)
```

---

# 🖥️ Core Modules (Modul Teras)

## 1. Dashboard & Analytics

| Butiran | Keterangan |
|---------|------------|
| **Modul** | Dashboard & Analytics |
| **Status** | ✅ Dilaksanakan |
| **Controller** | `DashboardController.php` |
| **View** | `Dashboard.tsx`, `DashboardDefault.tsx` |
| **Route** | `/dashboard`, `/dashboard/default` |
| **Penerangan** | Papan pemuka analitik berasaskan peranan dengan statistik masa nyata |

### Ciri-ciri Utama
- ✅ Dashboard berasaskan peranan pengguna
- ✅ Statistik masa nyata
- ✅ Analitik tempahan
- ✅ Metrik penggunaan peralatan
- ✅ Aktiviti terkini

---

## 2. User & Role Management

| Butiran | Keterangan |
|---------|------------|
| **Modul** | User & Role Management |
| **Status** | ✅ Dilaksanakan |
| **Controller** | `UserManagementController.php` |
| **View** | `UserManagement/Index.tsx` |
| **Route** | `/users` |
| **Penerangan** | Pengurusan pengguna, peranan, dan kawalan akses |

### Ciri-ciri Utama
- ✅ Pengurusan pengguna
- ✅ Pelantikan peranan
- ✅ Pengurusan kebenaran
- ✅ Kawalan akses berasaskan peranan (RBAC)

### Peranan Sistem
| Peranan | Tahap | Keterangan |
|---------|-------|------------|
| Super Administrator | 4 | Pentadbiran dan tadbir urus penuh |
| Assistant Engineer / Admin | 3 | Operasi makmal dan pengurusan peralatan |
| Lecturer / Supervisor | 2 | Pengesahan akademik dan kelulusan tempahan |
| Student | 1 | Permohonan tempahan makmal dan peralatan |

---

## 3. Laboratory Management

| Butiran | Keterangan |
|---------|------------|
| **Modul** | Laboratory Management |
| **Status** | ✅ Dilaksanakan |
| **Controller** | `LaboratoryController.php` |
| **View** | `LaboratoryManagement/Index.tsx` |
| **Route** | `/laboratories` |
| **Penerangan** | Pengurusan makmal, bengkel, kapasiti, dan petugas bertanggungjawab |

### Ciri-ciri Utama
- ✅ Pendaftaran makmal
- ✅ Pengurusan bengkel
- ✅ Pengurusan kapasiti
- ✅ Pemantauan status makmal
- ✅ Pelantikan petugas bertanggungjawab

### Ciri-ciri Teknikal
- Pencarian berasaskan nama, kod, dan lokasi
- Penapisan mengikut status (active, inactive, maintenance)
- Paginasi data
- Relasi dengan `responsible_officer` (pengguna)

### Status Makmal
| Status | Keterangan |
|--------|------------|
| `active` | Makmal aktif dan beroperasi |
| `inactive` | Makmal tidak aktif |
| `maintenance` | Makmal dalam penyelenggaraan |

---

## 4. Equipment Management

| Butiran | Keterangan |
|---------|------------|
| **Modul** | Equipment Management |
| **Status** | ✅ Dilaksanakan |
| **Controller** | `EquipmentController.php` |
| **View** | `EquipmentManagement/Index.tsx` |
| **Route** | `/equipment` |
| **Penerangan** | Inventori peralatan, pengkategorian aset, dan penjejakan status |

### Ciri-ciri Utama
- ✅ Inventori peralatan
- ✅ Pengkategorian aset
- ✅ Penjejakan status peralatan
- ✅ Pengenalan Aset QR
- ✅ Galeri imej peralatan

### Status Peralatan
| Status | Keterangan |
|--------|------------|
| `available` | Tersedia untuk ditempah |
| `reserved` | Telah ditempah |
| `borrowed` | Dipinjam |
| `maintenance` | Dalam penyelenggaraan |
| `damaged` | Rosak |
| `retired` | Dihentikan |

---

## 5. Booking Management

| Butiran | Keterangan |
|---------|------------|
| **Modul** | Booking Management |
| **Status** | 📄 Direncanakan |
| **Penerangan** | Tempahan makmal, peralatan, slot masa, dan pengesanan konflik |

### Ciri-ciri Utama (Dirancang)
- ⏳ Tempahan makmal
- ⏳ Tempahan peralatan
- ⏳ Slot masa tempahan
- ⏳ Pengesanan konflik
- ⏳ Sejarah tempahan

---

## 6. Multi-Level Approval Workflow

| Butiran | Keterangan |
|---------|------------|
| **Modul** | Multi-Level Approval Workflow |
| **Status** | 📄 Direncanakan |
| **Penerangan** | Aliran kelulusan bertahap untuk permohonan tempahan |

### Aliran Kelulusan (Dirancang)
```
Student (Pelajar)
      ↓
Supervisor / Lecturer (Penyelia / Pensyarah)
      ↓
Assistant Engineer (Jurutera Pembantu)
      ↓
✅ Approved (Diluluskan)
```

### Ciri-ciri Utama (Dirancang)
- ⏳ Baris gilir kelulusan
- ⏳ Sejarah kelulusan
- ⏳ Ulasan kelulusan
- ⏳ Sebab penolakan

---

## 7. Calendar Management

| Butiran | Keterangan |
|---------|------------|
| **Modul** | Calendar Management |
| **Status** | 📄 Direncanakan |
| **Penerangan** | Pengurusan kalendar harian, mingguan, dan bulanan |

### Ciri-ciri Utama (Dirancang)
- ⏳ Paparan Harian
- ⏳ Paparan Mingguan
- ⏳ Paparan Bulanan
- ⏳ Kalendar Sumber
- ⏳ Semak Ketersediaan

---

## 8. Notification Center

| Butiran | Keterangan |
|---------|------------|
| **Modul** | Notification Center |
| **Status** | 📄 Direncanakan |
| **Penerangan** | Pusat pemberitahuan aplikasi dan e-mel |

### Ciri-ciri Utama (Dirancang)
- ⏳ Pemberitahuan Dalam Aplikasi
- ⏳ Pemberitahuan E-mel
- ⏳ Peringatan tempahan
- ⏳ Kemas kini kelulusan
- ⏳ Amaran penyelenggaraan

---

## 9. Audit Trail

| Butiran | Keterangan |
|---------|------------|
| **Modul** | Audit Trail |
| **Status** | 📄 Direncanakan |
| **Penerangan** | Jejak audit untuk semua aktiviti dan perubahan sistem |

### Ciri-ciri Utama (Dirancang)
- ⏳ Aktiviti log masuk
- ⏳ Aktiviti tempahan
- ⏳ Aktiviti kelulusan
- ⏳ Perubahan sistem
- ⏳ Tindakan pengguna

---

## 10. Reporting & Analytics

| Butiran | Keterangan |
|---------|------------|
| **Modul** | Reporting & Analytics |
| **Status** | 📄 Direncanakan |
| **Penerangan** | Penjanaan laporan dan analitik operasi |

### Ciri-ciri Utama (Dirancang)
- ⏳ Laporan penggunaan makmal
- ⏳ Laporan penggunaan peralatan
- ⏳ Statistik tempahan
- ⏳ Statistik penyelenggaraan
- ⏳ Statistik insiden
- ⏳ Laporan inventori
- ⏳ Laporan aktiviti pengguna

---

# 🔧 Asset & Maintenance Modules (Modul Aset & Penyelenggaraan)

## 11. Damage Reporting

| Butiran | Keterangan |
|---------|------------|
| **Modul** | Damage Reporting |
| **Status** | 📄 Direncanakan |
| **Penerangan** | Pelaporan kerosakan dan masalah operasi peralatan |

### Ciri-ciri Utama (Dirancang)
- ⏳ Laporan kerosakan peralatan
- ⏳ Laporan kerosakan
- ⏳ Masalah operasi
- ⏳ Lampiran imej
- ⏳ Penjejakan status
- ⏳ Pemantauan penyelesaian

---

## 12. Maintenance Management

| Butiran | Keterangan |
|---------|------------|
| **Modul** | Maintenance Management |
| **Status** | 📄 Direncanakan |
| **Penerangan** | Pengurusan penyelenggaraan pencegahan, pembaikan, dan kalibrasi |

### Ciri-ciri Utama (Dirancang)
- ⏳ Penyelenggaraan pencegahan
- ⏳ Penyelenggaraan pembaikan
- ⏳ Jadual kalibrasi
- ⏳ Sejarah penyelenggaraan
- ⏳ Kos penyelenggaraan

---

## 13. Work Order Management

| Butiran | Keterangan |
|---------|------------|
| **Modul** | Work Order Management |
| **Status** | 📄 Direncanakan |
| **Penerangan** | Pengurusan arahan kerja untuk pembaikan dan penyelenggaraan |

### Aliran Kerja (Dirancang)
```
Damage Report (Laporan Kerosakan)
      ↓
Work Order (Arahan Kerja)
      ↓
Assigned Technician (Teknisyen Ditugaskan)
      ↓
Repair (Pembaikan)
      ↓
✅ Completed (Selesai)
```

---

## 14. Equipment Borrowing

| Butiran | Keterangan |
|---------|------------|
| **Modul** | Equipment Borrowing |
| **Status** | 📄 Direncanakan |
| **Penerangan** | Pengurusan pinjaman dan pemulangan peralatan |

### Ciri-ciri Utama (Dirancang)
- ⏳ Permohonan pinjaman
- ⏳ Pengurusan pemulangan
- ⏳ Pemeriksaan pemulangan
- ⏳ Sejarah pinjaman

---

# 🧪 Laboratory Safety Modules (Modul Keselamatan Makmal)

## 15. Safety Declaration

| Butiran | Keterangan |
|---------|------------|
| **Modul** | Safety Declaration |
| **Status** | 📄 Direncanakan |
| **Penerangan** | Pengisytiharan keselamatan sebelum tempahan |

### Ciri-ciri Utama (Dirancang)
- ⏳ Pengakuan SOP Makmal
- ⏳ Pengakuan peraturan keselamatan
- ⏳ Pengakuan prosedur pengendalian peralatan

---

## 16. SOP Management

| Butiran | Keterangan |
|---------|------------|
| **Modul** | SOP Management |
| **Status** | 📄 Direncanakan |
| **Penerangan** | Pengurusan Prosedur Operasi Standard |

### Ciri-ciri Utama (Dirancang)
- ⏳ SOP Makmal
- ⏳ SOP Peralatan
- ⏳ Garis panduan keselamatan
- ⏳ Dokumen boleh dimuat turun

---

## 17. Certification & Training Management

| Butiran | Keterangan |
|---------|------------|
| **Modul** | Certification & Training Management |
| **Status** | 📄 Direncanakan |
| **Penerangan** | Pengurusan sijil dan latihan untuk penggunaan peralatan khusus |

### Peralatan Memerlukan Sijil (Contoh)
- CNC Machine
- Welding Equipment
- Laser Cutter
- 3D Printer

### Logik Tempahan (Dirancang)
```
Certified User → Booking Allowed ✅
Non-Certified User → Booking Rejected ❌
```

---

## 18. Incident Management

| Butiran | Keterangan |
|---------|------------|
| **Modul** | Incident Management |
| **Status** | 📄 Direncanakan |
| **Penerangan** | Pengurusan insiden keselamatan dan laporan bahaya |

### Ciri-ciri Utama (Dirancang)
- ⏳ Kemalangan
- ⏳ Kejadian hampir berlaku
- ⏳ Pelanggaran keselamatan
- ⏳ Laporan bahaya

---

# 📦 Inventory & Consumables Modules (Modul Inventori)

## 19. Consumable Inventory

| Butiran | Keterangan |
|---------|------------|
| **Modul** | Consumable Inventory |
| **Status** | 📄 Direncanakan |
| **Penerangan** | Pengurusan inventori bahan habis guna |

### Bahan Habis Guna (Contoh)
- Filament (untuk 3D Printer)
- Welding Rods (untuk kimpalan)
- Chemicals (bahan kimia)
- Lubricants (pelincir)
- Measuring Tools (alat ukur)

### Ciri-ciri Utama (Dirancang)
- ⏳ Penjejakan stok
- ⏳ Pergerakan stok
- ⏳ Amaran stok rendah
- ⏳ Laporan inventori

---

# 📱 Smart Laboratory Features (Ciri Makmal Pintar)

## 20. QR Code Asset Tracking

| Butiran | Keterangan |
|---------|------------|
| **Modul** | QR Code Asset Tracking |
| **Status** | 📄 Direncanakan |
| **Penerangan** | Penjejakan aset menggunakan kod QR unik |

### Ciri-ciri Utama (Dirancang)
- ⏳ Maklumat aset
- ⏳ Sejarah penyelenggaraan
- ⏳ Sejarah tempahan
- ⏳ Status semasa
- ⏳ Maklumat lokasi

---

## 21. QR Check-In / Check-Out

| Butiran | Keterangan |
|---------|------------|
| **Modul** | QR Check-In / Check-Out |
| **Status** | 📄 Direncanakan |
| **Penerangan** | Pendaftaran masuk/keluar menggunakan imbasan QR |

### Aliran Kerja (Dirancang)
```
Booking Approved (Tempahan Diluluskan)
      ↓
Scan QR (Imbas QR)
      ↓
Check-In (Daftar Masuk)
      ↓
Use Facility (Gunakan Kemudahan)
      ↓
Check-Out (Daftar Keluar)
```

---

## 22. Digital Laboratory Logbook

| Butiran | Keterangan |
|---------|------------|
| **Modul** | Digital Laboratory Logbook |
| **Status** | 📄 Direncanakan |
| **Penerangan** | Log digital aktiviti makmal |

### Ciri-ciri Utama (Dirancang)
- ⏳ Aktiviti dilakukan
- ⏳ Peralatan digunakan
- ⏳ Tempoh penggunaan
- ⏳ Nota dan pemerhatian

---

# 📄 Document Management (Pengurusan Dokumentasi)

## 23. Document Management

| Butiran | Keterangan |
|---------|------------|
| **Modul** | Document Management |
| **Status** | 📄 Direncanakan |
| **Penerangan** | Pengurusan dokumen danFail sistem |

### Ciri-ciri Utama (Dirancang)
- ⏳ Muat naik dokumen
- ⏳ Kategorian dokumen
- ⏳ Capaian dokumen
- ⏳ Versi dokumen
- ⏳ Carian dokumen

---

# 📊 KPI Dashboard (Modul Pengurusan Atasan)

## Metrik Pengurusan

| Metrik | Keterangan |
|--------|------------|
| Total Bookings | Jumlah tempahan keseluruhan |
| Laboratory Utilization Rate | Kadar penggunaan makmal |
| Equipment Utilization Rate | Kadar penggunaan peralatan |
| Maintenance Costs | Kos penyelenggaraan |
| Equipment Downtime | Masa henti peralatan |
| Approval SLA | Masa pemprosesan kelulusan |
| Incident Statistics | Statistik insiden |

---

# 📂 Struktur Fail Modul

```
resources/js/Pages/
├── Auth/                          # Pengurusan Pengesahan
├── Dashboard.tsx                  # ✅ Dashboard
├── DashboardDefault.tsx           # ✅ Dashboard Default
├── EquipmentManagement/           # ✅ Pengurusan Peralatan
│   └── Index.tsx
├── LaboratoryManagement/          # ✅ Pengurusan Makmal
│   └── Index.tsx
├── Profile/                       # ✅ Profil Pengguna
│   ├── Edit.tsx
│   └── Partials/
├── UserManagement/                # ✅ Pengurusan Pengguna
│   └── Index.tsx
└── Welcome.tsx                    # Halaman Selamat Datang
```

---

# 🔗 API & Route Structure

```
/                               # Halaman Utama
/login                          # Log Masuk
/register                       # Pendaftaran
/dashboard                      # Dashboard Utama
/dashboard/default              # Dashboard Default
/profile                        # Profil Pengguna
/laboratories                   # Pengurusan Makmal (CRUD)
/laboratories/create            # Cipta Makmal
/laboratories/{id}/edit         # Sunting Makmal
/equipment                      # Pengurusan Peralatan (CRUD)
/equipment/create               # Cipta Peralatan
/equipment/{id}/edit            # Sunting Peralatan
/users                          # Pengurusan Pengguna (CRUD)
/users/create                   # Cipta Pengguna
/users/{id}/edit                # Sunting Pengguna
```

---

# 📈 Roadmap Pelaksanaan

## Fasa 1: Asas Sistem ✅
- [x] Dashboard
- [x] User Management
- [x] Laboratory Management
- [x] Equipment Management
- [x] Authentication System

## Fasa 2: Tempahan & Kelulusan
- [ ] Booking Management
- [ ] Multi-Level Approval Workflow
- [ ] Calendar Management
- [ ] Notification Center

## Fasa 3: Penyelenggaraan & Aset
- [ ] Damage Reporting
- [ ] Maintenance Management
- [ ] Work Order Management
- [ ] Equipment Borrowing

## Fasa 4: Keselamatan & Patuhan
- [ ] Safety Declaration
- [ ] SOP Management
- [ ] Certification & Training
- [ ] Incident Management

## Fasa 5: Inventori & Dokumen
- [ ] Consumable Inventory
- [ ] Document Management

## Fasa 6: Ciri Pintar
- [ ] QR Code Asset Tracking
- [ ] QR Check-In/Check-Out
- [ ] Digital Logbook

## Fasa 7: Analitik & Laporan
- [ ] Reporting & Analytics
- [ ] KPI Dashboard
- [ ] Audit Trail

---

# 📝 Nota

- Dokumen ini dikemaskini secara automatik berdasarkan analisis kod sumber
- Status modul berubah mengikut perkembangan pembangunan
- Rujukan kepada fail berkaitan adalah berdasarkan struktur projek semasa

---

**Dokumen ini dijana pada: 2026**

**Hak Cipta © 2026 FTKIP UTeM. All Rights Reserved.**