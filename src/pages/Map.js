/* eslint-disable */
import React, { Component } from 'react';
import EstatesMap from '../components/Map/EstatesMap'
import axios from 'axios';
import { connect } from 'react-redux';
import * as Types from './../constants/ActionTypes';
import * as actions from '../actions/request';
import InfoEstate from '../components/Map/InfoEstate'
import Select from 'react-select';
import Header from '../components/Header';
import MainHeader from '../components/MainHeader';
const options = [
	{ value: 'chocolate', label: 'Chocolate' },
	{ value: 'strawberry', label: 'Strawberry' },
	{ value: 'vanilla', label: 'Vanilla' },
	{ value: 'chocolate', label: 'Chocolate' },
	{ value: 'strawberry', label: 'Strawberry' },
	{ value: 'vanilla', label: 'Vanilla' },
];
// const options2 =[
// 	{value: 1},
// 	{value: 2},
// 	{value: 3},
// 	{value: 4},
// ];
class Map extends Component {
	constructor() {
		super();
		this.state = {
			radius: '',
			lat: '',
			long: '',
			error: '',
			selectedOption: null,
		};
	}
	handleChangeState = (selectedOption) => {
		this.setState({ selectedOption });
		
	}

	handleChangeStatus = (selectedOption) => {
		this.setState({ selectedOption });
		
	}
	findAround = (e) => {
		e.preventDefault();
		var info = {
			radius: 5,
			lat: '10.792502',
			long: '106.6137603',
		}
		this.props.actFetchEstatesRequest(info);
	}

	render() {
		const { selectedOptionState, selectedOptionStatus } = this.state;
		let estates = this.props.estates;
		let listEstates = null;
		if (estates) {
			listEstates = estates.map((estate, index) => {
				return (
					<InfoEstate
						key={index}
						estate={estate}
					/>
				)
			}
			)
		}
		// console.log(estates);
		// console.log(this.props.estates);
		return (
			<div>
				
				<MainHeader />
				<div className="map-content content-area container-fluid" >
					<div className="col-xs-12 col-sm-12 col-md-5 col-md-push-7 col-lg-6 col-lg-push-6">
						<div className="row">
							<EstatesMap
								isMarkerShown
								estates={this.props.estates}
								googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDMGZh29uhd_DzkeA3foMl1iMD-Jh6bOWE&v=3.exp&libraries=geometry,drawing,places`}
								loadingElement={<div style={{ height: `100%` }} />}
								containerElement={<div style={{ height: `100vh`, width: `100%` }} />}
								mapElement={<div style={{ height: `100%` }} />}
							/>
						</div>
					</div>
					<div className="col-xs-12 col-sm-12 col-md-7 col-md-pull-5 col-lg-6 col-lg-pull-6 map-content-sidebar">
						<div className="title-area">
							<h2 className="pull-left">Search</h2>
							<div className="clearfix" />
						</div>
						<div className="properties-map-search">
							<div className="properties-map-search-content">
								<div className="row">
									<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
										<div className="form-group">
											<input className="form-control search-fields" placeholder="Enter address e.g. street, city" />
										</div>
									</div>
									<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
										<div className="form-group">
											<Select
												placeholder="All Status"
												value={selectedOptionState}
												onChange={this.handleChangeState}
												options={options}
												menuPosition="fixed"
											/>
											<br />
										</div>
									</div>

									<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
										<div className="form-group">
											<Select
												placeholder="All State"
												value={selectedOptionStatus}
												onChange={this.handleChangeStatus}
												options={options}
												menuPosition="fixed"
											/>
										</div>
									</div>
									<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
										<div className="form-group">
											<Select
												placeholder="All Type"
												// value={selectedOption}
												onChange={this.handleChange}
												options={options}
												menuPosition="fixed"
											/>
										</div>
									</div>
									
								</div>
								<div id="options-content" className="collapse">
									<div className="row">
										<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
											<div className="form-group">
												<Select
													placeholder="Bacony"
													// value={selectedOption}
													onChange={this.handleChange}
													options={options}
													menuPosition="fixed"
												/>
											</div>
										</div>
										<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
											<div className="form-group">
												<Select
													placeholder="Garage"
													// value={selectedOption}
													onChange={this.handleChange}
													options={options}
													menuPosition="fixed"
												/>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
											<div className="form-group">
												<Select
													placeholder="Bathrooms"
													// value={selectedOption}
													onChange={this.handleChange}
													options={options}
													menuPosition="fixed"
												/>
											</div>
										</div>
										<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
											<div className="form-group">
												<Select
													placeholder="Bedrooms"
													// value={selectedOption}
													onChange={this.handleChange}
													options={options}
													menuPosition="fixed"
												/>
											</div>
										</div>
									</div>
									
								</div>
							</div>

							<div className="map-content-separater" />
							<div className="clearfix" />
							<div className="title-area">
								<h2 className="pull-left">Properties</h2>
								<br />
								<div className="clearfix" />
							</div>
							<div className="fetching-properties">
								{listEstates}
							</div>
						</div>
					</div>
					<div className="form-group">
						<button
							onClick={this.findAround}
							type="submit"
							className="button-md button-theme btn-block"
						>
							Current Location
                    </button>
					</div>
				</div>
			</div>
		);
	}
}
const mapDispathToProp = (dispatch) => {
	return {
		actFetchEstatesRequest: (info) => dispatch(actions.actFetchEstatesRequest(info))
	}
}
const mapStateToProp = (state) => {
	return {
		estates: state.estates
	}
}
export default connect(mapStateToProp, mapDispathToProp)(Map);