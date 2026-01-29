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
 image_url?: string;
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
 smoking: 'igen' | 'nem';
 pets: 'igen' | 'nem';
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
 city_name?: string;
 featured_image?: string;
 media?: Media[];
 images?: string[];
 created_at: string;
 updated_at: string;
}

export interface PropertyFormData {
 id: number;
 city_id: number;
 street: string;
 latitude?: number | null;
 longitude?: number | null;
 rental_price?: string | null;
 sale_price?: string | null;
 size?: string | null;
 floor_area?: string | null;
 minimum_rental_period?: string | null;
 year_built?: string | null;
 building_floors?: string | null;
 floor?: string | null;
 balcony?: string | null;
 view?: string | null;
 heating_type?: string | null;
 parking?: string | null;
 furniture: 'igen' | 'nem';
 appliances: 'igen' | 'nem';
 air_conditioning: 'igen' | 'nem';
 elevator: 'igen' | 'nem';
 smoking: 'igen' | 'nem';
 pets: 'igen' | 'nem';
 is_featured: 'igen' | 'nem';
 short_description?: string | null;
 description?: string | null;
 meta_title?: string | null;
 meta_description?: string | null;
 meta_keywords?: string | null;
}

export interface PaginatedData<T> {
 data: T[];
 current_page: number;
 last_page: number;
 per_page: number;
 total: number;
 next_page_url: string | null;
 links: Array<{ url: string | null; label: string; active: boolean }>;
}

// Props for a reusable delete confirmation dialog component
export interface DeleteConfirmationDialogProps {
 title: string;
 description: string | React.ReactNode;
 confirmText: string;
 cancelText?: string;
 onConfirm: () => void;
 variant?: 'destructive' | 'default';
 items: { data: Array<{ id: number; [key: string]: any }> };
 itemIdToDelete: number | null;
 setItemIdToDelete: (id: number | null) => void;
 displayField?: string; // melyik mezőt jelenítsük meg (pl. 'name', 'street')
}
