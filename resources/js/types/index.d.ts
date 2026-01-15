import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
 user: User;
}

export interface BreadcrumbItem {
 title: string;
 href: string;
}

export interface NavGroup {
 title: string;
 items: NavItem[];
}

export interface NavItem {
 title: string;
 href: NonNullable<InertiaLinkProps['href']>;
 icon?: LucideIcon | null;
 isActive?: boolean;
}

export interface SharedData {
 name: string;
 quote: { message: string; author: string };
 auth: Auth;
 sidebarOpen: boolean;
 [key: string]: unknown;
}

export interface User {
 id: number;
 name: string;
 email: string;
 avatar?: string;
 email_verified_at: string | null;
 two_factor_enabled?: boolean;
 created_at: string;
 updated_at: string;
 [key: string]: unknown; // This allows for additional properties...
}

export interface Media {
 id: number;
 user_id: number;
 filename: string;
 path: string;
 original_filename: string;
 versions: Record<string, any>;
 size: number;
 mime_type: string;
 width: number;
 height: number;
 alt_text: string;
 url?: string;
 created_at: string;
 updated_at: string;
}

export interface City {
 id: number;
 user_id: number;
 name: string;
 slug: string;
 description: string;
 featured_img_id: number;
 meta_title: string;
 meta_description: string;
 meta_keywords: string;
 user?: User;
 featuredImage?: Media;
 created_at: string;
 updated_at: string;
}

export interface Property {
 id: number;
 user_id: number;
 city_id: number;
 featured_img_id: number;
 street: string;
 slug: string;
 latitude: number;
 longitude: number;
 rental_price: number;
 size: number;
 sale_price: number;
 minimum_rental_period: number;
 year_built: number;
 building_floors: number;
 floor: number;
 balcony: boolean;
 furniture: boolean;
 appliances: boolean;
 view: string;
 heating_type: string;
 parking: boolean;
 air_conditioning: boolean;
 smoking: boolean;
 pets: boolean;
 elevator: boolean;
 is_featured: boolean;
 floor_area: number;
 short_description: string;
 description: string;
 meta_title: string;
 meta_description: string;
 meta_keywords: string;
 user?: User;
 city?: City;
 featured_image?: string;
 media?: Media[];
 created_at: string;
 updated_at: string;
}
