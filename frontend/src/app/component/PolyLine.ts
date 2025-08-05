import axios from "axios";

interface MapProps {
  first: string;
  second: string;
  deliveryId: string;
}


async function initMap(first: string, second: string , deliveryId: string): Promise<void> {
  console.log("i am init map", first, second);





  const response = await axios.get(`/api/location?deliveryId=${encodeURIComponent(deliveryId)}`);
  console.log(response.data);
   const lat = response.data.location.lat;
   const lan = response.data.location.lng;
  // //https://phonepe-clone.onrender.com/api/location
  // console.log(response.data); // The actual data

  //@ts-ignore
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.marker.AdvancedMarkerElement;

  // Create the map
  //@ts-ignore
  const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    zoom: 6,
    center: { lat: 23.2599, lng: 77.4126 }, // Central India for better view,
    mapId: "8acf14138eca2cd1325a646d"
  });


  //@ts-ignore
  const markerMap = new google.maps.Marker({
    position: { lat: 22.71957, lng: 75.85773 },
    map: map,
    title: "Jaisalmer",

  });

  const beachFlagImg = document.createElement('img');
  beachFlagImg.src = 'https://res.cloudinary.com/dffepahvl/image/upload/v1750972429/zy9za9w2aa1zqmpxm4cw.png';

  const beachFlagMarkerView = new AdvancedMarkerElement({
    map: map,
    position: { lat: parseFloat(lat), lng: parseFloat(lan) }, // { lat: 22.71957, lng: 75.85773 },
    content: beachFlagImg,
    title: 'A marker using a custom PNG Image',
  });




  //@ts-ignore
  const directionsService = new google.maps.DirectionsService();
  //@ts-ignore
  const directionsRenderer = new google.maps.DirectionsRenderer();

  directionsRenderer.setMap(map);

  await directionsService.route(
    {
      origin: first,
      destination: second,
      //@ts-ignore
      travelMode: google.maps.TravelMode.DRIVING,
    },
    //@ts-ignore
    (response, status) => {
      if (status === "OK") {
        directionsRenderer.setDirections(response);
      } else {
        console.error("Directions request failed due to " + status);
      }
    }
  );
}

declare global {
  interface Window {
    initMap: typeof initMap;
  }
}

if (typeof window !== "undefined") {
  window.initMap = initMap;
}
export { };
