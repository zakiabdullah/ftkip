# Database Schema Specification

This document details the database tables, fields, types, and indexes for **SPMP-FTKIP**. The system uses a centralized relational schema in MySQL.

---

## 1. Table: `users`
Represents all system users (students, supervisors, assistant engineers, administrators).

| Column Name | Data Type | Key / Constraint | Description |
| --- | --- | --- | --- |
| `id` | BIGINT UNSIGNED | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the user. |
| `name` | VARCHAR(255) | NOT NULL | Full name of the user. |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL | UTeM email address (e.g. `@student.utem.edu.my`). |
| `email_verified_at` | TIMESTAMP | NULLABLE | Email verification timestamp. |
| `password` | VARCHAR(255) | NOT NULL | Hashed password. |
| `remember_token` | VARCHAR(100) | NULLABLE | Session remember token. |
| `created_at` | TIMESTAMP | NULLABLE | Record creation timestamp. |
| `updated_at` | TIMESTAMP | NULLABLE | Record update timestamp. |

---

## 2. Table: `laboratories`
Represents the physical laboratories, workshops, and facilities at FTKIP.

| Column Name | Data Type | Key / Constraint | Description |
| --- | --- | --- | --- |
| `id` | BIGINT UNSIGNED | PRIMARY KEY, AUTO_INCREMENT | Unique laboratory identifier. |
| `name` | VARCHAR(255) | NOT NULL | Name of the lab/workshop. |
| `code` | VARCHAR(50) | UNIQUE, NOT NULL | Academic/facility code (e.g. `L-01-A`). |
| `capacity` | INT | NOT NULL, DEFAULT 20 | Maximum number of occupants allowed. |
| `location` | VARCHAR(255) | NOT NULL | Building name, level, or room number. |
| `status` | ENUM | NOT NULL, DEFAULT 'active' | Status: `active`, `inactive`, `maintenance`. |
| `responsible_officer_id` | BIGINT UNSIGNED | FOREIGN KEY -> `users.id` | The Assistant Engineer in charge of the lab. |
| `created_at` | TIMESTAMP | NULLABLE | Record creation timestamp. |
| `updated_at` | TIMESTAMP | NULLABLE | Record update timestamp. |

---

## 3. Table: `equipment`
Represents high-value assets and machines housed within the laboratories.

| Column Name | Data Type | Key / Constraint | Description |
| --- | --- | --- | --- |
| `id` | BIGINT UNSIGNED | PRIMARY KEY, AUTO_INCREMENT | Unique equipment identifier. |
| `laboratory_id` | BIGINT UNSIGNED | FOREIGN KEY -> `laboratories.id` | Lab where the equipment is located. |
| `name` | VARCHAR(255) | NOT NULL | Name of the machine/equipment. |
| `asset_tag` | VARCHAR(100) | UNIQUE, NOT NULL | Unique physical tag number (e.g. `UTeM-FTKIP-EQ-005`). |
| `serial_number` | VARCHAR(100) | NULLABLE | Manufacturer serial number. |
| `status` | ENUM | NOT NULL, DEFAULT 'available' | Status: `available`, `reserved`, `borrowed`, `maintenance`, `damaged`, `retired`. |
| `image_path` | VARCHAR(255) | NULLABLE | Path to uploaded image in storage. |
| `created_at` | TIMESTAMP | NULLABLE | Record creation timestamp. |
| `updated_at` | TIMESTAMP | NULLABLE | Record update timestamp. |

---

## 4. Table: `bookings`
Represents facility and equipment reservations submitted by students.

