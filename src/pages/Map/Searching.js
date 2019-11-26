/* global google */
import React, { Component } from 'react'

export default class Searching extends Component {
    constructor(props) {
        super(props);
        this.autocompleteInput = React.createRef();
        this.autocomplete = null;
        this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
      }
    
      componentDidMount() {
        this.autocomplete = new google.maps.places.Autocomplete(
          this.autocompleteInput.current,
          // { types: ["geocode"] }
          // { types: ["address"] }
        )
        this.autocomplete.addListener("place_changed", this.handlePlaceChanged);
      }
    
      handlePlaceChanged() {
        const place = this.autocomplete.getPlace();
        this.props.onPlaceChanged(place);
      }
    
      render() {
        return (
          <input
            ref={this.autocompleteInput}
            id="autocomplete"
            placeholder="Nhập địa chỉ chi tiết ở đây..."
            type="text"
            style={{width: '100%', height: '34px', border: '1px solid #D0D3D4', fontSize:'12px', boxShadow: "0 2px 2px rgba(0,0,0,0.10), 0 2px 2px rgba(0,0,0,0.1)", borderRadius: "5px", paddingLeft: "8px"}}
          />
        );
      }
}
 