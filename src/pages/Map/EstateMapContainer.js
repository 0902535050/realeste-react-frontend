/* eslint-disable */
/* global google */
import React, { Component } from 'react';
import EstatesMap from '../../components/Map/EstatesMap'
import { connect } from 'react-redux';
import * as actions from '../../actions/request';
import { } from 'react-google-maps'
import Searching from './Searching'
import { message } from 'antd'

const optionStyle = {
    fontSize: '12px'
}

const Deal = [
    { value: '1', label: 'Bất động sản bán' },
    { value: '3', label: 'Bất động sản cho thuê' }];
const Types = [
    { value: '0', label: 'Loại bất động sản' },
    { value: '1', label: 'Căn hộ/Chung cư' },
    { value: '2', label: 'Nhà ở' },
    { value: '3', label: 'Đất' },
    { value: '4', label: 'Văn phòng/mặt bằng kinh doanh' }
];
const Area = [
    { value: '0', label: 'Diện tích' },
    { value: '30-50', label: '30 - 50 m2' },
    { value: '50-70', label: '50 - 70 m2' },
    { value: '70-110', label: '70 - 110 m2' },
    { value: '150-200', label: '150 - 200 m2' },
    { value: '200-250', label: '200 - 250 m2' },
    { value: '250-300', label: '250 - 300 m2' },
    { value: '300-500', label: '300 - 500 m2' },
    { value: '500-10000', label: '> 500 m2' },

];
const Price = {
    1: [
        { value: '0', label: 'Chọn giá' },
        { value: '1-500', label: '< 500 triệu' },
        { value: '500-1000', label: '500 triệu - 1 tỷ' },
        { value: '1000-4000', label: '1 - 2 tỷ' },
        { value: '2000-3000', label: '2 - 3 tỷ' },
        { value: '3000-5000', label: '3 - 5 tỷ' },
        { value: '5000-7000', label: '5 - 7 tỷ' },
        { value: '7000-10000', label: '7 - 10 tỷ' },
        { value: '10000-20000', label: '10 - 20 tỷ' },
        { value: '20000-30000', label: '20 - 30 tỷ' },
        { value: '30000-999999', label: '>30 tỷ' }

    ],
    3: [
        { value: '0', label: 'Chọn giá' },
        { value: '1-3', label: '< 3 triệu/tháng' },
        { value: '3-5', label: '3-5 triệu' },
        { value: '5-10', label: '5-10 triệu' },
        { value: '10-20', label: '10-20 triệu' },
        { value: '20-50', label: '20-50 triệu' },
        { value: '50-1000', label: '>50 triệu' }
    ],
};
const Radius = [
    { value: '2', label: 'Bán kính 2km' },
    { value: '3', label: 'Bán kính 3km' },
    { value: '5', label: 'Bán kính 5km' },
    { value: '10', label: 'Bán kính 10km' },
];

