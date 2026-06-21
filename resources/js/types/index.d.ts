export interface Role {
    id: number;
    name: string;
}

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    email_verified_at?: string;
    roles?: Role[];
    created_at?: string;
    updated_at?: string;
}

export interface Laboratory {
    id: number;
    name: string;
    code: string;
    capacity: number;
    location: string;
    status: 'active' | 'inactive' | 'maintenance';
    responsible_officer_id: number;
    responsible_officer?: User;
    created_at: string;
    updated_at: string;
}

export interface Equipment {
    id: number;
    laboratory_id: number;
    laboratory?: Laboratory;
    name: string;
    asset_tag: string;
    serial_number: string | null;
    status: 'available' | 'reserved' | 'borrowed' | 'maintenance' | 'damaged' | 'retired';
    image_path: string | null;
    created_at: string;
    updated_at: string;
}

export interface EquipmentInventoryItem {
    id: number;
    laboratory_id: number;
    laboratory?: Laboratory;
    name: string;
    quantity: number;
    unit_type: 'unit' | 'set' | 'piece' | 'license';
    track_individually: boolean;
    status: 'available' | 'maintenance' | 'damaged' | 'retired';
    source_text: string | null;
    created_at: string;
    updated_at: string;
}

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
}

export interface DashboardBooking {
    id: number;
    start_time: string;
    end_time: string;
    purpose: string;
    status: 'pending_supervisor' | 'pending_admin' | 'approved' | 'rejected' | 'cancelled';
    created_at: string;
    user_name: string;
    laboratory_name: string;
    laboratory_code: string;
}

export interface DashboardStats {
    total_users: number;
    total_laboratories: number;
    total_equipment: number;
    total_bookings: number;
    lab_status_counts: {
        active: number;
        inactive: number;
        maintenance: number;
    };
    equipment_status_counts: {
        available: number;
        reserved: number;
        borrowed: number;
        maintenance: number;
        damaged: number;
        retired: number;
    };
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    flash?: {
        success?: string;
        error?: string;
    };
};