| Column Name | Data Type | Key / Constraint | Description |
| --- | --- | --- | --- |
| `id` | BIGINT UNSIGNED | PRIMARY KEY, AUTO_INCREMENT | Unique booking ID. |
| `user_id` | BIGINT UNSIGNED | FOREIGN KEY -> `users.id` | Student making the reservation. |
| `laboratory_id` | BIGINT UNSIGNED | FOREIGN KEY -> `laboratories.id` | Laboratory reserved. |
| `equipment_id` | BIGINT UNSIGNED | FOREIGN KEY -> `equipment.id`, NULLABLE | Specific machine reserved (optional). |
| `start_time` | TIMESTAMP | NOT NULL | Start datetime of the reservation. |
| `end_time` | TIMESTAMP | NOT NULL | End datetime of the reservation. |
| `purpose` | TEXT | NOT NULL | Reason/project for reservation. |
| `safety_declared` | TINYINT(1) | NOT NULL, DEFAULT 0 | Signed declaration checklist status (true/false). |
| `status` | ENUM | NOT NULL, DEFAULT 'pending_supervisor' | Status: `pending_supervisor`, `pending_admin`, `approved`, `rejected`, `cancelled`. |
| `supervisor_id` | BIGINT UNSIGNED | FOREIGN KEY -> `users.id` | The academic lecturer responsible for verification. |
| `approved_by_supervisor_id` | BIGINT UNSIGNED | FOREIGN KEY -> `users.id`, NULLABLE | Supervisor who signed off. |
| `approved_by_admin_id` | BIGINT UNSIGNED | FOREIGN KEY -> `users.id`, NULLABLE | Assistant Engineer who signed off. |
| `rejection_reason` | TEXT | NULLABLE | Note explaining rejection. |
| `created_at` | TIMESTAMP | NULLABLE | Record creation timestamp. |
| `updated_at` | TIMESTAMP | NULLABLE | Record update timestamp. |

---

## 5. Table: `damage_reports`
Represents equipment faults, operational failures, or physical damages reported.

| Column Name | Data Type | Key / Constraint | Description |
| --- | --- | --- | --- |
| `id` | BIGINT UNSIGNED | PRIMARY KEY, AUTO_INCREMENT | Unique report ID. |
| `equipment_id` | BIGINT UNSIGNED | FOREIGN KEY -> `equipment.id` | Damaged machine. |
| `reporter_id` | BIGINT UNSIGNED | FOREIGN KEY -> `users.id` | User filing the report. |
| `description` | TEXT | NOT NULL | Details of damage or malfunction. |
| `image_path` | VARCHAR(255) | NULLABLE | Attachment of physical proof. |
| `status` | ENUM | NOT NULL, DEFAULT 'submitted' | Status: `submitted`, `under_review`, `work_order_created`, `resolved`, `rejected`. |
| `created_at` | TIMESTAMP | NULLABLE | Record creation timestamp. |
| `updated_at` | TIMESTAMP | NULLABLE | Record update timestamp. |

---

## 6. Table: `work_orders`
Represents a formal maintenance task assigned to resolve a damage report or perform routine maintenance.

| Column Name | Data Type | Key / Constraint | Description |
| --- | --- | --- | --- |
| `id` | BIGINT UNSIGNED | PRIMARY KEY, AUTO_INCREMENT | Unique work order ID. |
| `damage_report_id` | BIGINT UNSIGNED | FOREIGN KEY -> `damage_reports.id`, NULLABLE | Relational damage report. |
| `equipment_id` | BIGINT UNSIGNED | FOREIGN KEY -> `equipment.id` | Target machinery. |
| `technician_id` | BIGINT UNSIGNED | FOREIGN KEY -> `users.id`, NULLABLE | Staff assigned to repair. |
| `assigned_by` | BIGINT UNSIGNED | FOREIGN KEY -> `users.id` | Assistant engineer initiating work order. |
| `status` | ENUM | NOT NULL, DEFAULT 'assigned' | Status: `assigned`, `in_progress`, `completed`, `cancelled`. |
| `notes` | TEXT | NULLABLE | Resolution logs or part replacement details. |
| `cost` | DECIMAL(10,2) | NULLABLE, DEFAULT 0.00 | Repair cost in MYR. |
| `created_at` | TIMESTAMP | NULLABLE | Record creation timestamp. |
| `updated_at` | TIMESTAMP | NULLABLE | Record update timestamp. |

---

## 7. Table: `certifications`
Defines machines requiring certified safety training clearance before booking.

| Column Name | Data Type | Key / Constraint | Description |
| --- | --- | --- | --- |
| `id` | BIGINT UNSIGNED | PRIMARY KEY, AUTO_INCREMENT | Unique ID. |
| `name` | VARCHAR(255) | NOT NULL | Certification name (e.g. `CNC Laser Certification`). |
| `description` | TEXT | NULLABLE | Brief syllabus or competency requirements. |
| `created_at` | TIMESTAMP | NULLABLE | Record creation timestamp. |
| `updated_at` | TIMESTAMP | NULLABLE | Record update timestamp. |

