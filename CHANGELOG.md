# Changelog

All notable changes to the **SPMP-FTKIP** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-06-20

### Added
- Initialized fresh Laravel 13 project.
- Configured environment details in `.env` for local URL `http://ftkip.test` and MySQL database `db4ftkip`.
- Installed and scaffolded Laravel Breeze developer stack with React 19, TypeScript 5.x, Inertia.js, and Tailwind CSS.
- Added custom `resources/js/bootstrap.ts` to configure Axios for global API request handling.
- Executed database migrations to establish default Laravel user, session, and jobs tables in MySQL.
- Successfully built frontend assets using Vite and verified local site rendering at `http://ftkip.test`.
