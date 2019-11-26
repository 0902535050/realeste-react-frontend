import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Geocode from 'react-geocode'
// const Geocode = require('react-geocode')
// import Autocomplete from 'react-google-autocomplete';
// import Searching from '../../pages/Map/Searching'
import SearchBox from '../../pages/Map/SearchBox'
import * as actions from '../../actions/index'
import { connect } from 'react-redux'
import { message } from 'antd';
Geocode.setApiKey("AIzaSyB9iQfFH9AdPXjCfzV-qwRZMA-l2VoJlRo");
Geocode.enableDebug();

class MapSearching extends Component {

	constructor(props) {
		super(props);
		this.state = {
			address: '',
			city: '',
			area: '',
			state: '',
			unknownAddress: '',
			mapPosition: {
				lat: this.props.center.lat,
				lng: this.props.center.lng
			},
			markerPosition: {
				lat: this.props.center.lat,
				lng: this.props.center.lng
			}
		}
	}
	/**
	 * Get the current address from the default map position and set those values in the state
	 */
	componentDidMount() {
		Geocode.fromLatLng(this.state.mapPosition.lat, this.state.mapPosition.lng).then(
			response => {
				const address = response.results[0].formatted_address,
					addressArray = response.results[0].address_components
				// city = this.getCity(addressArray),
				// area = this.getArea(addressArray),
				// state = this.getState(addressArray);

				// console.log('city', this.state.markerPosition, addressArray, address);
				localStorage.setItem('defaultAddress', address)
				this.setState({
					address: (address) ? address : '',
					// area: (area) ? area : '',
					// city: (city) ? city : '',
					// state: (state) ? state : '',
				})
			},
			error => {
				// console.error(error);
			}
		);
	};
	/**
	 * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
	 *
	 * @param nextProps
	 * @param nextState
	 * @return {boolean}
	 */
	// shouldComponentUpdate(nextProps, nextState) {
	// 	if (
	// 		this.state.markerPosition.lat !== this.props.center.lat ||
	// 		this.state.address !== nextState.address ||
	// 		this.state.city !== nextState.city ||
	// 		this.state.area !== nextState.area ||
	// 		this.state.state !== nextState.state
	// 	) {
	// 		return true
	// 	} else if (this.props.center.lat === nextProps.center.lat) {
	// 		return false
	// 	}
	// }
	getSnapshotBeforeUpdate(prevProps, prevState) {
		if (prevState.markerPosition.lat !== this.state.markerPosition.lat) {
			return this.state.markerPosition;
		}
		else return null

	}
	componentDidUpdate(prevProps, prevState, snapshot) {
		if (snapshot) {
			var unknownAddress = ''
			let { address, markerPosition } = this.state;
			document.getElementById('address').value ? unknownAddress = document.getElementById('address').value : unknownAddress = ''
			const location = {
				// province: city,
				unknownAddress: unknownAddress,
				addressDetail: address,
				markerPosition: markerPosition
			}
			this.props.onSaveLocationInfo(location)
			// console.log(location)

			// this.props.actFetchEstatesRequest(info);
		}
	}
	/**
	 * Get the city and set the city input value to the one selected
	 *
	 * @param addressArray
	 * @return {string}
	 */
	getCity = (addressArray) => {
		let city = '';
		for (let i = 0; i < addressArray.length; i++) {
			if (addressArray[i].types[0] && 'administrative_area_level_1' === addressArray[i].types[0]) {
				city = addressArray[i].long_name;
				return city;
			}
		}
	};
	/**
	 * Get the area and set the area input value to the one selected
	 *
	 * @param addressArray
	 * @return {string}
	 */
	getArea = (addressArray) => {
		let area = '';
		for (let i = 0; i < addressArray.length; i++) {
			if (addressArray[i].types[0]) {
				for (let j = 0; j < addressArray[i].types.length; j++) {
					if ('sublocality_level_1' === addressArray[i].types[j] || 'locality' === addressArray[i].types[j]) {
						area = addressArray[i].long_name;
						return area;
					}
				}
			}
		}
	};
	/**
	 * Get the address and set the address input value to the one selected
	 *
	 * @param addressArray
	 * @return {string}
	 */
	getState = (addressArray) => {
		let state = '';
		for (let i = 0; i < addressArray.length; i++) {
			for (let i = 0; i < addressArray.length; i++) {
				if (addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
					state = addressArray[i].long_name;
					return state;
				}
			}
		}
	};
	/**
	 * And function for city,state and address input
	 * @param event
	 */
	onChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};
	/**
	 * This Event triggers when the marker window is closed
	 *
	 * @param event
	 */
	onInfoWindowClose = (event) => {

	};

	/**
	 * When the marker is dragged you get the lat and long using the functions available from event object.
	 * Use geocode to get the address, city, area and state from the lat and lng positions.
	 * And then set those values in the state.
	 *
	 * @param event
	 */
	onMarkerDragEnd = (event) => {
		let newLat = event.latLng.lat(),
			newLng = event.latLng.lng();

		console.log(newLat, newLng)
		Geocode.fromLatLng(newLat, newLng).then(
			response => {
				// console.log(response)
				const address = response.results[0].formatted_address
				// unknownAddress = response.results[0].formatted_address,
				// addressArray = response.results[0].address_components
				// city = this.getCity(addressArray),
				// area = this.getArea(addressArray),
				// state = this.getState(addressArray);
				this.setState({
					address: (address) ? address : '',
					// unknownAddress: (unknownAddress) ? unknownAddress : '',
					// area: (area) ? area : '',
					// city: (city) ? city : '',
					// state: (state) ? state : '',
					markerPosition: {
						lat: newLat,
						lng: newLng
					},
				})
			},
			error => {
				// console.error(error);
				// console.log('error');
			}
		);
	};
	/**
	 * When the user types an address in the search box
	 * @param place
	 */
	onPlaceSelected = (place) => {
		// console.log('plc', place[0]);
		if (place[0] === undefined || place[0] === null) {
			this.setState({ unknownAddress: '' })
			message.warning('Không thể tìm chính xác vị trí của bạn! Bạn có thể xác định lại vị trí của mình thủ công trên bản đồ!')
			// return (
			// 	< Alert
			// 		message="Warning"
			// 		description='Không thể tìm chính xác vị trí của bạn! Bạn có thể xác định lại vị trí của mình thủ công trên bản đồ!'
			// 		type="warning"
			// 		showIcon
			// 	/>
			// )
		}
		else if (place[0].formatted_address) {
			const address = place[0].formatted_address,
				// addressArray = place[0].address_components,
				unknownAddress = place[0].formatted_address,
				// city = this.getCity(addressArray),
				// area = this.getArea(addressArray),
				// state = this.getState(addressArray),
				latValue = place[0].geometry.location.lat(),
				lngValue = place[0].geometry.location.lng();
			// Set these values in the state.
			this.setState({
				address: (address) ? address : '',
				unknownAddress: (unknownAddress) ? unknownAddress : '',
				// area: (area) ? area : '',
				// city: (city) ? city : '',
				// state: (state) ? state : '',
				markerPosition: {
					lat: latValue,
					lng: lngValue
				},
				mapPosition: {
					lat: latValue,
					lng: lngValue
				},
			})
		}

	};


	render() {
		const AsyncMap = withScriptjs(
			withGoogleMap(
				props => (
					<GoogleMap google={this.props.google}
						defaultZoom={this.props.zoom}
						defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
					>
						{/* InfoWindow on top of marker */}
						<InfoWindow
							onClose={this.onInfoWindowClose}
							position={{ lat: (this.state.markerPosition.lat + 0.0018), lng: this.state.markerPosition.lng }}
						>
							<div>
								<span style={{ padding: 0, margin: 0 }}>{this.state.address}</span>
							</div>
						</InfoWindow>
						{/*Marker*/}
						<Marker google={this.props.google}
							name={'current postion'}
							draggable={true}
							onDragEnd={this.onMarkerDragEnd}
							// onDragend={(t, map, coord) => this.onMarkerDragEnd2(coord, index)}
							position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
						/>
						<Marker />

						{/* For Auto complete Search Box */}
						{/* <Searching
							style={{
								width: '100%',
								height: '40px',
								paddingLeft: '16px',
								marginTop: '2px',
								marginBottom: '100px',
								paddingTop: '20px'
							}}

							onPlaceChanged={this.onPlaceSelected}

						/> */}

						<SearchBox
							onPlaceChanged={this.onPlaceSelected}
						/>


					</GoogleMap>
				)
			)
		);
		let map;
		if (this.props.center.lat !== undefined) {
			map = <div>
				<div className="main-title-2">
					<h1>
						<span>Vị trí </span>
					</h1>
				</div>
				<div className="row mb-30 ">
					<div className="col-md-12 col-sm-12">
						<div className="form-group">
							<label>Địa chỉ chi tiết</label>
							<input
								type="text"
								className="form-control"
								name="address"
								id="address"
								placeholder="Address"
								onChange={this.onChange}
								readOnly="readOnly"
								value={this.state.unknownAddress}
							/>
						</div>
					</div>
					{/* <div className="col-md-6 col-sm-6">
						<div className="form-group">
							<label>Tỉnh/Thành phố</label>
							<input
								type="text"
								className="form-control"
								name="city"
								placeholder="City"
								onChange={this.onChange}
								readOnly="readOnly"
								value={this.state.city}
							/>
						</div>
					</div>
					<div className="col-md-6 col-sm-6">
						<div className="form-group">
							<label>Khu vực</label>
							<input
								type="text"
								className="form-control"
								name="area"
								placeholder="Area"
								onChange={this.onChange}
								readOnly="readOnly"
								value={this.state.area}
							/>
						</div>
					</div>
					<div className="col-md-6 col-sm-6">
						<div className="form-group">
							<label>Quận/Huyện</label>
							<input
								type="text"
								className="form-control"
								name="state"
								placeholder="State"
								onChange={this.onChange}
								readOnly="readOnly"
								value={this.state.state}
							/>
						</div>
					</div> */}
				</div>
				<AsyncMap
					googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDMGZh29uhd_DzkeA3foMl1iMD-Jh6bOWE&v=3.exp&libraries=places"
					loadingElement={
						<div style={{ height: `100%` }} />
					}
					containerElement={
						<div style={{ height: this.props.height }} />
					}
					mapElement={
						<div style={{ height: `100%` }} />
					}
				/>
			</div>
		} else {
			map = <div style={{ height: this.props.height }} />
		}
		return (map)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSaveLocationInfo: (location) => dispatch(actions.actSaveLocationInfo(location))
	}
}
export default connect(null, mapDispatchToProps)(MapSearching)