import {
 GoogleMap as GoogleMapComponent,
 Marker,
 useLoadScript,
} from '@react-google-maps/api';

interface Props {
 latitude: number;
 longitude: number;
 zoom?: number;
 height?: string;
}

const containerStyle = {
 width: '100%',
 borderRadius: '0.5rem',
 border: '1px solid #e5e7eb',
};

function LoadingComponent() {
 return (
  <div className="flex h-96 items-center justify-center">
   Térkép betöltése...
  </div>
 );
}

function ErrorComponent() {
 return (
  <div className="flex h-96 items-center justify-center text-red-500">
   Hiba történt a térkép betöltésekor
  </div>
 );
}

export default function Map({
 latitude,
 longitude,
 zoom = 15,
 height = '400px',
}: Props) {
 const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

 const { isLoaded, loadError } = useLoadScript({
  googleMapsApiKey: apiKey || '',
  libraries: ['places'],
 });

 if (!apiKey) {
  return (
   <div className="flex h-96 items-center justify-center text-yellow-600">
    Google Maps API kulcs nincs beállítva
   </div>
  );
 }

 if (loadError) {
  return <ErrorComponent />;
 }

 if (!isLoaded) {
  return <LoadingComponent />;
 }

 const center = {
  lat: latitude,
  lng: longitude,
 };

 return (
  <div style={{ height, ...containerStyle }}>
   <GoogleMapComponent
    mapContainerStyle={{ height: '100%', width: '100%' }}
    center={center}
    zoom={zoom}
    options={{
     mapTypeControl: false,
     streetViewControl: false,
     fullscreenControl: true,
     zoomControl: true,
    }}
   >
    <Marker position={center} title="Ingatlan helye" />
   </GoogleMapComponent>
  </div>
 );
}
