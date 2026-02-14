import { Breadcrumbs } from '@/components/breadcrumbs';
import { Icon } from '@/components/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
 NavigationMenu,
 NavigationMenuItem,
 NavigationMenuList,
 navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
 Sheet,
 SheetContent,
 SheetHeader,
 SheetTitle,
 SheetTrigger,
} from '@/components/ui/sheet';
import { UserMenuContent } from '@/components/user-menu-content';
import { useInitials } from '@/hooks/use-initials';
import { cn, isSameUrl } from '@/lib/utils';
import { dashboard, login, register } from '@/routes';
import { type BreadcrumbItem, type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown, LayoutGrid, Menu } from 'lucide-react';
import { route } from 'ziggy-js';
import AppLogo from './app-logo';
import AppLogoIcon from './app-logo-icon';

const mainNavItems: NavItem[] = [
 {
  title: 'Dashboard',
  href: dashboard(),
  icon: LayoutGrid,
 },
 {
  title: 'Home',
  href: '/',
 },
 {
  title: 'Kapcsolat',
  href: '/kapcsolat',
 },
];

// const rightNavItems: NavItem[] = [
//   {
//     title: 'Repository',
//     href: 'https://github.com/laravel/react-starter-kit',
//     icon: Folder,
//   },
//   {
//     title: 'Documentation',
//     href: 'https://laravel.com/docs/starter-kits#react',
//     icon: BookOpen,
//   },
// ];

const activeItemStyles = 'bg-secondary text-neutral-100';

interface AppHeaderProps {
 breadcrumbs?: BreadcrumbItem[];
}

