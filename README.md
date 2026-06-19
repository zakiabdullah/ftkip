# SPMP-FTKIP

<div align="center">

# 🏭 Sistem Pengurusan Makmal dan Peralatan FTKIP

### Laboratory Asset Management System (LAMS)

**Faculty of Industrial and Manufacturing Engineering Technology (FTKIP)**
**Universiti Teknikal Malaysia Melaka (UTeM)**

A centralized digital platform for managing laboratories, workshops, equipment, bookings, approvals, maintenance, safety compliance, and asset lifecycle management.

![Laravel](https://img.shields.io/badge/Laravel-13-red)
![PHP](https://img.shields.io/badge/PHP-8.3-blue)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Inertia](https://img.shields.io/badge/Inertia.js-Latest-purple)
![shadcn](https://img.shields.io/badge/shadcn/ui-Latest-black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)

</div>

---

# 📖 Overview

SPMP-FTKIP (Sistem Pengurusan Makmal dan Peralatan FTKIP) is an enterprise-grade Laboratory Asset Management System (LAMS) designed to support the operational, academic, and research activities of the Faculty of Industrial and Manufacturing Engineering Technology (FTKIP), Universiti Teknikal Malaysia Melaka (UTeM).

The platform provides a centralized environment for managing laboratories, workshops, equipment, bookings, approvals, maintenance, safety compliance, inventory tracking, and reporting.

The system aims to digitize and streamline laboratory operations while ensuring accountability, traceability, and efficient utilization of faculty assets.

---

# 🎯 Project Objectives

The system is developed to:

* Centralize laboratory and equipment management.
* Digitize booking and approval processes.
* Improve laboratory asset utilization.
* Reduce scheduling conflicts.
* Support maintenance and calibration management.
* Improve safety compliance and governance.
* Provide operational analytics and reporting.
* Maintain complete audit and activity records.
* Support future smart laboratory initiatives.

---

# 🏗️ Technology Stack

| Layer          | Technology            |
| -------------- | --------------------- |
| Backend        | Laravel 13            |
| Language       | PHP 8.3               |
| Frontend       | React 19              |
| SPA Bridge     | Inertia.js            |
| UI Framework   | shadcn/ui             |
| Styling        | Tailwind CSS 4        |
| Database       | PostgreSQL            |
| Authentication | Laravel Sanctum       |
| Authorization  | Spatie Permission     |
| Validation     | React Hook Form + Zod |
| Charts         | Recharts              |
| Icons          | Lucide React          |
| File Storage   | Laravel Storage       |
| Queue          | Laravel Queue         |
| Notification   | Email + In-App        |
| Deployment     | Linux / Docker        |

---

# 🎨 UI & Design System

The application follows a modern enterprise dashboard design.

| Item              | Configuration            |
| ----------------- | ------------------------ |
| Design Style      | Enterprise Dashboard     |
| Component Library | shadcn/ui                |
| Layout            | Sidebar + Top Navigation |
| Typography        | Inter                    |
| Icons             | Lucide React             |
| Charts            | Recharts                 |
| Theme             | Light & Dark Mode        |
| Border Radius     | rounded-xl               |
| Accessibility     | WCAG Friendly            |
| Responsive        | Desktop, Tablet & Mobile |

---

# 👥 User Roles

| Role                       | Level | Description                                    |
| -------------------------- | ----- | ---------------------------------------------- |
| Super Administrator        | 4     | Full system administration and governance      |
| Assistant Engineer / Admin | 3     | Laboratory operations and equipment management |
| Lecturer / Supervisor      | 2     | Academic verification and booking approvals    |
| Student                    | 1     | Laboratory and equipment booking requests      |

---

# 📦 Core Modules

## Dashboard & Analytics

* Role-based dashboard
* Real-time statistics
* Booking analytics
* Equipment utilization metrics
* Recent activities

---

## User & Role Management

* User management
* Role assignment
* Permission management
* Access control

---

## Laboratory Management

* Laboratory registration
* Workshop management
* Capacity management
* Laboratory status monitoring
* Responsible officer assignment

---

## Equipment Management

* Equipment inventory
* Asset categorization
* Equipment status tracking
* QR Asset Identification
* Equipment image gallery

---

## Booking Management

* Laboratory booking
* Equipment booking
* Time-slot reservation
* Conflict detection
* Booking history

---

## Multi-Level Approval Workflow

Booking approval process:

Student
↓
Supervisor / Lecturer
↓
Assistant Engineer
↓
Approved

Features:

* Approval queue
* Approval history
* Approval comments
* Rejection reasons

---

## Calendar Management

* Daily View
* Weekly View
* Monthly View
* Resource Calendar
* Availability Checker

---

## Notification Center

* In-App Notifications
* Email Notifications
* Booking reminders
* Approval updates
* Maintenance alerts

---

## Audit Trail

* Login activities
* Booking activities
* Approval activities
* System changes
* User actions

---

# 🔧 Asset & Maintenance Modules

## Damage Reporting

Users may submit:

* Equipment damage reports
* Fault reports
* Operational issues

Features:

* Image attachments
* Status tracking
* Resolution monitoring

---

## Maintenance Management

* Preventive maintenance
* Corrective maintenance
* Calibration schedules
* Maintenance history
* Maintenance cost tracking

---

## Maintenance Work Orders

Workflow:

Damage Report
↓
Work Order
↓
Assigned Technician
↓
Repair
↓
Completed

---

## Equipment Borrowing

* Borrowing requests
* Return management
* Return inspection
* Borrowing history

Equipment Status:

* Available
* Reserved
* Borrowed
* Maintenance
* Damaged
* Retired

---

# 🧪 Laboratory Safety Modules

## Safety Declaration

Users must acknowledge:

* Laboratory SOP
* Safety regulations
* Equipment handling procedures

before submitting booking requests.

---

## SOP Management

* Laboratory SOP
* Equipment SOP
* Safety Guidelines
* Downloadable Documents

---

## Certification & Training Management

Certain equipment requires certification before use.

Examples:

* CNC Machine
* Welding Equipment
* Laser Cutter
* 3D Printer

Booking validation:

Certified User
→ Booking Allowed

Non-Certified User
→ Booking Rejected

---

## Incident Management

Record and manage:

* Accidents
* Near Miss Events
* Safety Violations
* Hazard Reports

---

# 📦 Inventory & Consumables

## Consumable Inventory

Manage:

* Filament
* Welding Rods
* Chemicals
* Lubricants
* Measuring Tools

Features:

* Stock tracking
* Stock movement
* Low stock alerts
* Inventory reports

---

# 📱 Smart Laboratory Features

## QR Code Asset Tracking

Every asset can have a unique QR code.

Functions:

* Asset information
* Maintenance history
* Booking history
* Current status
* Location information

---

## QR Check-In / Check-Out

Workflow:

Booking Approved
↓
Scan QR
↓
Check-In
↓
Use Facility
↓
Check-Out

---

## Digital Laboratory Logbook

Record:

* Activity performed
* Equipment used
* Usage duration
* Notes and observations

---

# 📊 Reporting & Analytics

Generate reports for:

* Laboratory utilization
* Equipment utilization
* Booking statistics
* Maintenance statistics
* Incident statistics
* Inventory reports
* User activity reports

---

## KPI Dashboard

Management-level metrics:

* Total Bookings
* Laboratory Utilization Rate
* Equipment Utilization Rate
* Maintenance Costs
* Equipment Downtime
* Approval SLA
* Incident Statistics

---

# 🏛️ System Architecture

```text
┌──────────────────────────────┐
│         React 19 UI          │
│      shadcn/ui + TS          │
└──────────────┬───────────────┘
               │
               │ Inertia.js
               │
┌──────────────▼───────────────┐
│         Laravel 13           │
│     Business Logic Layer     │
└──────────────┬───────────────┘
               │
┌──────────────▼───────────────┐
│         PostgreSQL           │
│      Centralized Storage     │
└──────────────────────────────┘
```

---

# 📂 Documentation Structure

```text
docs/
│
├── 01-Introduction.md
├── 02-PRD.md
├── 03-SRS.md
├── 04-UseCases.md
├── 05-UserRoles.md
├── 06-BusinessRules.md
├── 07-SystemModules.md
├── 08-Workflows.md
├── 09-DatabaseSchema.md
├── 10-ERD.md
├── 11-API.md
├── 12-UIUX.md
├── 13-Security.md
├── 14-Deployment.md
├── 15-Testing.md
├── 16-Todo.md
└── 17-Roadmap.md
```

---

# 🚀 Development Setup

## Requirements

* PHP 8.3+
* Composer
* Node.js 20+
* PostgreSQL 16+
* Git

---

## Installation

```bash
git clone <repository-url>
cd spmp-ftkip

composer install
npm install

cp .env.example .env

php artisan key:generate
php artisan migrate --seed
```

---

## Start Development Server

```bash
composer run dev
```

Application URL:

```text
http://localhost:8000
```

---

# 🔮 Future Enhancements

* UTeM Single Sign-On (SSO)
* Progressive Web App (PWA)
* Mobile Application
* RFID Integration
* IoT Laboratory Monitoring
* Smart Asset Tracking
* AI Predictive Maintenance
* AI Utilization Analytics
* Integration with University Asset Systems

---

# 📄 License

Developed exclusively for:

Faculty of Industrial and Manufacturing Engineering Technology (FTKIP)
Universiti Teknikal Malaysia Melaka (UTeM)

© 2026 FTKIP UTeM. All Rights Reserved.