---

## 8. Table: `user_certifications`
Maps users to the safety certifications they have successfully completed.

| Column Name | Data Type | Key / Constraint | Description |
| --- | --- | --- | --- |
| `id` | BIGINT UNSIGNED | PRIMARY KEY, AUTO_INCREMENT | Map record ID. |
| `user_id` | BIGINT UNSIGNED | FOREIGN KEY -> `users.id` | User receiving certificate. |
| `certification_id` | BIGINT UNSIGNED | FOREIGN KEY -> `certifications.id` | Type of certification. |
| `issued_at` | DATE | NOT NULL | Date training completed. |
| `expires_at` | DATE | NULLABLE | Date certification expires (if applicable). |
| `status` | ENUM | NOT NULL, DEFAULT 'active' | Status: `active`, `expired`, `revoked`. |
| `created_at` | TIMESTAMP | NULLABLE | Record creation timestamp. |
| `updated_at` | TIMESTAMP | NULLABLE | Record update timestamp. |

---

## 9. Table: `equipment_certifications`
Links specific high-risk equipment to the required certifications.

| Column Name | Data Type | Key / Constraint | Description |
| --- | --- | --- | --- |
| `id` | BIGINT UNSIGNED | PRIMARY KEY, AUTO_INCREMENT | Map record ID. |
| `equipment_id` | BIGINT UNSIGNED | FOREIGN KEY -> `equipment.id` | Target equipment. |
| `certification_id` | BIGINT UNSIGNED | FOREIGN KEY -> `certifications.id` | Required certification to operate. |
| `created_at` | TIMESTAMP | NULLABLE | Record creation timestamp. |
| `updated_at` | TIMESTAMP | NULLABLE | Record update timestamp. |

---

## 10. Table: `consumables`
Manages stocks of items consumed in laboratories (welding rods, filaments, chemicals).

| Column Name | Data Type | Key / Constraint | Description |
| --- | --- | --- | --- |
| `id` | BIGINT UNSIGNED | PRIMARY KEY, AUTO_INCREMENT | Unique consumable ID. |
| `laboratory_id` | BIGINT UNSIGNED | FOREIGN KEY -> `laboratories.id` | Housed laboratory. |
| `name` | VARCHAR(255) | NOT NULL | Name of chemical, material, or tool. |
| `sku` | VARCHAR(100) | UNIQUE, NOT NULL | Stock Keeping Unit. |
| `stock_level` | DECIMAL(10,2) | NOT NULL, DEFAULT 0.00 | Current quantity available. |
| `reorder_level` | DECIMAL(10,2) | NOT NULL, DEFAULT 5.00 | Threshold for low stock warning. |
| `unit` | VARCHAR(50) | NOT NULL | Measurement unit: `kg`, `liters`, `pcs`, `rolls`. |
| `created_at` | TIMESTAMP | NULLABLE | Record creation timestamp. |
| `updated_at` | TIMESTAMP | NULLABLE | Record update timestamp. |

---

## 11. Table: `logbooks`
Digital logbook records for laboratory checks and physical operations.

| Column Name | Data Type | Key / Constraint | Description |
| --- | --- | --- | --- |
| `id` | BIGINT UNSIGNED | PRIMARY KEY, AUTO_INCREMENT | Log ID. |
| `booking_id` | BIGINT UNSIGNED | FOREIGN KEY -> `bookings.id` | Associated booking reservation. |
| `user_id` | BIGINT UNSIGNED | FOREIGN KEY -> `users.id` | User signing check-in/out. |
| `laboratory_id` | BIGINT UNSIGNED | FOREIGN KEY -> `laboratories.id` | Associated laboratory. |
| `check_in_time` | TIMESTAMP | NOT NULL | Actual arrival datetime. |
| `check_out_time` | TIMESTAMP | NULLABLE | Actual departure datetime. |
| `activity_performed` | TEXT | NULLABLE | Student entry explaining work done. |
| `remarks` | TEXT | NULLABLE | Issues observed or equipment notes. |
| `created_at` | TIMESTAMP | NULLABLE | Record creation timestamp. |
| `updated_at` | TIMESTAMP | NULLABLE | Record update timestamp. |