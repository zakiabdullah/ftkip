# Reporting Analytics Module

## 1. Overview
The **Reporting Analytics** module is a core functional component of the **SPMP-FTKIP** system.
Compiles PDF/CSV records of lab utilization rates, equipment downtime, and student logs.

---

## 2. User Interfaces & Forms
- **Main List Page**: Table displaying all relevant items with search, filters, and paginate controls.
- **Form Component**: Modal dialog or full page containing fields with Zod schema validation.
- **Action Controls**: Quick toggle switches, edit triggers, delete prompts, and file upload fields.

---

## 3. Technical Structure
- **Vite/React Component**: `resources/js/Pages/ReportingAnalytics/Index.tsx`
- **TypeScript Interface File**: `resources/js/types/index.d.ts` (contains types for module objects)
- **Laravel Controller**: `app/Http/Controllers/Web/ReportingAnalyticsController.php`
- **Laravel API Route Path**: `/api/v1/` or `Inertia::render` routes.

---

## 4. Key Logic & Business Rules
- Uses Sanctum for request authorization checks.
- Connects directly to core tables in the database schema.
- Dispatches audit logs using the Laravel Eloquent observer pattern.