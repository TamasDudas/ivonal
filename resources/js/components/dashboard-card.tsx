import { Card, CardContent } from '@/components/ui/card';
import { Link } from '@inertiajs/react';

interface DashboardCardProps {
 linkText: string;
 linkHref: string;
 icon: React.ComponentType<{ className?: string }>;
}

export default function DashboardCard({
 linkText,
 linkHref,
 icon: Icon,
}: DashboardCardProps) {
 return (
  <Link href={linkHref}>
   <Card className="flex h-40 items-center justify-center overflow-hidden">
    <CardContent className="flex flex-col items-center justify-center p-6 text-xl font-bold">
     <Icon className="mb-2 h-10 w-10" />
     <span>{linkText}</span>
    </CardContent>
   </Card>
  </Link>
 );
}
