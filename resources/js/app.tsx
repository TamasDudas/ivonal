import '../css/app.css';
import { Ziggy } from './ziggy';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from './components/ui/toaster';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
 title: (title) => (title ? `${title} - ${appName}` : appName),
 resolve: (name) =>
  resolvePageComponent(
   `./pages/${name}.tsx`,
   import.meta.glob('./pages/**/*.tsx'),
  ),
 setup({ el, App, props }) {
  // Use dynamic Ziggy from server props, fallback to static for type inference
  const pageProps = props.initialPage.props as Record<string, unknown>;
  (window as Record<string, unknown>).Ziggy = pageProps.ziggy || Ziggy;

  const root = createRoot(el);

  root.render(
   <StrictMode>
    <App {...props} />
    <Toaster />
   </StrictMode>,
  );
 },
 progress: {
  color: '#4B5563',
 },
});
