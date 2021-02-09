import React from "react";
import GoogleMapReact from "google-map-react";
import { useSelector } from "react-redux";
import { ReactComponent as SvgPin } from "../../images/pin.svg";
const AnyReactComponent = () => (
  <div
    style={{
      // initially any map object has left top corner at lat lng coordinates
      // it's on you to set object origin to 0,0 coordinates
      position: "absolute",
      width: 40,
      height: 40,
      left: -40 / 2,
      top: -40 / 2,
      backgroundColor: "transparent",
    }}
  >
    <SvgPin />
  </div>
);

export default () => {
  let { latLng, zoom } = useSelector((state) => ({
    ...state.addressReducer,
  }));

  return (
    <div style={{ height: "50vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCSF2H74rDi12xbclgcwUy4dYcY2Z7qQFg" }}
        defaultCenter={latLng.origin}
        defaultZoom={zoom}
        yesIWantToUseGoogleMapApiInternals
      >
        <AnyReactComponent
          lat={latLng.origin.lat}
          lng={latLng.origin.lng}
          text="A"
        />
        {latLng.destination && (
          <AnyReactComponent
            lat={latLng.destination.lat}
            lng={latLng.destination.lng}
            text="B"
          />
        )}
      </GoogleMapReact>
    </div>
  );
};
