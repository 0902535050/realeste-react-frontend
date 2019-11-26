/* eslint-disable */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Tag } from 'antd'
import moment from 'moment'
import {connect} from 'react-redux'
import * as actions from '../../'

export default class SingleEstateListView extends Component {
    ImageSlide = (url) => {
        var result = null
        if (url && url.length > 0)
            result = url.map((image, index) => {
                if (index === 0) {
                    return <a href={image} className="hidden" key={index}>
                        <i className="fa fa-expand" />
                    </a>
                }
                else return <a href={image} className="hidden" key={index} />
            })
        return result
    }
    ImageSlideinModal = (url) => {
        var result = null
        if (url && url.length > 0) {
            result = url.map((image, index) => {
                return (
                    <div className={index === 0 ? "item active" : "item"} style={{ height: "300px" }} key={index}>
                        <img src={image} alt={index} key={index} />
                    </div>
                )
            })
        }
        return result
    }

    componentDidMount() {
        
    }
    render() {
        let { estate } = this.props;
        let status = 'Bán'
        if (estate.statusProject === 3) {
            status = 'Cho Thuê'
        }
        return (
            // <Link to={`/properties/${estate._id}`}>
            //     <div>
            //         <div className="property clearfix ">
            //             <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 col-pad">
            //                 {/* Property img */}
            //                 <div className="property-img">
            //                     <div className="property-tag button alt featured">{status}</div>
            //                     {/* <div className="property-tag button sale">For Sale</div> */}
            //                     <div className="property-tag button sale" style={{ fontSize: "18px" }}>{estate.price >= 1000 && estate.statusProject === 1 ? (estate.price / 1000).toFixed(2) + ' Tỉ' : estate.price + ' ' + estate.unit}</div>
            //                     <img style={{ height: '244px' }} src={estate.url[0]} alt="fp-list" className="img-responsive hp-1" />
            //                     <div className="property-overlay">
            //                         <a className="overlay-link property-video" title="Xem nhanh">
            //                             <i className="fa fa-video-camera"></i>
            //                         </a>
            //                     </div>
            //                 </div>
            //             </div>
            //             <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12 property-content ">
            //                 {/* title */}
            //                 <h2 className="title" style={{ marginTop: '8px', fontSize: '17px' }}>
            //                     <a href="true">{estate.name}</a>
            //                 </h2>
            //                 <p style={{
            //                     width: '100%',
            //                     overflow: 'hidden',
            //                     textOverflow: "ellipsis",
            //                     lineHeight: '16px',
            //                     WebkitLineClamp: '2',
            //                     display: 'webkit-box',
            //                     WebkitBoxOrient: 'vertical',
            //                     height: '32px'
            //                 }}>{estate.info}</p>
            //                 {/* Property address */}
            //                 <h6 style={{ fontSize: '13px' }}>
            //                     <b>Địa chỉ:</b> {estate.address}
            //                 </h6>
            //                 <h6 style={{ fontSize: '13px' }}>
            //                     <b>Diện tích:</b> {estate.area} m2
            //                 </h6>

            //                 {/* Property footer */}
            //                 <div className="property-footer">
            //                     <span className="left">
            //                         <a href="true"><i className="fa fa-user" />{estate.investor}</a>
            //                     </span>
            //                     <span className="right">
            //                         <Tag style={{ fontSize: '13px' }} color='green'>
            //                             <p style={{ fontSize: '13px', margin: 'auto', color: 'green', textAlign: 'center' }}><strong>Đăng ngày:</strong>{moment.unix(estate.updateTime).format('DD/MM/YYYY')}</p></Tag>
            //                     </span>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            // </Link>
            <React.Fragment>
                <div>
                    <div className="property property-hp clearfix wow fadeInUp delay-03s">
                        <div className="col-lg-4 col-md-4 col-sm-5 col-xs-12 col-pad">
                            {/* Property img */}
                            <div className="property-img">
                                <div className="property-tag button alt featured">{estate.statusProject === 1 ? 'Bán' : 'Thuê'}</div>
                                <div className="property-tag button sale" style={{ fontSize: "18px" }}>{estate.price >= 1000 && estate.statusProject === 1 ? (estate.price / 1000).toFixed(2) + ' tỷ VNĐ' : estate.price + ' ' + estate.unit}</div>
                                {/* <div className="property-price">$150,000</div> */}
                                <img src={estate.url && estate.url.length > 0 ? estate.url[0] : '/images/Home.png'} alt="fp-list" className="img-responsive" style={{ height: "250px", width: "100%" }} />
                                <div className="property-overlay">
                                    <a className="overlay-link property-video" title="Chế độ xem nhanh" data-toggle="modal" data-target={`#` + this.props.estate._id}>
                                        {/* <button type="button" data> */}
                                        <i className="fa fa-video-camera" />
                                        {/* </button> */}
                                    </a>
                                    <div className="property-magnify-gallery">
                                        {this.ImageSlide(estate.url)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-8 col-sm-7 col-xs-12 property-content ">
                            {/* title */}
                            <Link to={`/properties/${estate._id}`}>
                                <h1 className="title">
                                    <a>{estate.name}</a>
                                </h1>
                            </Link>
                            {/* Property address */}

                            <h3 className="property-address">
                                <a><i className="fa fa-map-marker" />{estate.address}</a>
                            </h3>
                            <p>{estate.info.length > 300 ? estate.info.slice(0, 300) + '...' : estate.info}</p>

                            {/* Property footer */}
                            <div className="property-footer">
                                <span className="left">
                                    <a href="#"><i className="fa fa-user" />{estate.investor}</a>
                                </span>
                                <span className="right">
                                    <i className="fa fa-calendar" />{moment.unix(estate.updateTime).format('DD/MM/YYYY')}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="modal property-modal fade" id={this.props.estate._id} tabIndex="-1" role="dialog" aria-labelledby="carModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="carModalLabel">
                                        {estate.name}
                                    </h5>
                                    <p>
                                        {estate.address}
                                    </p>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="row modal-raw">
                                        <div className="col-lg-5 modal-left">
                                            <div className="modal-left-content">
                                                <div className="bs-example" data-example-id="carousel-with-captions">
                                                    <div className="carousel slide" id={estate.createTime} data-ride="carousel" name={this.props.estate._id}>
                                                        <div className="carousel-inner" role="listbox">
                                                            {this.ImageSlideinModal(estate.url)}
                                                        </div>
                                                        <a className="control control-prev" href={`#` + estate.createTime} role="button" data-slide="prev">
                                                            <i className="fa fa-angle-left" />
                                                        </a>
                                                        <a className="control control-next" href={`#` + estate.createTime} role="button" data-slide="next">
                                                            <i className="fa fa-angle-right" />
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="description">
                                                    <h3>Mô tả chi tiết</h3>
                                                    <p>{estate.info.length > 300 ? estate.info.slice(0, 300) + '...' : estate.info}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-7 modal-right">
                                            <div className="modal-right-content bg-white">
                                                <strong className="price">
                                                    {estate.price >= 1000 && estate.statusProject === 1 ? (estate.price / 1000).toFixed(2) + ' tỷ VNĐ' : estate.price + ' ' + estate.unit}
                                                </strong>
                                                <section>
                                                    <h3>Thông tin liên hệ</h3>
                                                    <div className="features">
                                                        <ul className="bullets">
                                                            <li><i className="fa fa-user" />Tên người liên hệ: {estate.fullname}</li>
                                                            <li><i className="fa fa-phone" />SĐT: {estate.phone}</li>
                                                            <li><i className="fa fa-envelope" />Email: {estate.email}</li>
                                                            <li><i className="fa fa-address-card" />Địa chỉ: {estate.address}</li>

                                                        </ul>
                                                    </div>
                                                </section>
                                                <section>
                                                    <h3>Tổng quan</h3>
                                                    <dl>
                                                        <dt>Diện tích</dt>
                                                        <dd>{estate.area + ' m2'}</dd>
                                                        <dt>Nhà đầu tư</dt>
                                                        <dd>{estate.investor}</dd>
                                                        <dt>Giá</dt>
                                                        <dd>{estate.price >= 1000 && estate.statusProject === 1 ? (estate.price / 1000).toFixed(2) + ' tỷ VNĐ' : estate.price + ' ' + estate.unit}</dd>
                                                    </dl>
                                                </section>
                                                {/* <section>
                                                    <h3>Last Review</h3>
                                                    <div className="ratings" data-rating={5}>
                                                        <span>
                                                            <i className="fa fa-star s1 active" data-score={1} />
                                                            <i className="fa fa-star s2 active" data-score={2} />
                                                            <i className="fa fa-star s3 active" data-score={3} />
                                                            <i className="fa fa-star s4 active" data-score={4} />
                                                            <i className="fa fa-star s5 active" data-score={5} />
                                                        </span>
                                                    </div>
                                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's </p>
                                                </section> */}
                                                {/* <Link to={`/properties/${estate._id}`} data-dismiss="modal">
                                                    <a className="btn button-sm button-theme">Xem chi tiết</a>
                                                </Link> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
