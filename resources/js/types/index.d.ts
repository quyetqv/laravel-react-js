import type { UrlMethodPair } from '@inertiajs/core'
import type { ComponentType } from 'react'

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    avatar?: string | undefined;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};

export type BreadcrumbItem = {
    title: string;
    href?: any;
}

export type NavItem = {
    title: string;
    href?: any;
    icon?: ComponentType<any> | null | undefined;
}

export type SharedData = PageProps & {
    name?: string;
    quote?: { message: string; author?: string } | null;
    sidebarOpen?: boolean;
}
