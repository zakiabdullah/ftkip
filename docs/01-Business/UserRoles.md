# User Roles & System Permissions

This document outlines the hierarchy and permissions of the user accounts in **SPMP-FTKIP**.

---

## Role Definitions

### 1. Level 4: Super Administrator
- **Target Audience**: IT administrators and system governance officers.
- **Capabilities**:
  - Global system settings (e.g. university terms, maintenance modes).
  - Creation and management of user accounts.
  - Custom Role & Permission assignments (using Spatie dynamic roles).
  - Inspection of security logs and system audit trails.

### 2. Level 3: Assistant Engineer / Admin
- **Target Audience**: Lab technicians, assistant engineers, and facility officers.
- **Capabilities**:
  - Laboratory registration, details, capacity limits, and operating hours.
  - Equipment inventories, adding items, setting statuses, uploading images.
  - Releasing consumables stock and managing minimum thresholds.
  - Creating QR codes for assets and printing doors check-in codes.
  - Approving student bookings (final verification).
  - Logging damage reports and creating work orders.

### 3. Level 2: Lecturer / Supervisor
- **Target Audience**: Academic faculty members, project supervisors, and class instructors.
- **Capabilities**:
  - Review and approve/reject booking requests submitted by students under their academic guidance.
  - View students' safety certification statuses.
  - Browse laboratory schedules and equipment statistics.
  - File damage reports for equipment.

### 4. Level 1: Student / Researcher
- **Target Audience**: Undergraduate, postgraduate, and faculty researchers.
- **Capabilities**:
  - Browse laboratories and check equipment availability calendars.
  - Book lab space and specific machinery.
  - Sign safety declarations.
  - Submit equipment damage reports (with photo proof).
  - Perform logbook entries via QR Check-In / Check-Out.
  - View booking histories.