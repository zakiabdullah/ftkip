# Relational Database Schema ERD

Below is the complete database structure for **SPMP-FTKIP** mapped using a Mermaid Entity-Relationship diagram.

```mermaid
erDiagram
    users {
        bigint id PK
        varchar name
        varchar email
        timestamp email_verified_at
        varchar password
        timestamp created_at
        timestamp updated_at
    }

    laboratories {
        bigint id PK
        varchar name
        varchar code
        int capacity
        varchar location
        enum status
        bigint responsible_officer_id FK
        timestamp created_at
        timestamp updated_at
    }

    equipment {
        bigint id PK
        bigint laboratory_id FK
        varchar name
        varchar asset_tag
        varchar serial_number
        enum status
        varchar image_path
        timestamp created_at
        timestamp updated_at
    }

    bookings {
        bigint id PK
        bigint user_id FK
        bigint laboratory_id FK
        bigint equipment_id FK
        timestamp start_time
        timestamp end_time
        text purpose
        tinyint safety_declared
        enum status
        bigint supervisor_id FK
        bigint approved_by_supervisor_id FK
        bigint approved_by_admin_id FK
        text rejection_reason
        timestamp created_at
        timestamp updated_at
    }

    damage_reports {
        bigint id PK
        bigint equipment_id FK
        bigint reporter_id FK
        text description
        varchar image_path
        enum status
        timestamp created_at
        timestamp updated_at
    }

    work_orders {
        bigint id PK
        bigint damage_report_id FK
        bigint equipment_id FK
        bigint technician_id FK
        bigint assigned_by FK
        enum status
        text notes
        decimal cost
        timestamp created_at
        timestamp updated_at
    }

    certifications {
        bigint id PK
        varchar name
        text description
    }

    user_certifications {
        bigint id PK
        bigint user_id FK
        bigint certification_id FK
        date issued_at
        date expires_at
        enum status
    }

    equipment_certifications {
        bigint id PK
        bigint equipment_id FK
        bigint certification_id FK
    }

    consumables {
        bigint id PK
        bigint laboratory_id FK
        varchar name
        varchar sku
        decimal stock_level
        decimal reorder_level
        varchar unit
    }

    logbooks {
        bigint id PK
        bigint booking_id FK
        bigint user_id FK
        bigint laboratory_id FK
        timestamp check_in_time
        timestamp check_out_time
        text activity_performed
        text remarks
    }

    users ||--o{ bookings : "makes"
    users ||--o{ damage_reports : "reports"
    users ||--o{ work_orders : "resolves"
    users ||--o{ user_certifications : "acquires"
    
    laboratories ||--o{ equipment : "houses"
    laboratories ||--o{ bookings : "hosts"
    laboratories ||--o{ consumables : "contains"
    laboratories ||--o{ logbooks : "records"
    
    equipment ||--o{ bookings : "scheduled"
    equipment ||--o{ damage_reports : "malfunctions"
    equipment ||--o{ work_orders : "repaired"
    equipment ||--o{ equipment_certifications : "restricts"
    
    bookings ||--o| logbooks : "details"
    damage_reports ||--o| work_orders : "triggers"
    certifications ||--o{ user_certifications : "grants"
    certifications ||--o{ equipment_certifications : "guards"