# ERD Mermaid Diagram

```mermaid
erDiagram
    USER ||--o{ BOOKING : makes
    LABORATORY ||--o{ EQUIPMENT : contains
    BOOKING }|--|| LABORATORY : reserves
    DAMAGE_REPORT }|--|| EQUIPMENT : targets
```