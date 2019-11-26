/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React, { Component } from 'react';
import Footer from '../components/Footer';
import MainHeader from '../components/MainHeader';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions/request';
// import { Select } from 'antd';
import { connect } from 'react-redux';
import {HOME} from '../constants/Navbar'
import moment from 'moment'
const Types = [
    { value: 'sell', label: 'Sell' },
    { value: 'sold', label: 'Sold' },
    { value: 'rented', label: 'Rent' },
];
const ProvinceData = [
    { value: 'hochiminh', label: 'Hồ Chí Minh' },
    { value: 'hanoi', label: 'Hà Nội' }];
const DistrictData = {
    hochiminh: ['Quận 1', 'Quận 2', 'Tân Phú'],
    hanoi: ['Hoàn Kiếm', 'Ba Đình', 'Đống Đa'],
};

const Area = [
    { value: '30-50', label: '30 - 50 m2' },
    { value: '70-110', label: '70 - 110 m2' },
];
const Price = [
    { value: '1000-10000', label: '1000 - 10000' },
    { value: '10000-20000', label: '10000 - 20000' },
];
class Home extends Component {
    constructor() {
        super();
        this.state = {
            type: Types[0].value,
            province: ProvinceData[0].label,
            districts: DistrictData[ProvinceData[0].value],
            district: DistrictData[ProvinceData[0].value][0],
            area: Area[0].value,
            price: Price[0].value,
        };
        this.handleOnChange = this.handleOnChange.bind(this)
        
    }
    handleProvinceChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        const result = ProvinceData.find(city => city.label === value);
        this.setState({
            [name]: value,
            districts: DistrictData[result.value],
            district: DistrictData[result.value][0],
        });

    }
    handleOnChange(e){
        let target = e.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value,
        });
    }
    onSearch = (e) => {
        e.preventDefault();
        let data = {
            type: this.state.type,
            address: `${this.state.district}, ${this.state.province}`,
            area: this.state.area,
            price: this.state.price
        }
        // console.log(data);
        this.props.actGetListEstatesFromFormSearch(data);
        this.props.history.push('/estatelistview');
    }
    componentDidMount() {
        if(localStorage.getItem('company')){
            this.props.history.push('/company/profile-admin')
        }
    }
    onGoToMap = (e) => {
        e.preventDefault();
        this.props.history.push("/maps");
    }
    onGoHomeMap = (e) => {
        e.preventDefault();
        this.props.history.push("/homemaps");
    }
    onProperties = (e) => {
        e.preventDefault();
        this.props.history.push("/properties");
    }
    render() {
        let { type, province, districts, district, area, price } = this.state;
        // console.log(type);
        // console.log(province);
        // console.log(district);
        // console.log(area);
        // console.log(price);
        // console.log(moment().unix())
        return (
            <div>

                <MainHeader component={HOME}/>

                {
                    /* Banner start */
                }
                <div className="banner">
                    <div
                        id="carousel-example-generic"
                        className="carousel slide"
                        data-ride="carousel"
                    >
                        {/* Wrapper for slides */}
                        <div className="carousel-inner" role="listbox">
                            <div className="item banner-max-height active">
                                <img
                                    src="/img/banner/banner-slider-1.jpg"
                                    alt="banner-slider-1"
                                />
                                <div className="carousel-caption banner-slider-inner">
                                    <div className="banner-content">
                                        <h1 data-animation="animated fadeInDown delay-05s">
                                            <span>Find your </span> Dream House
                                        </h1>
                                        <p data-animation="animated fadeInUp delay-1s">
                                            Lorem ipsum dolor sit amet, conconsectetuer adipiscing
                                            elit Lorem ipsum dolor sit amet, conconsectetuer
                                        </p>
                                        <a
                                            onClick={this.onGoToMap}
                                            className="btn button-md button-theme"
                                            data-animation="animated fadeInUp delay-15s"
                                        >
                                            Go to Maps
                                        </a>
                                        <a
                                            className="btn button-md border-button-theme"
                                            data-animation="animated fadeInUp delay-15s"
                                        >
                                            Learn More
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="item banner-max-height">
                                <img
                                    src="/img/banner/banner-slider-2.jpg"
                                    alt="banner-slider-2"
                                />
                                <div className="carousel-caption banner-slider-inner">
                                    <div className="banner-content">
                                        <h1 data-animation="animated fadeInDown delay-1s">
                                            <span>Sweet Home For</span> Small Family
                                        </h1>
                                        <p data-animation="animated fadeInUp delay-05s">
                                            Lorem ipsum dolor sit amet, conconsectetuer adipiscing
                                            elit Lorem ipsum dolor sit amet, conconsectetuer
                                        </p>
                                        <a
                                            className="btn button-md button-theme"
                                            data-animation="animated fadeInUp delay-15s"
                                            onClick={this.onGoHomeMap}
                                        >
                                            Get Home Maps
                                        </a>
                                        <a
                                            className="btn button-md border-button-theme"
                                            data-animation="animated fadeInUp delay-15s"
                                        >
                                            Learn More
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="item banner-max-height">
                                <img
                                    src="/img/banner/banner-slider-3.jpg"
                                    alt="banner-slider-3"
                                />
                                <div className="carousel-caption banner-slider-inner">
                                    <div className="banner-content">
                                        <h1 data-animation="animated fadeInLeft delay-05s">
                                            <span>Best Place To</span> Find Home
                                        </h1>
                                        <p data-animation="animated fadeInLeft delay-1s">
                                            Lorem ipsum dolor sit amet, conconsectetuer adipiscing
                                            elit Lorem ipsum dolor sit amet, conconsectetuer
                                        </p>
                                        <a

                                            className="btn button-md button-theme"
                                            data-animation="animated fadeInLeft delay-15s"
                                        >
                                            Get Started Now
                                        </a>
                                        <a

                                            className="btn button-md border-button-theme"
                                            data-animation="animated fadeInLeft delay-20s"
                                        >
                                            Learn More
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Controls */}
                        <a
                            className="left carousel-control"
                            href="#carousel-example-generic"
                            role="button"
                            data-slide="prev"
                        >
                            <span className="slider-mover-left" aria-hidden="true">
                                <i className="fa fa-angle-left" />
                            </span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a
                            className="right carousel-control"
                            href="#carousel-example-generic"
                            role="button"
                            data-slide="next"
                        >
                            <span className="slider-mover-right" aria-hidden="true">
                                <i className="fa fa-angle-right" />
                            </span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>
                {
                    /* Banner end */
                }

                <div>
                    {/* Search area start */}
                    <div className="search-area">
                        <div className="container">
                            <div className="search-area-inner">
                                <div className="search-contents ">
                                    <form method="GET" onSubmit={this.onSearch}>
                                        <div className="row">
                                            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
                                                <div className="form-group">
                                                    <label>
                                                        Loại nhà đất
                                                </label>
                                                    <select className="form-control"
                                                        name="type"
                                                        value={type}
                                                        onChange={this.handleOnChange}
                                                        id="sel1">
                                                        {Types.map((type, index) => <option key={index} value={type.value}>{type.label}</option>)}

                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
                                                <div className="form-group">
                                                    <label>
                                                        Thành phố
                                                </label>
                                                    <select className="form-control"
                                                        name="province"
                                                        value={province}
                                                        onChange={this.handleProvinceChange}
                                                        id="sel1">
                                                        {ProvinceData.map((province, index) => <option key={index} value={province.label}>{province.label}</option>)}

                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
                                                <div className="form-group">
                                                    <label>
                                                        Quận
                                                </label>
                                                    <select className="form-control"
                                                        name="district"
                                                        value={district}
                                                        onChange={this.handleOnChange}
                                                        id="sel2">
                                                        {districts.map((district, index) => <option key={index} value={district}>{district}</option>)}

                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
                                                <div className="form-group">
                                                    <label>
                                                        Diện tích
                                                </label>
                                                    <select className="form-control"
                                                        name="area"
                                                        value={area}
                                                        onChange={this.handleOnChange}
                                                        id="sel2">
                                                        {Area.map((area, index) => <option key={index} value={area.value}>{area.label}</option>)}

                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
                                                <div className="form-group">
                                                    <label>
                                                        Giá
                                                </label>
                                                    <select className="form-control"
                                                        name="price"
                                                        value={price}
                                                        onChange={this.handleOnChange}
                                                        id="sel2">
                                                        {Price.map((price, index) => <option key={index} value={price.value}>{price.label}</option>)}

                                                    </select>
                                                </div>
                                            </div>
                                            {/* <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6">

                                                <Select
                                                    defaultValue={provinceData[0]}
                                                    style={{ width: 120 }}
                                                    onChange={this.handleProvinceChange}
                                                >
                                                    {provinceData.map(province => <Option key={province}>{province}</Option>)}
                                                </Select>
                                            </div>
                                            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6">

                                                <Select
                                                    style={{ width: 120 }}
                                                    value={this.state.secondCity}
                                                    onChange={this.onSecondCityChange}
                                                >
                                                    {cities.map(city => <Option key={city}>{city}</Option>)}
                                                </Select>
                                            </div> */}
                                        
                                            {/* <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
                                                <div className="form-group">
                                                <label>
                                                    Loại nhà đất
                                                </label>
                                                <Select

                                                        // value={selectedOption}
                                                        onChange={this.handleChange}
                                                        options={options}
                                                        isClearable
                                                        name="Bathrooms"
                                                    />  
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
                                                <div className="form-group">
                                                <label>
                                                    Loại nhà đất
                                                </label>
                                                    <div className="range-slider">
                                                        <div
                                                            data-min={0}
                                                            data-max={150000}
                                                            data-unit="USD"
                                                            data-min-name="min_price"
                                                            data-max-name="max_price"
                                                            className="range-slider-ui ui-slider"
                                                            aria-disabled="false"
                                                        />
                                                        <div className="clearfix" />
                                                    </div>
                                                </div>
                                            </div> */}
                                            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 ">
                                                <br />
                                                <div className="form-group">
                                                    <button onClick={this.onSearch} className="search-button" type="submit">Search</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Search area start */}
                    {/* Featured properties start */}
                    <div className="content-area featured-properties">
                        <div className="container">
                            {/* Main title */}
                            <div className="main-title">
                                <h1>Featured Properties</h1>
                            </div>
                            <ul className="list-inline-listing filters filters-listing-navigation">
                                <li
                                    className="active btn filtr-button filtr"
                                    data-filter="all"
                                >
                                    All
                                </li>
                                <li
                                    data-filter={1}
                                    className="btn btn-inline filtr-button filtr"
                                >
                                    House
                                </li>
                                <li
                                    data-filter={2}
                                    className="btn btn-inline filtr-button filtr"
                                >
                                    Office
                                </li>
                                <li
                                    data-filter={3}
                                    className="btn btn-inline filtr-button filtr"
                                >
                                    Apartment
                                </li>
                                <li
                                    data-filter={4}
                                    className="btn btn-inline filtr-button filtr"
                                >
                                    Residential
                                </li>
                            </ul>
                            <div className="row">
                                <div className="filtr-container">
                                    <div
                                        className="col-lg-4 col-md-4 col-sm-6 col-xs-12  filtr-item"
                                        data-category="1, 2, 3"
                                    >
                                        <div className="property">
                                            {/* Property img */}
                                            <div className="property-img">
                                                <div className="property-tag button alt featured">
                                                    Featured
                                                </div>
                                                <div className="property-tag button sale">
                                                    For Sale
                                                </div>
                                                <div className="property-price">$150,000</div>
                                                <img
                                                    src="img/properties/properties-1.jpg"
                                                    alt="fp"
                                                    className="img-responsive"
                                                />
                                                <div className="property-overlay">
                                                    <a
                                                        href="properties-details.html"
                                                        className="overlay-link"
                                                    >
                                                        <i className="fa fa-link" />
                                                    </a>
                                                    <a
                                                        className="overlay-link property-video"
                                                        title="Lexus GS F"
                                                    >
                                                        <i className="fa fa-video-camera" />
                                                    </a>
                                                    <div className="property-magnify-gallery">
                                                        <a
                                                            href="img/properties/properties-1.jpg"
                                                            className="overlay-link"
                                                        >
                                                            <i className="fa fa-expand" />
                                                        </a>
                                                        <a
                                                            href="img/properties/properties-2.jpg"
                                                            className="hidden"
                                                        />
                                                        <a
                                                            href="img/properties/properties-3.jpg"
                                                            className="hidden"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Property content */}
                                            <div className="property-content">
                                                {/* title */}
                                                <h1 className="title">
                                                    <a onClick={this.onProperties} href="properties-details.html">
                                                        Beautiful Single Home
                                                    </a>
                                                </h1>
                                                {/* Property address */}
                                                <h3 className="property-address">
                                                    <a href="properties-details.html">
                                                        <i className="fa fa-map-marker" />123 Kathal St.
                                                        Tampa City,
                                                    </a>
                                                </h3>
                                                {/* Facilities List */}
                                                <ul className="facilities-list clearfix">
                                                    <li>
                                                        <i className="flaticon-square-layouting-with-black-square-in-east-area" />
                                                        <span>4800 sq ft</span>
                                                    </li>
                                                    <li>
                                                        <i className="flaticon-bed" />
                                                        <span>3 Beds</span>
                                                    </li>
                                                    <li>
                                                        <i className="flaticon-monitor" />
                                                        <span>TV </span>
                                                    </li>
                                                    <li>
                                                        <i className="flaticon-holidays" />
                                                        <span> 2 Baths</span>
                                                    </li>
                                                    <li>
                                                        <i className="flaticon-vehicle" />
                                                        <span>1 Garage</span>
                                                    </li>
                                                    <li>
                                                        <i className="flaticon-building" />
                                                        <span> 3 Balcony</span>
                                                    </li>
                                                </ul>
                                                {/* Property footer */}
                                                <div className="property-footer">
                                                    <span className="left">
                                                        <a  >
                                                            <i className="fa fa-user" />Jhon Doe
                    </a>
                                                    </span>
                                                    <span className="right">
                                                        <i className="fa fa-calendar" />5 Days ago
                  </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="col-lg-4 col-md-4 col-sm-6 col-xs-12  filtr-item"
                                        data-category={1}
                                    >
                                        <div className="property">
                                            {/* Property img */}
                                            <div className="property-img">
                                                <div className="property-tag button alt featured">
                                                    Featured
                </div>
                                                <div className="property-tag button sale">
                                                    For Sale
                </div>
                                                <div className="property-price">$150,000</div>
                                                <img
                                                    src="img/properties/properties-2.jpg"
                                                    alt="fp"
                                                    className="img-responsive"
                                                />
                                                <div className="property-overlay">
                                                    <a
                                                        href="properties-details.html"
                                                        className="overlay-link"
                                                    >
                                                        <i className="fa fa-link" />
                                                    </a>
                                                    <a
                                                        className="overlay-link property-video"
                                                        title="Lexus GS F"
                                                    >
                                                        <i className="fa fa-video-camera" />
                                                    </a>
                                                    <div className="property-magnify-gallery">
                                                        <a
                                                            href="img/properties/properties-2.jpg"
                                                            className="overlay-link"
                                                        >
                                                            <i className="fa fa-expand" />
                                                        </a>
                                                        <a
                                                            href="img/properties/properties-4.jpg"
                                                            className="hidden"
                                                        />
                                                        <a
                                                            href="img/properties/properties-3.jpg"
                                                            className="hidden"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Property content */}
                                            <div className="property-content">
                                                {/* title */}
                                                <h1 className="title">
                                                    <a href="properties-details.html">
                                                        Modern Family Home
                  </a>
                                                </h1>
                                                {/* Property address */}
                                                <h3 className="property-address">
                                                    <a href="properties-details.html">
                                                        <i className="fa fa-map-marker" />123 Kathal St.
                                                        Tampa City,
                  </a>
                                                </h3>
                                                {/* Facilities List */}
                                                <ul className="facilities-list clearfix">
                                                    <li>
                                                        <i className="flaticon-square-layouting-with-black-square-in-east-area" />
                                                        <span>4800 sq ft</span>
                                                    </li>
                                                    <li>
                                                        <i className="flaticon-bed" />
                                                        <span>3 Beds</span>
                                                    </li>
                                                    <li>
                                                        <i className="flaticon-monitor" />
                                                        <span>TV </span>
                                                    </li>
                                                    <li>
                                                        <i className="flaticon-holidays" />
                                                        <span> 2 Baths</span>
                                                    </li>
                                                    <li>
                                                        <i className="flaticon-vehicle" />
                                                        <span>1 Garage</span>
                                                    </li>
                                                    <li>
                                                        <i className="flaticon-building" />
                                                        <span> 3 Balcony</span>
                                                    </li>
                                                </ul>
                                                {/* Property footer */}
                                                <div className="property-footer">
                                                    <span className="left">
                                                        <a  >
                                                            <i className="fa fa-user" />Jhon Doe
                    </a>
                                                    </span>
                                                    <span className="right">
                                                        <i className="fa fa-calendar" />5 Days ago
                  </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="col-lg-4 col-md-4 col-sm-6 col-xs-12  filtr-item"
                                        data-category="2, 3"
                                    >
                                        <div className="property">
                                            {/* Property img */}
                                            <div className="property-img">
                                                <div className="property-tag button alt featured">
                                                    Featured
                </div>
                                                <div className="property-tag button sale">
                                                    For Sale
                </div>
                                                <div className="property-price">$150,000</div>
                                                <img
                                                    src="img/properties/properties-3.jpg"
                                                    alt="fp"
                                                    className="img-responsive"
                                                />
                                                <div className="property-overlay">
                                                    <a
                                                        href="properties-details.html"
                                                        className="overlay-link"
                                                    >
                                                        <i className="fa fa-link" />
                                                    </a>
                                                    <a
                                                        className="overlay-link property-video"
                                                        title="Lexus GS F"
                                                    >
                                                        <i className="fa fa-video-camera" />
                                                    </a>
                                                    <div className="property-magnify-gallery">
                                                        <a
                                                            href="img/properties/properties-3.jpg"
                                                            className="overlay-link"
                                                        >
                                                            <i className="fa fa-expand" />
                                                        </a>
                                                        <a
                                                            href="img/properties/properties-2.jpg"
                                                            className="hidden"
                                                        />
                                                        <a
                                                            href="img/properties/properties-1.jpg"
                                                            className="hidden"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Property content */}
                                            <div className="property-content">
                                                {/* title */}
                                                <h1 className="title">
                                                    <a href="properties-details.html">
                                                        Sweet Family Home
                  </a>
                                                </h1>
                                                {/* Property address */}
                                                <h3 className="property-address">
                                                    <a href="properties-details.html">
                                                        <i className="fa fa-map-marker" />123 Kathal St.
                                                        Tampa City,
                  </a>
                                                </h3>
                                                {/* Facilities List */}
                                                <ul className="facilities-list clearfix">
                                                    <li>
                                                        <i className="flaticon-square-layouting-with-black-square-in-east-area" />
                                                        <span>4800 sq ft</span>
                                                    </li>
                                                    <li>
                                                        <i className="flaticon-bed" />
                                                        <span>3 Beds</span>
                                                    </li>
                                                    <li>
                                                        <i className="flaticon-monitor" />
                                                        <span>TV </span>
                                                    </li>
                                                    <li>
                                                        <i className="flaticon-holidays" />
                                                        <span> 2 Baths</span>
                                                    </li>
                                                    <li>
                                                        <i className="flaticon-vehicle" />
                                                        <span>1 Garage</span>
                                                    </li>
                                                    <li>
                                                        <i className="flaticon-building" />
                                                        <span> 3 Balcony</span>
                                                    </li>
                                                </ul>
                                                {/* Property footer */}
                                                <div className="property-footer">
                                                    <span className="left">
                                                        <a>
                                                            <i className="fa fa-user" />Jhon Doe
                    </a>
                                                    </span>
                                                    <span className="right">
                                                        <i className="fa fa-calendar" />5 Days ago
                  </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="col-lg-4 col-md-4 col-sm-6 col-xs-12  filtr-item"
                                        data-category="3, 4"
                                    >
                                        <div className="property">
                                            {/* Property img */}
                                            <div className="property-img">
                                                <div className="property-tag button alt featured">
                                                    Featured
                </div>
                                                <div className="property-tag button sale">
                                                    For Sale
                </div>
                                                <div className="property-price">$150,000</div>
                                                <img
                                                    src="img/properties/properties-4.jpg"
                                                    alt="fp"
                                                    className="img-responsive"
                                                />
                                                <div className="property-overlay">
                                                    <a
                                                        href="properties-details.html"
                                                        className="overlay-link"
                                                    >
                                                        <i className="fa fa-link" />
                                                    </a>
                                                    <a
                                                        className="overlay-link property-video"
                                                        title="Lexus GS F"
                                                    >
                                                        <i className="fa fa-video-camera" />
                                                    </a>
                                                    <div className="property-magnify-gallery">
                                                        <a
                                                            href="img/properties/properties-4.jpg"
                                                            className="overlay-link"
                                                        >
                                                            <i className="fa fa-expand" />
                                                        </a>
                                                        <a
                                                            href="img/properties/properties-2.jpg"
                                                            className="hidden"
                                                        />
                                                        <a
                                                            href="img/properties/properties-3.jpg"
                                                            className="hidden"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Property content */}
                                            <div className="property-content">
                                                {/* title */}
                                                <h1 className="title">
                                                    <a href="properties-details.html">Big Head House</a>
                                                </h1>
                                                {/* Property address */}
                                                <h3 className="property-address">
                                                    <a href="properties-details.html">
                                                        <i className="fa fa-map-marker" />123 Kathal St.
                                                        Tampa City,
                  </a>
                                                </h3>
                                                {/* Facilities List */}
                                                <ul className="facilities-list clearfix">
                                                    <li>
                                                        <i className="flaticon-square-layouting-with-black-square-in-east-area" />
                                                        <span>4800 sq ft</span>
                                                    </li>
                                                    <li>
                                                        <i className="flaticon-bed" />
                                                        <span>3 Beds</span>
                                                    </li>
                                                    <li>
                                                        <i className="flaticon-monitor" />
                                                        <span>TV </span>
                                                    </li>
                                                    <li>
                                                        <i className="flaticon-holidays" />
                                                        <span> 2 Baths</span>
                                                    </li>
                                                    <li>
                                                        <i className="flaticon-vehicle" />
                                                        <span>1 Garage</span>
                                                    </li>
                                                    <li>
                                                        <i className="flaticon-building" />
                                                        <span> 3 Balcony</span>
                                                    </li>
                                                </ul>
                                                {/* Property footer */}
                                                <div className="property-footer">
                                                    <span className="left">
                                                        <a  >
                                                            <i className="fa fa-user" />Jhon Doe
                    </a>
                                                    </span>
                                                    <span className="right">
                                                        <i className="fa fa-calendar" />5 Days ago
                  </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="col-lg-4 col-md-4 col-sm-6 col-xs-12  filtr-item"
                                        data-category={4}
                                    >
                                        <div className="property">
                                            {/* Property img */}
                                            <div className="property-img">
                                                <div className="property-tag button alt featured">
                                                    Featured
                </div>
                                                <div className="property-tag button sale">
                                                    For Sale
                </div>
                                                <div className="property-price">$150,000</div>
                                                <img
                                                    src="img/properties/properties-5.jpg"
                                                    alt="fp"
                                                    className="img-responsive"
                                                />
                                                <div className="property-overlay">
                                                    <a
                                                        href="properties-details.html"
                                                        className="overlay-link"
                                                    >
                                                        <i className="fa fa-link" />
                                                    </a>
                                                    <a
                                                        className="overlay-link property-video"
                                                        title="Lexus GS F"
                                                    >
                                                        <i className="fa fa-video-camera" />
                                                    </a>
                                                    <div className="property-magnify-gallery">
                                                        <a
                                                            href="img/properties/properties-5.jpg"
                                                            className="overlay-link"
                                                        >
                                                            <i className="fa fa-expand" />
                                                        </a>
                                                        <a
                                                            href="img/properties/properties-2.jpg"
                                                            className="hidden"
                                                        />
                                                        <a
                                                            href="img/properties/properties-3.jpg"
                                                            className="hidden"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Property content */}
                                            <div className="property-content">
                                                {/* title */}
                                                <h1 className="title">
                                                    <a href="properties-details.html">Park Avenue</a>
                                                </h1>
                                                {/* Property address */}
                                                <h3 className="property-address">
                                                    <a href="properties-details.html">
                                                        <i className="fa fa-map-marker" />123 Kathal St.
                                                        Tampa City,
                  </a>
                                                </h3>
                                                {/* Facilities List */}
                                                <ul className="facilities-list clearfix">
                                                    <li>
                                                        <i className="flaticon-square-layouting-with-black-square-in-east-area" />
                                                        <span>4800 sq ft</span>
                                                    </li>
                                                    <li>
                                                        <i className="flaticon-bed" />
                                                        <span>3 Beds</span>
                                                    </li>
                                                    <li>
                                                        <i className="flaticon-monitor" />
                                                        <span>TV </span>
                                                    </li>
                                                    <li>
                                                        <i className="flaticon-holidays" />
                                                        <span> 2 Baths</span>
                                                    </li>
                                                    <li>
                                                        <i className="flaticon-vehicle" />
                                                        <span>1 Garage</span>
                                                    </li>
                                                    <li>
                                                        <i className="flaticon-building" />
                                                        <span> 3 Balcony</span>
                                                    </li>
                                                </ul>
                                                {/* Property footer */}
                                                <div className="property-footer">
                                                    <span className="left">
                                                        <a >
                                                            <i className="fa fa-user" />Jhon Doe
                    </a>
                                                    </span>
                                                    <span className="right">
                                                        <i className="fa fa-calendar" />5 Days ago
                  </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="col-lg-4 col-md-4 col-sm-6 col-xs-12  filtr-item"
                                        data-category={1}
                                    >
                                        <div className="property">
                                            {/* Property img */}
                                            <div className="property-img">
                                                <div className="property-tag button alt featured">
                                                    Featured
                </div>
                                                <div className="property-tag button sale">
                                                    For Sale
                </div>
                                                <div className="property-price">$150,000</div>
                                                <img
                                                    src="img/properties/properties-6.jpg"
                                                    alt="fp"
                                                    className="img-responsive"
                                                />
                                                <div className="property-overlay">
                                                    <a
                                                        href="properties-details.html"
                                                        className="overlay-link"
                                                    >
                                                        <i className="fa fa-link" />
                                                    </a>
                                                    <a
                                                        className="overlay-link property-video"
                                                        title="Lexus GS F"
                                                    >
                                                        <i className="fa fa-video-camera" />
                                                    </a>
                                                    <div className="property-magnify-gallery">
                                                        <a
                                                            href="img/properties/properties-6.jpg"
                                                            className="overlay-link"
                                                        >
                                                            <i className="fa fa-expand" />
                                                        </a>
                                                        <a
                                                            href="img/properties/properties-2.jpg"
                                                            className="hidden"
                                                        />
                                                        <a
                                                            href="img/properties/properties-3.jpg"
                                                            className="hidden"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Property content */}
                                            <div className="property-content">
                                                {/* title */}
                                                <h1 className="title">
                                                    <a href="properties-details.html">Masons Villas</a>
                                                </h1>
                                                {/* Property address */}
                                                <h3 className="property-address">
                                                    <a href="properties-details.html">
                                                        <i className="fa fa-map-marker" />123 Kathal St.
                                                        Tampa City,
                  </a>
                                                </h3>
                                                {/* Facilities List */}
                                                <ul className="facilities-list clearfix">
                                                    <li>
                                                        <i className="flaticon-square-layouting-with-black-square-in-east-area" />
                                                        <span>4800 sq ft</span>
                                                    </li>
                                                    <li>
                                                        <i className="flaticon-bed" />
                                                        <span>3 Beds</span>
                                                    </li>
                                                    <li>
                                                        <i className="flaticon-monitor" />
                                                        <span>TV </span>
                                                    </li>
                                                    <li>
                                                        <i className="flaticon-holidays" />
                                                        <span> 2 Baths</span>
                                                    </li>
                                                    <li>
                                                        <i className="flaticon-vehicle" />
                                                        <span>1 Garage</span>
                                                    </li>
                                                    <li>
                                                        <i className="flaticon-building" />
                                                        <span> 3 Balcony</span>
                                                    </li>
                                                </ul>
                                                {/* Property footer */}
                                                <div className="property-footer">
                                                    <span className="left">
                                                        <a >
                                                            <i className="fa fa-user" />Jhon Doe
                    </a>
                                                    </span>
                                                    <span className="right">
                                                        <i className="fa fa-calendar" />5 Days ago
                  </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Featured properties end */}
                </div>
                {
                    /* Recently properties start */
                }
                ;<div className="mb-70 recently-properties chevron-icon">
                    <div className="container">
                        {/* Main title */}
                        <div className="main-title">
                            <h1>
                                <span>Recently</span> Properties
      </h1>
                        </div>
                        <div className="row">
                            <div className="carousel our-partners slide" id="ourPartners2">
                                <div className="col-lg-12 mrg-btm-30">
                                    <a
                                        className="right carousel-control"
                                        href="#ourPartners2"
                                        data-slide="prev"
                                    >
                                        <i className="fa fa-chevron-left icon-prev" />
                                    </a>
                                    <a
                                        className="right carousel-control"
                                        href="#ourPartners2"
                                        data-slide="next"
                                    >
                                        <i className="fa fa-chevron-right icon-next" />
                                    </a>
                                </div>
                                <div className="carousel-inner">
                                    <div className="item active">
                                        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                            {/* Property 2 start */}
                                            <div className="property-2">
                                                {/* Property img */}
                                                <div className="property-img">
                                                    <div className="featured">Featured</div>
                                                    <div className="price-ratings">
                                                        <div className="price">$150,000</div>
                                                        <div className="ratings">
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star-o" />
                                                        </div>
                                                    </div>
                                                    <img
                                                        src="img/properties/properties-4.jpg"
                                                        alt="rp"
                                                        className="img-responsive"
                                                    />
                                                    <div className="property-overlay">
                                                        <a
                                                            href="properties-details.html"
                                                            className="overlay-link"
                                                        >
                                                            <i className="fa fa-link" />
                                                        </a>
                                                        <a
                                                            className="overlay-link property-video"
                                                            title="Lexus GS F"
                                                        >
                                                            <i className="fa fa-video-camera" />
                                                        </a>
                                                        <div className="property-magnify-gallery">
                                                            <a
                                                                href="img/properties/properties-4.jpg"
                                                                className="overlay-link"
                                                            >
                                                                <i className="fa fa-expand" />
                                                            </a>
                                                            <a
                                                                href="img/properties/properties-2.jpg"
                                                                className="hidden"
                                                            />
                                                            <a
                                                                href="img/properties/properties-3.jpg"
                                                                className="hidden"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* content */}
                                                <div className="content">
                                                    {/* title */}
                                                    <h4 className="title">
                                                        <a href="properties-details.html">
                                                            Big Head House
                    </a>
                                                    </h4>
                                                    {/* Property address */}
                                                    <h3 className="property-address">
                                                        <a href="properties-details.html">
                                                            <i className="fa fa-map-marker" />123 Kathal St.
                                                            Tampa City,
                    </a>
                                                    </h3>
                                                </div>
                                                {/* Facilities List */}
                                                <ul className="facilities-list clearfix">
                                                    <li>
                                                        <i className="flaticon-square-layouting-with-black-square-in-east-area" />
                                                        <span>4800 sq ft</span>
                                                    </li>
                                                    <li>
                                                        <i className="flaticon-bed" />
                                                        <span>3</span>
                                                    </li>
                                                    <li>
                                                        <i className="flaticon-holidays" />
                                                        <span>2</span>
                                                    </li>
                                                    <li>
                                                        <i className="flaticon-vehicle" />
                                                        <span>1</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            {/* Property 2 end */}
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                            {/* Property 2 start */}
                                            <div className="property-2">
                                                {/* Property img */}
                                                <div className="property-img">
                                                    <div className="featured">Featured</div>
                                                    <div className="price-ratings">
                                                        <div className="price">$150,000</div>
                                                        <div className="ratings">
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star-o" />
                                                        </div>
                                                    </div>
                                                    <img
                                                        src="img/properties/properties-3.jpg"
                                                        alt="rp"
                                                        className="img-responsive"
                                                    />
                                                    <div className="property-overlay">
                                                        <a
                                                            href="properties-details.html"
                                                            className="overlay-link"
                                                        >
                                                            <i className="fa fa-link" />
                                                        </a>

                                                        <a
                                                            href="true"
                                                            className="overlay-link property-video"
                                                            title="Lexus GS F"
                                                        >
                                                            <i className="fa fa-video-camera" />
                                                        </a>
                                                        <div className="property-magnify-gallery">
                                                            <a
                                                                href="img/properties/properties-3.jpg"
                                                                className="overlay-link"
                                                            >
                                                                <i className="fa fa-expand" />
                                                            </a>
                                                            <a
                                                                href="img/properties/properties-2.jpg"
                                                                className="hidden"
                                                            />
                                                            <a
                                                                href="img/properties/properties-5.jpg"
                                                                className="hidden"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* content */}
                                                <div className="content">
                                                    {/* title */}
                                                    <h4 className="title">
                                                        <a href="properties-details.html">
                                                            Masons Villas
                    </a>
                                                    </h4>
                                                    {/* Property address */}
                                                    <h3 className="property-address">
                                                        <a href="properties-details.html">
                                                            <i className="fa fa-map-marker" />123 Kathal St.
                                                            Tampa City,
                    </a>
                                                    </h3>
                                                </div>
                                                {/* Facilities List */}
                                                <ul className="facilities-list clearfix">
                                                    <li>
                                                        <i className="flaticon-square-layouting-with-black-square-in-east-area" />
                                                        <span>4800 sq ft</span>
                                                    </li>
                                                    <li>
                                                        <i className="flaticon-bed" />
                                                        <span>3</span>
                                                    </li>
                                                    <li>
                                                        <i className="flaticon-holidays" />
                                                        <span>2</span>
                                                    </li>
                                                    <li>
                                                        <i className="flaticon-vehicle" />
                                                        <span>1</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            {/* Property 2 end */}
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                            {/* Property 2 start */}
                                            <div className="property-2">
                                                {/* Property img */}
                                                <div className="property-img">
                                                    <div className="featured">Featured</div>
                                                    <div className="price-ratings">
                                                        <div className="price">$150,000</div>
                                                        <div className="ratings">
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star-o" />
                                                        </div>
                                                    </div>
                                                    <img
                                                        src="img/properties/properties-2.jpg"
                                                        alt="rp"
                                                        className="img-responsive"
                                                    />
                                                    <div className="property-overlay">
                                                        <a
                                                            href="properties-details.html"
                                                            className="overlay-link"
                                                        >
                                                            <i className="fa fa-link" />
                                                        </a>
                                                        <a
                                                            className="overlay-link property-video"
                                                            title="Lexus GS F"
                                                        >
                                                            <i className="fa fa-video-camera" />
                                                        </a>
                                                        <div className="property-magnify-gallery">
                                                            <a
                                                                href="img/properties/properties-2.jpg"
                                                                className="overlay-link"
                                                            >
                                                                <i className="fa fa-expand" />
                                                            </a>
                                                            <a
                                                                href="img/properties/properties-1.jpg"
                                                                className="hidden"
                                                            />
                                                            <a
                                                                href="img/properties/properties-5.jpg"
                                                                className="hidden"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* content */}
                                                <div className="content">
                                                    {/* title */}
                                                    <h4 className="title">
                                                        <a href="properties-details.html">Park Avenue</a>
                                                    </h4>
                                                    {/* Property address */}
                                                    <h3 className="property-address">
                                                        <a href="properties-details.html">
                                                            <i className="fa fa-map-marker" />123 Kathal St.
                                                            Tampa City,
                    </a>
                                                    </h3>
                                                </div>
                                                {/* Facilities List */}
                                                <ul className="facilities-list clearfix">
                                                    <li>
                                                        <i className="flaticon-square-layouting-with-black-square-in-east-area" />
                                                        <span>4800 sq ft</span>
                                                    </li>
                                                    <li>
                                                        <i className="flaticon-bed" />
                                                        <span>3</span>
                                                    </li>
                                                    <li>
                                                        <i className="flaticon-holidays" />
                                                        <span>2</span>
                                                    </li>
                                                    <li>
                                                        <i className="flaticon-vehicle" />
                                                        <span>1</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            {/* Property 2 end */}
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                            {/* Property 2 start */}
                                            <div className="property-2">
                                                {/* Property img */}
                                                <div className="property-img">
                                                    <div className="featured">Featured</div>
                                                    <div className="price-ratings">
                                                        <div className="price">$150,000</div>
                                                        <div className="ratings">
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star-o" />
                                                        </div>
                                                    </div>
                                                    <img
                                                        src="img/properties/properties-1.jpg"
                                                        alt="rp"
                                                        className="img-responsive"
                                                    />
                                                    <div className="property-overlay">
                                                        <a
                                                            href="properties-details.html"
                                                            className="overlay-link"
                                                        >
                                                            <i className="fa fa-link" />
                                                        </a>
                                                        <a
                                                            className="overlay-link property-video"
                                                            title="Lexus GS F"
                                                        >
                                                            <i className="fa fa-video-camera" />
                                                        </a>
                                                        <div className="property-magnify-gallery">
                                                            <a
                                                                href="img/properties/properties-1.jpg"
                                                                className="overlay-link"
                                                            >
                                                                <i className="fa fa-expand" />
                                                            </a>
                                                            <a
                                                                href="img/properties/properties-2.jpg"
                                                                className="hidden"
                                                            />
                                                            <a
                                                                href="img/properties/properties-5.jpg"
                                                                className="hidden"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* content */}
                                                <div className="content">
                                                    {/* title */}
                                                    <h4 className="title">
                                                        <a href="properties-details.html">
                                                            Sweet Family Home
                    </a>
                                                    </h4>
                                                    {/* Property address */}
                                                    <h3 className="property-address">
                                                        <a href="properties-details.html">
                                                            <i className="fa fa-map-marker" />123 Kathal St.
                                                            Tampa City,
                    </a>
                                                    </h3>
                                                </div>
                                                {/* Facilities List */}
                                                <ul className="facilities-list clearfix">
                                                    <li>
                                                        <i className="flaticon-square-layouting-with-black-square-in-east-area" />
                                                        <span>4800 sq ft</span>
                                                    </li>
                                                    <li>
                                                        <i className="flaticon-bed" />
                                                        <span>3</span>
                                                    </li>
                                                    <li>
                                                        <i className="flaticon-holidays" />
                                                        <span>2</span>
                                                    </li>
                                                    <li>
                                                        <i className="flaticon-vehicle" />
                                                        <span>1</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            {/* Property 2 end */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    /* Partners block end */
                }
                <Footer />
            </div>
        );
    }
}
const mapDispathToProp = (dispatch) => {
    return {
        actGetListEstatesFromFormSearch: (data) => dispatch(actions.actGetListEstatesFromFormSearch(data))
    }
}
const mapStateToProp = (state) => {
    return {
        estates: state.estates
    }
}
export default connect(mapStateToProp, mapDispathToProp)(withRouter(Home));