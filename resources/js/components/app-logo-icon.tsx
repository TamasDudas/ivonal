import logo from '@/assets/logo.png';
import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
 return (
  <div>
   <img src={logo} alt="App Logo" className="w-28" />
  </div>
 );
}
