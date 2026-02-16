import { AppContent } from '@/components/app-content';
import { AppHeader } from '@/components/app-header';
import { AppShell } from '@/components/app-shell';
import Footer from '@/components/footer';
import { cn } from '@/lib/utils';
import { type BreadcrumbItem } from '@/types';
import type { PropsWithChildren } from 'react';

export default function AppHeaderLayout({
 children,
 breadcrumbs,
 className,
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[]; className?: string }>) {
 return (
  <AppShell>
   <AppHeader breadcrumbs={breadcrumbs} />
   <AppContent className={cn('my-10 max-w-7xl px-4 md:px-8', className)}>
    {children}
   </AppContent>
   <Footer />
  </AppShell>
 );
}