class EstateMapContainer extends Component {
    constructor(props) {
        super(props);

        this.xMapBounds = { min: null, max: null }
        this.yMapBounds = { min: null, max: null }
        this.mapFullyLoaded = false
        this.state = {
            Estates: this.props.estates,
            type: Types[0].value,
            deal: Deal[0].value,
            price: Price[Deal[0].value][0].value,
            prices: Price[Deal[0].value],
            area: Area[0].value,
            activeMarker: null,
            radius: Radius[2].value,

            currentLatLng: {
                lat: 10.792502,
                lng: 106.6137603
            },
            center: {
                lat: 10.792502,
                lng: 106.6137603
            },
            searchLatLng: {
                lat: 10.792502,
                lng: 106.6137603
            },
            zoomChange: 13,
            isMarkerCurrentLocationShown: false,
            isMarkerCenterShown: false,
            place: {},
        }

    }
    handleProvinceChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        const result = Deal.find(deal => deal.value === value);
        this.setState({
            [name]: value,
            prices: Price[result.value],
            price: Price[result.value][0].value,
        });

    }
    handleOnChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value,
        });
    }
    componentDidMount() {
        // console.log(" ----- Did mount");
        var info = {
            radius: this.state.radius,
            lat: this.state.currentLatLng.lat.toString(),
            long: this.state.currentLatLng.lng.toString(),
        };
        // console.log(info);
        // console.log(this.state.center)
        // this.props.actFetchEstatesRequest(info); 
        this.showCurrentLocation();
        // console.log(" ----- End Did mount");
    }

    handleChangeState = (selectedOption) => {
        this.setState({ selectedOption });
    }

    showCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    this.setState({
                        currentLatLng: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        },
                        center: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        },
                        searchLatLng: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        },
                        isMarkerCurrentLocationShown: true,
                        isMarkerCenterShown: false,

                    });
                    // console.log("get current location");
                    // console.log(this.state.currentLatLng);
                    // console.log("----center");
                    // console.log(this.state.center);
                    var info = {
                        radius: this.state.radius,
                        lat: this.state.currentLatLng.lat.toString(),
                        long: this.state.currentLatLng.lng.toString(),
                        statusProject: this.state.deal,
                        type: this.state.type,
                        area: this.state.area,
                        price: this.state.price,
                    };
                    this.props.actSearchMapRequest(info);
                    // console.log(" ----- End getCurrent location");
                }
            )

        } else {
            console.log('error')
        }
    }

    closeOtherMarkers = (uid) => {
        this.setState({ activeMarker: uid })
    }
    handleMapChanged = () => {
        // this.getMapBounds()
        this.setMapCenterPoint()
        var info = {
            radius: this.state.radius,
            lat: this.state.center.lat.toString(),
            long: this.state.center.lng.toString(),
            statusProject: this.state.deal,
            type: this.state.type,
            area: this.state.area,
            price: this.state.price,
        };
        // console.log("map");
        // console.log(this.state.center);
        this.props.actSearchMapRequest(info)
    }

    handleMapMounted = (map) => {
        this.map = map;
        // let estates = this.state.Estates;
        // let center = this.state.center;
        // console.log("Zoom to markers");
        // const bounds = new window.google.maps.LatLngBounds();
        // if(estates.length >0){
        //     estates.forEach(estate => {
        //         bounds.extend(new window.google.maps.LatLng(estate.props.lat, estate.props.long))
        //     });
        // }
        // else{
        //     bounds.extend(new window.google.maps.LatLng(center.lat, center.lng))
        // }
        // console.log(bounds);
        // this.map.fitBounds(bounds);

    }

    handleMapFullyLoaded = () => {
        if (this.mapFullyLoaded)
            return
        this.mapFullyLoaded = true
        this.handleMapChanged()
    }

    setMapCenterPoint = () => {
        this.setState({
            center: {
                lat: this.map.getCenter().lat(),
                lng: this.map.getCenter().lng()
            },
            searchLatLng: {
                lat: this.map.getCenter().lat(),
                lng: this.map.getCenter().lng()
            },
            isMarkerCenterShown: true,
            // isMarkerCurrentLocationShown: false
        })
    }

    onPlaceSelected = (place) => {
        // console.log('plc', place);
        if (place.geometry === undefined) {
            return message.error('Không thể tìm thấy địa chỉ vừa nhập!')
        }
        else if (place.geometry !== undefined) {
            const latValue = place.geometry.location.lat(),
                lngValue = place.geometry.location.lng();
            // Set these values in the state.
            this.setState({
                searchLatLng: {
                    lat: latValue,
                    lng: lngValue
                },

            })
        }

    };
    onSearchMap = () => {
        this.setState({
            center: {
                lat: this.state.searchLatLng.lat,
                lng: this.state.searchLatLng.lng
            },
            isMarkerCenterShown: true
        });
        let info = {
            lat: this.state.searchLatLng.lat,
            long: this.state.searchLatLng.lng,
            radius: this.state.radius,
            statusProject: this.state.deal,
            type: this.state.type,
            area: this.state.area,
            price: this.state.price,
        }
        this.props.actSearchMapRequest(info);
        // console.log(info);
    }
    render() {
        let { currentLatLng, type, deal, prices, price, area, radius } = this.state;
        const { estates } = this.props;
        // console.log(" ----- render")
        // console.log(estates);
        // console.log(this.state.isMarkerCurrentLocationShown);
        // console.log(" ----- End render")
        // console.log(type);
        // console.log(price);
        // console.log(this.state.center);

        return (
            <div>
                <div className="properties-map-search" style={{ backgroundColor: '#f4f4f2' }}>
                    <div className="properties-map-search-content" style={{ paddingTop: '12px' }}>
                        <div className="row">
                            <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12">
                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12" >
                                    <div className="form-group" >
                                        <Searching onPlaceChanged={this.onPlaceSelected} style={optionStyle} />
                                    </div>

                                </div>

                                <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12" >
                                    <div className="form-group" >
                                        <select className="form-control"
                                            name="deal"
                                            value={deal}
                                            onChange={this.handleProvinceChange}
                                            id="sel1"
                                            style={optionStyle}
                                        >
                                            {Deal.map((deal, index) => <option key={index} value={deal.value}>{deal.label}</option>)}

                                        </select>
                                    </div>
                                </div>

                                <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12" >
                                    <div className="form-group" >
                                        <select className="form-control"
                                            name="type"
                                            value={type}
                                            onChange={this.handleOnChange}
                                            id="sel2"
                                            style={optionStyle}
                                        >
                                            {Types.map((type, index) => <option key={index} value={type.value}>{type.label}</option>)}

                                        </select>
                                    </div>
                                </div>

                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                    <div className="form-group" >
                                        <select className="form-control"
                                            name="area"
                                            value={area}
                                            onChange={this.handleOnChange}
                                            id="area"
                                            style={optionStyle} >
                                            {Area.map((area, index) => <option key={index} value={area.value}>{area.label}</option>)}

                                        </select>
                                    </div>
                                </div>

                                <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12" >
                                    <div className="form-group" >
                                        <select className="form-control"
                                            name="price"
                                            value={price}
                                            onChange={this.handleOnChange}
                                            id="sel3"
                                            style={optionStyle} >
                                            {prices.map((price, index) => <option key={index} value={price.value}>{price.label}</option>)}

                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12" >
                                    <div className="form-group" >
                                        <select className="form-control"
                                            name="radius"
                                            value={radius}
                                            onChange={this.handleOnChange}
                                            id="sel4"
                                            style={optionStyle} >
                                            {Radius.map((radius, index) => <option key={index} value={radius.value}>{radius.label}</option>)}

                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="col-lg-2 col-md-2 col-sm-12  col-xs-12"
                                style={{
                                    height: '90px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative'
                                }}>

                                <div>
                                    <button
                                        onClick={this.onSearchMap}
                                        type="button" className="btn btn-primary"
                                        style={{ width: '100px' }}
                                    >
                                        Tìm kiếm
                                    </button>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
                <div>
                    <div style={{ zIndex: '1', position: 'relative' }}>
                        <EstatesMap
                            isMarkerCurrentLocationShown={this.state.isMarkerCurrentLocationShown}
                            center={this.state.center}
                            isMarkerCenterShown={this.state.isMarkerCenterShown}
                            currentLocation={currentLatLng}
                            estates={estates}
                            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDMGZh29uhd_DzkeA3foMl1iMD-Jh6bOWE&v=3.exp&libraries=geometry,drawing,places`}
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `100vh`, width: `100%`, }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                            activeMarker={this.state.activeMarker}
                            closeOtherMarkers={this.closeOtherMarkers}
                            onMapMounted={this.handleMapMounted}
                            handleMapChanged={this.handleMapChanged}
                            radius={radius}
                        // zoom={this.state.zoomChange}
                        // onZoomChange={this.onZoomChange}
                        // handleMapFullyLoaded={this.handleMapFullyLoaded}
                        >
                        </EstatesMap>
                    </div>

                    <div className="button-location"
                        style={{
                            width: '40px',
                            height: '40px',
                            zIndex: '2',
                            position: 'relative',
                            float: "right",
                            margin: '-65px 65px 15px 0',
                            boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
                            borderRadius: '4px',
                            outline: 'none',
                            cursor: 'pointer',
                        }} >
                        <button
                            className="my-location"
                            onClick={this.showCurrentLocation}
                        >
                            <img src="/img/logos/my_location_black_24x24.png" alt="Vị trí của bạn" />
                        </button>
                    </div>

                </div>

            </div>
        );
    }
}
const mapDispathToProp = (dispatch) => {
    return {
        actFetchEstatesRequest: (info) => dispatch(actions.actFetchEstatesRequest(info)),
        actSearchMapRequest: (info) => dispatch(actions.actSearchMapRequest(info)),
    }
}
const mapStateToProp = (state) => {
    return {
        estates: state.estates,
    }
}
export default connect(mapStateToProp, mapDispathToProp)(EstateMapContainer);