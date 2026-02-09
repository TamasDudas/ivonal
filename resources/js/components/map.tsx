import {
 AdvancedMarker,
 APIProvider,
 Map as GoogleMapComponent,
} from '@vis.gl/react-google-maps';

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

export default function Map({
 latitude,
 longitude,
 zoom = 15,
 height = '400px',
}: Props) {
 const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
 const mapId = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID;

 if (!apiKey) {
  return (
   <div className="flex h-96 items-center justify-center text-yellow-600">
    Google Maps API kulcs nincs beállítva
   </div>
  );
 }

 const center = {
  lat: latitude,
  lng: longitude,
 };

 return (
  <div style={{ height, ...containerStyle }}>
   <APIProvider apiKey={apiKey}>
    <GoogleMapComponent
     style={{ height: '100%', width: '100%' }}
     defaultCenter={center}
     defaultZoom={zoom}
     mapId={mapId}
     disableDefaultUI={false}
     mapTypeControl={false}
     streetViewControl={false}
     fullscreenControl={true}
     zoomControl={true}
    >
     <AdvancedMarker position={center} title="Ingatlan helye" />
    </GoogleMapComponent>
   </APIProvider>
  </div>
 );
}
