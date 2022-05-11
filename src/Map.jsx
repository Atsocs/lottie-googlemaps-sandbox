import { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { Box } from "@chakra-ui/react";
import { loaderOptions, SaoPauloLatLng } from "./constants";

import * as turf from "@turf/turf";

import Lottie from "react-lottie";
import animationData from "./94025-rotating-sphere.json";

const myGeoJson = turf.circle([SaoPauloLatLng.lng, SaoPauloLatLng.lat], 100, {
  units: "meters",
});

export function MyLottie({ size = 400 }) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Box transform={`translate(-${size / 2}px, -50%)`}>
      <Lottie options={defaultOptions} height={size} width={size} />
    </Box>
  );
}

export default function Map({ prevStep, center }) {
  const [map, setMap] = useState(null);
  const [maps, setMaps] = useState(null);
  const [zoom, setZoom] = useState(null);

  useEffect(() => {
    if (!map || !maps) return;

    if (!myGeoJson) return;
    const [west, south, east, north] = turf.bbox(myGeoJson);
    const imageBounds = { north, south, east, west };

    const imageUrl = "https://via.placeholder.com/400x400";
    const imageOverlay = new maps.GroundOverlay(imageUrl, imageBounds, {
      clickable: false,
      opacity: 0.6,
    });
    imageOverlay.setMap(map);
    map.fitBounds(imageBounds);

    return () => imageOverlay.setMap(null);
  }, [map, maps]);

  const onGoogleApiLoaded = (map, maps) => {
    setMap(map);
    setMaps(maps);
  };

  return (
    <GoogleMapReact
      defaultZoom={14}
      defaultCenter={SaoPauloLatLng}
      center={center}
      bootstrapURLKeys={loaderOptions}
      options={{
        mapTypeId: "hybrid",
        disableDefaultUI: true,
        rotateControl: false,
        tilt: 0,
      }}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({ map, maps }) => onGoogleApiLoaded(map, maps)}
      onChange={({ zoom }) => {
        setZoom(zoom);
      }}
    >
      <MyLottie latLng={SaoPauloLatLng} size={0.00276 * Math.pow(2, zoom)} />
    </GoogleMapReact>
  );
}
