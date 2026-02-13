import AppLogoIcon from './app-logo-icon';

interface AppLogoProps {
 className?: string;
}

export default function AppLogo({ className }: AppLogoProps) {
 return (
  <>
   <div
    className={`mb-4 flex items-center justify-center rounded-md text-sidebar-primary-foreground shadow-md ${className || ''}`}
   >
    <AppLogoIcon />
   </div>
  </>
 );
}
