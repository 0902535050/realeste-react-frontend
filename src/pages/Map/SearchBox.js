/* global google */
import React, { Component } from 'react'
import { Tooltip } from 'antd'

export default class Searching extends Component {
  constructor(props) {
    super(props);
    this.searchInput = React.createRef();
    this.onPlaceChanged = this.onPlaceChanged.bind(this)
  }

  componentDidMount() {
    this.searchBox = new google.maps.places.SearchBox(this.searchInput.current)
    this.searchBox.addListener('places_changed', this.onPlaceChanged)
  }

  onPlaceChanged() {
    const place = this.searchBox.getPlaces()
    this.props.onPlaceChanged(place);
  }

  render() {
    return (
      <Tooltip title="Nhập địa chỉ và chọn một trong các gợi ý bên dưới!" style={{float: "left", width: "500px"}}>
        <input
          ref={this.searchInput}
          id="searchbox"
          placeholder="Nhập địa chỉ chi tiết ở đây..."
          type="text"
          style={{ width: '100%', height: '34px', border: '1px solid white', fontSize: '12px', boxShadow: "0 2px 2px rgba(0,0,0,0.10), 0 2px 2px rgba(0,0,0,0.1)" }}
        />
      </Tooltip>
    );
  }
}