export function AppHeader({ breadcrumbs = [] }: AppHeaderProps) {
 const page = usePage<SharedData>();
 const { auth, cities } = page.props;
 const getInitials = useInitials();

 // Cities lehet Resource Collection (cities.data) vagy sima array
 const cityList = Array.isArray(cities) ? cities : cities?.data || [];

 const displayNavItems = auth.user
  ? mainNavItems
  : mainNavItems.filter((item) => !['Dashboard'].includes(item.title));
 return (
  <>
   <div className="border-b border-sidebar-border/80 px-4">
    <div className="mx-auto mt-2 flex h-16 max-w-7xl items-center px-8">
     {/* Mobile Menu */}
     <div className="lg:hidden">
      <Sheet>
       <SheetTrigger asChild>
        <Button
         variant="ghost"
         className="mr-2 p-0"
         style={{
          width: '20px',
          height: '20px',
          minWidth: '20px',
          minHeight: '20px',
         }}
        >
         <Menu className="h-7 w-7" style={{ width: '35px', height: '35px' }} />
        </Button>
       </SheetTrigger>
       <SheetContent
        side="left"
        className="flex h-full w-64 flex-col items-stretch justify-between bg-sidebar"
       >
        <SheetTitle className="sr-only">Navigációs menü</SheetTitle>
        <SheetHeader className="flex justify-start text-left">
         <AppLogoIcon />
        </SheetHeader>
        <div className="flex h-full flex-1 flex-col space-y-4 p-4">
         <div className="flex h-full flex-col justify-between text-sm">
          <div className="flex flex-col space-y-4">
           {displayNavItems.map((item) => (
            <Link
             key={item.title}
             href={item.href}
             className="flex items-center space-x-2 font-medium"
            >
             {item.icon && <Icon iconNode={item.icon} className="h-5 w-5" />}
             <span>{item.title}</span>
            </Link>
           ))}

           {/* Városok a mobil menüben */}
           {cityList.length > 0 && (
            <div className="border-t border-sidebar-border pt-4">
             <p className="mb-2 text-xs font-semibold text-muted-foreground uppercase">
              Városok
             </p>
             {cityList
              .filter((city) => city.slug)
              .map((city) => (
               <Link
                key={city.id}
                href={route('properties.by.city', { city: city.slug })}
                className="flex items-center space-x-2 py-2 font-medium"
               >
                <span>{city.name}</span>
               </Link>
              ))}
            </div>
           )}

           {/* Auth linkek mobil menüben */}
           {!auth.user && (
            <div className="border-t border-sidebar-border pt-4">
             <Link href={login()} className="block py-2 font-medium">
              Login
             </Link>
             <Link href={register()} className="block py-2 font-medium">
              Register
             </Link>
            </div>
           )}
          </div>

          {/* User menu mobilban, ha be van jelentkezve */}
          {auth.user && (
           <div className="border-t border-sidebar-border pt-4">
            <UserMenuContent user={auth.user} />
           </div>
          )}
         </div>
        </div>
       </SheetContent>
      </Sheet>
     </div>

     <Link
      href="/"
      prefetch
      className="mr-8 hidden items-center space-x-2 lg:flex"
     >
      <AppLogo className="w-20 md:w-24 lg:w-28" />
     </Link>

     {/* Desktop Navigation */}
     <div className="mb-2 ml-6 hidden h-full items-center space-x-6 lg:flex">
      <NavigationMenu className="flex h-full items-stretch">
       <NavigationMenuList className="flex h-full items-stretch space-x-2">
        {displayNavItems.map((item, index) => (
         <NavigationMenuItem
          key={index}
          className="relative flex h-full items-center"
         >
          <Link
           href={item.href}
           className={cn(
            navigationMenuTriggerStyle(),
            isSameUrl(page.url, item.href) && activeItemStyles,
            'h-9 cursor-pointer px-3',
           )}
          >
           {item.icon && <Icon iconNode={item.icon} className="mr-2 h-4 w-4" />}
           {item.title}
          </Link>
          {isSameUrl(page.url, item.href) && (
           <div className="absolute bottom-0 left-0 h-0.5 w-full translate-y-px bg-white"></div>
          )}
         </NavigationMenuItem>
        ))}

        {/* Városok dropdown menü */}
        {cityList.length > 0 && (
         <NavigationMenuItem className="relative flex h-full items-center">
          <DropdownMenu>
           <DropdownMenuTrigger asChild>
            <Button
             variant="ghost"
             className={cn(
              navigationMenuTriggerStyle(),
              'h-9 cursor-pointer px-3',
             )}
            >
             Városok
             <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
           </DropdownMenuTrigger>
           <DropdownMenuContent align="start">
            {cityList
             .filter((city) => city.slug)
             .map((city) => (
              <DropdownMenuItem key={city.id} asChild>
               <Link
                href={route('properties.by.city', { city: city.slug })}
                className="w-full cursor-pointer"
               >
                {city.name}
               </Link>
              </DropdownMenuItem>
             ))}
           </DropdownMenuContent>
          </DropdownMenu>
         </NavigationMenuItem>
        )}
       </NavigationMenuList>
      </NavigationMenu>
     </div>

     {/* Logo mobilban jobbra */}
     <div className="ml-auto flex items-center lg:hidden">
      <Link href="/" prefetch className="flex items-center space-x-2">
       <AppLogo className="w-20 md:w-24" />
      </Link>
     </div>

     {/* Auth csak desktopban */}
     <div className="ml-auto hidden items-center space-x-2 lg:flex">
      {auth.user ? (
       <DropdownMenu>
        <DropdownMenuTrigger asChild>
         <Button variant="ghost" className="size-10 rounded-full p-1">
          <Avatar className="size-8 overflow-hidden rounded-full">
           <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
           <AvatarFallback className="bg-destructive text-popover-foreground">
            {getInitials(auth.user.name)}
           </AvatarFallback>
          </Avatar>
         </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
         <UserMenuContent user={auth.user} />
        </DropdownMenuContent>
       </DropdownMenu>
      ) : (
       <div className="flex items-center space-x-2">
        <Link
         href={login()}
         className="inline-block rounded-lg border border-neutral-600 px-5 py-1.5 text-sm leading-normal text-neutral-300 hover:bg-destructive"
        >
         Login
        </Link>
        <Link
         href={register()}
         className="inline-block rounded-lg border border-neutral-600 px-5 py-1.5 text-sm leading-normal text-neutral-300 hover:bg-destructive"
        >
         Register
        </Link>
       </div>
      )}
     </div>
    </div>
   </div>
   {breadcrumbs.length > 1 && (
    <div className="flex w-full border-b border-sidebar-border/70">
     <div className="mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
     </div>
    </div>
   )}
  </>
 );
}
