import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow, Circle } from "react-google-maps";
import EstateMarker from "./EstateMarker";
// import { connect } from 'react-redux';
import placeholder from '../../marker/placeholder.png'

const EstatesMap = withScriptjs(withGoogleMap((props) => {

  const markers = props.estates.map(estate => <EstateMarker
    key={estate._id}
    uid={estate._id}
    estate={estate}
    location={{ lat: estate.lat, lng: estate.long }}
    activeMarker={estate._id === props.activeMarker ? true : false}
    closeMarkers={props.closeOtherMarkers}

  />);
  const onInfoWindowClose = (event) => {

  };

  // const getEstates = (e) => {
  //   let center = getCenter();
  //   console.log(center);
  // }
  return (
    <GoogleMap
      ref={props.onMapMounted}
      // defaultZoom={13}
      zoom={14}
      center={{ lat: props.center.lat, lng: props.center.lng }}
      // onCenterChanged={props.handleMapChanged}
      onDragEnd={props.handleMapChanged}
    // onBoundsChanged={props.handleMapFullyLoaded}
      // onZoomChanged={props.onZoomChanged}
    >
      <Circle
        center={{ lat: props.center.lat, lng: props.center.lng }}
        radius={props.radius * 1000}
        options={{ fillColor: "rgb(139, 139, 145)", fillOpacity: 0.3, strokeOpacity: 0.2 }}
      >
      </Circle>
      {markers}
      {props.isMarkerCurrentLocationShown && <Marker
        icon={placeholder}
        position={{ lat: props.currentLocation.lat, lng: props.currentLocation.lng }}
      >
        <InfoWindow
          onClose={onInfoWindowClose}
          position={{ lat: (props.currentLocation.lat), lng: props.currentLocation.lng }}
        // onCloseClick
        >
          <div>
            <span style={{ padding: 0, margin: 0 }}>Bạn đang ở đây</span>
          </div>
        </InfoWindow>
      </Marker>}
      {props.isMarkerCenterShown && <Marker
          position={{ lat: props.center.lat, lng: props.center.lng }}
        ></Marker>}
    </GoogleMap>
  );
}
))


// const mapStateToProp = (state) => {
//   return {
//     estates: state.estates
//   }
// }
// export default connect(mapStateToProp, null)(EstatesMap);
export default EstatesMap;

