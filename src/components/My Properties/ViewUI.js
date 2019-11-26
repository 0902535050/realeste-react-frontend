import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions/request'
import MapOfDetailEstate from "../Properties/MapOfDetailEstate"
// import {Image, Transformation} from 'cloudinary-react'

class ViewUI extends Component {
    onShowImagesThumbnail = (images) => {
        if (images.length === 0) {
            return null
        }
        var result = null;
        if (images.length > 0) {
            result = images.map((image, index) => {
                // console.log(index)
                return (
                    <div className={index === 0 ? "item active" : "item"} key={index}>
                        <img
                            src={image}
                            className="thumb-preview"
                            style={{ width: "780%", height: "500px" }}
                            alt="Chevrolet Impala"
                        />
                        {/* <Image publicId={image}>
                            <Transformation width="150px" height="100px"/>
                        </Image> */}
                    </div>
                );
            });
        }
        return result;
    }
    onShowImagesSmall = (images) => {
        if (images.length === 0) {
            var string = "Bài đăng này hiện không có hình nào!"
            return <span>{string}</span>
        }
        var result = null;
        if (images.length > 0) {
            result = images.map((image, index) => {
                var percent = 100 / (index + 1)
                // console.log(percent)
                return (
                    <li
                        data-target="#carousel-custom"
                        data-slide-to={index}
                        key={index}
                    >
                        <img
                            src={image}
                            alt={index}
                            style={{ height: "100px", width: `100%` }}
                            key={index}
                        />
                        {/* <Image publicId={image}>
                            <Transformation width="750px" height="500px"/>
                        </Image> */}
                    </li>
                );
            });
        }
        return result;
    }
    onShowImageSlide = (images) => {
        if (images.length === 0)
            return null
        else return (
            <div>
                <a
                    className="left carousel-control"
                    href="#carousel-custom"
                    role="button"
                    data-slide="prev"
                >
                    <span
                        className="slider-mover-left no-bg t-slider-r pojison"
                        aria-hidden="true"
                    >
                        <i className="fa fa-angle-left" />
                    </span>
                    <span className="sr-only">Previous</span>
                </a>
                <a
                    className="right carousel-control"
                    href="#carousel-custom"
                    role="button"
                    data-slide="next"
                >
                    <span
                        className="slider-mover-right no-bg t-slider-l pojison"
                        aria-hidden="true"
                    >
                        <i className="fa fa-angle-right" />
                    </span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        )
    }
    render() {
        let { estateUserInfo } = this.props
        // console.log(estateUserInfo)
        let urlArray = estateUserInfo.url
        return (
            <div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    {/* Header */}
                    <div className="heading-properties clearfix sidebar-widget">
                        <div className="pull-left">
                            <h3>{estateUserInfo.name}</h3>
                            <p>
                                <i className="fa fa-map-marker" />
                                {estateUserInfo.address}
                            </p>
                        </div>
                        <div className="pull-right">
                            <h3>
                                <span>
                                    {estateUserInfo.price >= 1000
                                        ? Number((estateUserInfo.price / 1000).toFixed(1)) + ' ' + ((estateUserInfo.statusProject === 1 && estateUserInfo.price >= 1000) ? 'Tỉ' : estateUserInfo.unit)
                                        : estateUserInfo.price + ' ' + ((estateUserInfo.statusProject === 1 && estateUserInfo.price >= 1000) ? 'Tỉ' : estateUserInfo.unit)}
                                </span>
                            </h3>
                        </div>
                    </div>
                    {/* Properties details section start */}
                    <div className="Properties-details-section sidebar-widget">
                        {/* Properties detail slider start */}
                        <div className="properties-detail-slider simple-slider mb-40">
                            <div
                                id="carousel-custom"
                                className="carousel slide"
                                data-ride="carousel"
                            >
                                <div className="carousel-outer">
                                    {/* Wrapper for slides */}
                                    <div className="carousel-inner">
                                        {this.onShowImagesThumbnail(urlArray)}
                                    </div>
                                    {/* Controls */}
                                    {this.onShowImageSlide(urlArray)}
                                </div>
                                {/* Indicators */}
                                <ol className="carousel-indicators thumbs visible-lg visible-md">
                                    {this.onShowImagesSmall(urlArray)}
                                </ol>
                            </div>
                        </div>
                        {/* Properties detail slider end */}

                        {/* Property description start */}
                        <div className="panel-box properties-panel-box Property-description">
                            <ul className="nav nav-tabs">
                                <li className="active col-md-6 col-lg-6 col-xs-6">
                                    <a href="#tab1default" data-toggle="tab" aria-expanded="true">
                                        Mô tả chi tiết
                                    </a>
                                </li>
                                <li className="col-md-6 col-lg-6 col-xs-6">
                                    <a
                                        href="#tab2default"
                                        data-toggle="tab"
                                        aria-expanded="true"
                                    >
                                        Thông tin liên hệ
                                    </a>
                                </li>
                            </ul>
                            <div className="panel with-nav-tabs panel-default">
                                <div className="panel-body">
                                    <div className="tab-content">
                                        <div className="tab-pane fade active in" id="tab1default">
                                            <div className="main-title-2">
                                                <h1>
                                                    <span>Mô tả chi tiết</span>
                                                </h1>
                                            </div>
                                            <p>{estateUserInfo.info}</p>
                                            <br />
                                        </div>
                                        <div className="tab-pane fade features" id="tab2default">
                                            {/* Properties condition start */}
                                            <div className="properties-condition">
                                                <div className="main-title-2">
                                                    <h1>
                                                        <span>Thông tin liên hệ</span>
                                                    </h1>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-3 col-sm-3 col-xs-4">
                                                        <ul className="condition" style={{width:"100%", overflow: "hidden", textOverflow: "ellipsis"}}>
                                                            <li>
                                                                <i className="fa fa-user" />Tên người liên hệ:
                                                            </li>
                                                            <li>
                                                                <i className="fa fa-phone" />
                                                                Số điện thoại:
                                                            </li>
                                                            <li>
                                                                <i className="fa fa-envelope" />
                                                                Email:
                                                            </li>
                                                            <li>
                                                                <i className="fa fa-address-card" />
                                                                Địa chỉ:
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="col-md-9 col-sm-9 col-xs-8">
                                                        <ul className="condition" style={{ fontWeight: "bold" }}>
                                                            <li>
                                                                {estateUserInfo.fullname === null ? 'Không có' : estateUserInfo.fullname}
                                                            </li>
                                                            <li>
                                                                {estateUserInfo.phone === null ? 'Không có ' : estateUserInfo.phone}
                                                            </li>
                                                            <li>
                                                                {estateUserInfo.email === null ? 'Không có ' : estateUserInfo.email}
                                                            </li>
                                                            <li>
                                                                {estateUserInfo.address === null ? 'Không có ' : estateUserInfo.address}
                                                            </li>
                                                        </ul>
                                                    </div>

                                                </div>
                                            </div>
                                            {/* Properties condition end */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Property description end */}
                    </div>
                    {/* Properties details section end */}
                    {/* Location start */}
                    <div className="location sidebar-widget">
                        <div className="map">
                            {/* Main Title 2 */}
                            <div className="main-title-2">
                                <h1>
                                    <span>Vị trí</span>
                                </h1>
                            </div>
                            <MapOfDetailEstate info={estateUserInfo} />
                        </div>
                    </div>
                    {/* Location end */}
                </div>

            </div>

        )
    }
}
const mapDispathToProp = (dispatch) => {
    return {
        onGetCommentsById: (id) => dispatch(actions.actGetCommentsByIdRequest(id))
    }
}
const mapStateToProp = (state) => {
    return {
        comments: state.comments
    }
}
export default connect(mapStateToProp, mapDispathToProp)(ViewUI)