# Changelog

All notable changes to the **SPMP-FTKIP** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2026-06-20

### Added
- Added unique `username` column to `users` table database schema.
- Added username validation and registration input field on the `Register.tsx` page.

### Changed
- Updated `LoginRequest.php` authentication and rate limiting validation to accept either email or username via a unified "login" field.
- Updated `Login.tsx` view to prompt users with "Email or Username".
- Seeded the default user `ahmadzaki@utem.edu.my` with the username `ahmadzaki` in `DatabaseSeeder.php`.

## [0.2.0] - 2026-06-20

### Added
- Created 10 core relational database migration files (laboratories, equipment, bookings, damage reports, work orders, certifications, consumables, logbooks) and ran them successfully.
- Initialized `shadcn/ui` component library (Radix + Nova preset) configured to use capitalized component paths (`@/Components`).
- Installed 18 shadcn UI primitives (button, card, dialog, sheet, sidebar, table, tabs, tooltip, popover, select, input, label, badge, avatar, calendar, separator, skeleton, dropdown-menu) and copied custom inputs (date-time picker, custom date range picker, form, switch, checkbox, textarea, alert-dialog).
- Installed Spatie Permission authorization package and created `roles` and `permissions` tables.
- Programmed `DatabaseSeeder.php` to seed default roles and create user **Ahmad Zaki Abdullah** (ID 1, ahmadzaki@utem.edu.my) assigned to the `Super Administrator` role.
- Added comprehensive English system documentation (63 markdown files) in `docs/` detailing all module specs, database schemas, and workflows.
- Installed `react-hook-form`, `zod`, `@hookform/resolvers`, and `@radix-ui/react-icons` dependencies.

### Changed
- Refactored authentication views (`Login.tsx`, `Register.tsx`, and `GuestLayout.tsx`) to use shadcn/ui components.
- Upgraded root `tailwindcss` dependency to `^4.0.0` and integrated `@tailwindcss/postcss` in `postcss.config.js` to fix PostCSS compatibility with Tailwind CSS v4.
- Fixed case-sensitivity import paths for Next.js template assets in React components.
- Sanitized `<Calendar>` properties in `date-time-picker.tsx` for `react-day-picker` v10 compatibility.

## [0.1.0] - 2026-06-20

### Added
- Initialized fresh Laravel 13 project.
- Configured environment details in `.env` for local URL `http://ftkip.test` and MySQL database `db4ftkip`.
- Installed and scaffolded Laravel Breeze developer stack with React 19, TypeScript 5.x, Inertia.js, and Tailwind CSS.
- Added custom `resources/js/bootstrap.ts` to configure Axios for global API request handling.
- Executed database migrations to establish default Laravel user, session, and jobs tables in MySQL.
- Successfully built frontend assets using Vite and verified local site rendering at `http://ftkip.test`.
