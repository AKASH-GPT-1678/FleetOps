interface MapProps {
  first: string;
  second: string;
}

async function initMap(): Promise<void> {
  // Load marker library
  //@ts-ignore
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

  // Create the map
  //@ts-ignore
  const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    zoom: 6,
    center: { lat: 23.2599, lng: 77.4126 }, // Central India for better view,
    mapId: "8acf14138eca2cd1325a646d"
  });

  // Custom image marker
  // const beachFlagImg = document.createElement('img');
  // beachFlagImg.src = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
  // beachFlagImg.style.width = '40px';
  // beachFlagImg.style.height = '40px';
 

  //@ts-ignore
  // new google.maps.Marker({
  //   map,
  //   position: { lat: 22.7196, lng: 75.8577 },
  //   title : "Jaisalmer",
  // })

  const markerMap = new google.maps.Marker({
    position :{ lat: 22.7196, lng: 75.8577 },
    map:map,
    title : "Jaisalmer",
  });

const beachFlagImg = document.createElement('img');
beachFlagImg.src = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';

const beachFlagMarkerView = new AdvancedMarkerElement({
    map : map,
    position: { lat: 28.6139, lng: 77.2090 },
    content: beachFlagImg,
    title: 'A marker using a custom PNG Image',
});




  //@ts-ignore
  const directionsService = new google.maps.DirectionsService();
  //@ts-ignore
  const directionsRenderer = new google.maps.DirectionsRenderer();

  directionsRenderer.setMap(map);

  directionsService.route(
    {
      origin: "Ahemdabad, Gujrat",
      destination: "Himmatgarh Palace Jaisalmer",
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
export {};
