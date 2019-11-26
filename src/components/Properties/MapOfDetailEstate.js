import React, { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

class MapOfDetailEstate extends Component {
  onInfoWindowClose = event => {};

  render() {
    const { info } = this.props;
    // console.log(info);
    const MapWithAMarker = withScriptjs(
      withGoogleMap(props => (
        <GoogleMap defaultZoom={16} center={{ lat: props.info.lat, lng: props.info.long }}>
          <Marker position={{ lat: props.info.lat, lng: props.info.long }}>
            <InfoWindow
              onClose={this.onInfoWindowClose}
              position={{ lat: props.info.lat + 0.001, lng: props.info.long }}
            >
              <span style={{ padding: 0, margin: 0 }}>{props.info.address}</span>
            </InfoWindow>
          </Marker>
        </GoogleMap>
      ))
    );
    
    return (
      <div>
        <MapWithAMarker
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDMGZh29uhd_DzkeA3foMl1iMD-Jh6bOWE&v=3.exp&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `60vh`, width: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          info={info}
        />
      </div>
    );
  }
}

export default MapOfDetailEstate;
