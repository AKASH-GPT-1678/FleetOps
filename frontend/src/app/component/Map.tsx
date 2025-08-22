
import { useEffect, useRef } from 'react';
import "./PolyLine"


interface MapProps {
  first: string;
  second: string;
  deliveryId: string
}

export default function Map({ first, second , deliveryId }: MapProps) {
  console.log(first, second);


  const mapRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   if (typeof window === 'undefined' || !mapRef.current) return;

  //   const existingScript = document.getElementById('googleMaps') as HTMLScriptElement | null;

  //   if (!existingScript) {
  //     const script = document.createElement('script');
  //     script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB2Udz_tWc458SLZ5M_l_ZfIXSw9u9W2iA&callback=initMap&libraries=marker`;
  //     script.id = 'googleMaps';
  //     script.async = true;
  //     script.defer = true;
  //     document.body.appendChild(script);
  //   } else {
  //     // If script already exists and Google Maps is loaded
  //     //@ts-ignore
  //     if (window.google && window.google.maps && typeof window.initMap === "function") {
  //       window.initMap(first, second);
  //     }
  //   }
  // }, []);


  useEffect(() => {
  if (typeof window === 'undefined' || !mapRef.current) return;

  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB2Udz_tWc458SLZ5M_l_ZfIXSw9u9W2iA&libraries=marker`;
  script.async = true;
  script.defer = true;

  script.onload = () => {
    // Call initMap manually with arguments
    window.initMap(first, second , deliveryId);
  };

  document.body.appendChild(script);
}, [first, second]);

  return (
    <div
      id="map"
      ref={mapRef}
      className='w-screen h-screen '
    />
  );
}
