export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    email_verified_at?: string;
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
