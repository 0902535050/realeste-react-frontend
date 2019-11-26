import React, { Component } from "react";
import Sidebar from "./Sidebar";
import { connect } from "react-redux";
import Comments from './Comments'
import * as actions from '../../actions/request'
import * as currentEstateAction from '../../actions/index'
import * as transAction from '../../actions/transactionRequest'
import MapOfDetailEstate from "./MapOfDetailEstate";
import { Rate, message, Button, Pagination, Modal, Form, InputNumber, Input, Icon } from 'antd'
import moment from 'moment'
// import Chart from 'react-apexcharts'
import Login from '../../pages/Login'

const pageSize = 5
const desc = ['Rất tệ', 'Tệ', 'Bình thường', 'Tốt', 'Tuyệt vời'];

class PropertiesDetail extends Component {
    constructor(props) {
        super(props);
        // console.log(props)
        this.props.onGetEstateDetail(this.props.id)
        this.state = {
            selectedOption: null,
            starValue: 0,
            content: '',
            isFollow: false,
            requestVisible: false,
            current: 1,
            estate: this.props.info,
            options: {
                annotations: {
                    position: 'front'
                },
                chart: {
                    fontFamily: 'sans-serif',
                    offsetX: 30,
                    offsetY: 30,
                    type: 'donut'
                },
                plotOptions: {
                    pie: {
                        expandOnClick: true,
                        donut: {
                            size: '50%',
                            labels: {
                                show: true,
                                name: {
                                    fontSize: '15px',
                                    fontFamily: 'sans-serif',
                                    offsetY: -10
                                },
                                value: {
                                    show: true,
                                    fontSize: '20px',
                                    fontFamily: 'sans-serif',
                                    offsetY: 10,
                                    formatter: function (val) {
                                        return val
                                    }
                                },
                                total: {
                                    label: 'Tổng cộng',
                                    color: '#373d3f',
                                    formatter: function (w) {
                                        return w.globals.seriesTotals.reduce((a, b) => {
                                            return a + b
                                        }, 0)
                                    }
                                },
                            }
                        },
                    },
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }],
                labels: desc
            },
            series: [44, 55, 41, 17, 15],

        };
    }
    handleChange = selectedOption => {
        this.setState({ selectedOption });
    };
    handleChangeRating = (starvalue) => {
        this.setState({ starValue: starvalue })
    }
    componentDidMount = () => {
        this.props.onGetCommentsById(this.props.id)
        this.props.onGetEstateDetail(this.props.id)
        if (localStorage.getItem('res') || localStorage.getItem('company'))
            this.props.onGetFollowingList()
    }

    onShowImagesThumbnail = (images) => {
        if (images === undefined || images.length === 0) {
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
                            style={{ width: "100%", height: "500px" }}
                            alt="Chevrolet Impala"
                        />
                    </div>
                );
            });
        }
        return result;
    }
    onShowImagesSmall = (images) => {
        if (images === undefined || images.length === 0) {
            var string = "Bài đăng này hiện không có hình nào!"
            return <span>{string}</span>
        }
        var result = null;
        if (images.length > 0) {
            result = images.map((image, index) => {
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
        if (images === undefined || images.length === 0)
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

    onPostingComments = (info) => {
        // e.preventDefault()
        if (localStorage.getItem('res') === undefined || localStorage.getItem('res') === null) {
            message.warning("Bạn phải đăng nhập trước để bình luận!")
            return (
                <Login />
            )
        }
        if (this.state.starValue === 0) {
            message.error("Bạn chưa đánh giá mà phải hơm :D")
            return null
        }

        var abc = document.getElementById("comment").value
        // console.log(abc)
        var commentInfoToPost = {
            projectid: info._id,
            user: info.ownerid,
            createTime: moment().unix(),
            updateTime: moment().unix(),
            content: abc,
            star: this.state.starValue
        }
        var user = {
            avatar: JSON.parse(localStorage.getItem('res')).user.avatar,
            email: JSON.parse(localStorage.getItem('res')).user.email,
            fullname: JSON.parse(localStorage.getItem('res')).user.fullname,
            id: JSON.parse(localStorage.getItem('res')).user._id
        }
        this.props.onPostComment(commentInfoToPost, user)
    }
    onHandleChangeComment = () => {
        // this.setState({[event.target.name]: event.target.value})
        var comment = document.getElementById("comment").value
        return comment
    }

    onHandleFollowing = async (estateInfo, check) => {
        if (localStorage.getItem('res') === null) {
            message.warning('Bạn cần đăng nhập trước!')
            return <Login />
        }
        var followInfo = {
            projectid: estateInfo._id,
            createTime: moment().unix(),
            id: estateInfo.ownerid,
            fullname: JSON.parse(localStorage.getItem('res')).user.fullname,
        }
        var unfollowInfo = {
            projectid: estateInfo._id
        }
        if (check === false) {
            this.props.onFollowProject(followInfo, estateInfo)
            // console.log(this.props.follow)
        }
        else if (check === true) {
            await this.props.onGetFollowingList()
            await this.props.onUnfollowProject(unfollowInfo)
            // console.log(this.props.follow)
        }
        else return null

    }

    onShowRequestModal = () => {
        if (localStorage.getItem("res") === null)
            return message.warning("Vui lòng đăng nhập trước!")
        this.setState({ requestVisible: true })
    }

    onHandleCancelRequestModal = () => {
        this.setState({ requestVisible: false })
    }

    onCheckingOfferPrice = (rule, value, callback) => {
        if (Number(value) <= Number(this.props.info.price))
            callback()
        else if (Number(value) > Number(this.props.info.price))
            callback(`Số tiền bạn nhập phải nhỏ hơn giá trị của bất động sản (${this.props.info.price} ${this.props.info.unit})!`)
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        if (prevProps.estateInfo.lat === undefined && this.props.estateInfo.lat) {
            // console.log(this.props.estateInfo)
            return this.props.estateInfo.lat;
        }
        else return null
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (snapshot) {
            var savedData = {
                lat: this.props.estateInfo.lat,
                long: this.props.estateInfo.long,
                radius: 5
            }
            this.props.onSaveCurrentProject(savedData)
            // console.log(savedData)
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                var waitingInfo = {
                    projectid: this.props.info._id,
                    createTime: moment().unix(),
                    money: values.offerPrice,
                    description: document.getElementById("moreRequest").value
                }
                // console.log(waitingInfo)
                await this.props.onSendingRequest(waitingInfo)
                await this.setState({ requestVisible: false })
            }
        });
    };
    onChange = (page) => {
        this.setState({ current: page })
    }
    render() {
        const { getFieldDecorator } = this.props.form
        let { info, comments, follow, related } = this.props;
        // console.log(this.props)
        let check = false
        if (follow && follow.length > 0 && info) {
            for (var i = 0; i < follow.length; i++) {
                if (follow[i].project && follow[i].project._id === this.props.id) {
                    check = true
                }
            }
        }
        const { starValue } = this.state
        return (
            <div>
                <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                    {/* Header */}
                    <div className="heading-properties clearfix sidebar-widget">
                        <div className="pull-left col-lg-8 col-md-8 col-sm-10 col-xs-10">
                            <h3>
                                {info.name}
                            </h3>
                            <p>
                                <i className="fa fa-map-marker" />
                                {info.address}
                            </p>
                            <p>
                                <i className="fa fa-calendar-check-o" />
                                {moment.unix(info.updateTime).format('DD/MM/YYYY')}
                            </p>
                        </div>
                        <div className="pull-right">
                            <h3>
                                <span>
                                    {info.price >= 1000
                                        ? Number((info.price / 1000).toFixed(1)) + ' ' + ((info.statusProject === 1 && info.price >= 1000) ? 'Tỉ' : info.unit)
                                        : info.price + ' ' + ((info.statusProject === 1 && info.price >= 1000) ? 'Tỉ' : info.unit)}
                                </span>
                            </h3>
                            <i className={check === true ? "fa fa-star" : "fa fa-star-o"}
                                style={check === true
                                    ? { cursor: "pointer", color: "red", fontWeight: "bold", float: "right", fontSize: "18px" }
                                    : { cursor: "pointer", float: "right", fontSize: "18px" }
                                }
                                id="follow"
                                onClick={() => this.onHandleFollowing(info, check)}
                            >
                                <span style={{ marginLeft: "5px" }}>{check === true ? "Bỏ yêu thích" : "Yêu thích"}</span>
                            </i>
                        </div>
                    </div>
                    {/* Properties detail slider start */}
                    <div className="Properties-details-section sidebar-widget">
                        <div className="properties-detail-slider simple-slider mb-40">
                            <div
                                id="carousel-custom"
                                className="carousel slide"
                                data-ride="carousel"
                            >
                                <div className="carousel-outer">
                                    {/* Wrapper for slides */}
                                    <div className="carousel-inner">
                                        {this.onShowImagesThumbnail(info.url)}
                                    </div>
                                    {/* Controls */}
                                    {this.onShowImageSlide(info.url)}
                                </div>
                                {/* Indicators */}
                                <ol className="carousel-indicators thumbs visible-lg visible-md">
                                    {this.onShowImagesSmall(info.url)}
                                </ol>
                            </div>
                        </div>
                        {/* Properties detail slider end */}

                        {/* Property description start */}
                        <div className="panel-box properties-panel-box Property-description">
                            <ul className="nav nav-tabs">
                                <li className="active col-md-4 col-lg-4 col-xs-6">
                                    <a href="#tab1default" data-toggle="tab" aria-expanded="true">
                                        Mô tả chi tiết
                                    </a>
                                </li>
                                <li className="col-md-4 col-lg-4 col-xs-6">
                                    <a
                                        href="#tab2default"
                                        data-toggle="tab"
                                        aria-expanded="false"
                                    >
                                        Thông tin liên hệ
                                    </a>
                                </li>
                                <li className="col-md-4 col-lg-4 col-xs-12" style={{ top: "4px", left: "20px" }}>
                                    <div className="form-group mb-0">
                                        <button className="transaction-button" onClickCapture={this.onShowRequestModal} style={{ backgroundColor: "#E70919" }}>Tiến hành giao dịch</button>
                                    </div>
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
                                            <p style={{whiteSpace: 'pre-wrap',WebkitBoxOrient: 'vertical', overflow:'scroll'}}>{info.info}</p>
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
                                                    <div className="col-md-3 col-sm-3 col-xs-12">
                                                        <ul className="condition">
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
                                                    <div className="col-md-9 col-sm-9 col-xs-12">
                                                        <ul className="condition" style={{ fontWeight: "bold" }}>
                                                            <li>
                                                                {info.fullname === null ? 'Không có' : info.fullname}
                                                            </li>
                                                            <li>
                                                                {info.phone === null ? 'Không có ' : info.phone}
                                                            </li>
                                                            <li>
                                                                {info.email === null ? 'Không có ' : info.email}
                                                            </li>
                                                            <li>
                                                                {info.address === null ? 'Không có ' : info.address}
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Properties condition end */}
                                        </div>


                                        <div className="tab-pane fade" id="tab5default">
                                            {/* Inside properties start  */}
                                            <div className="inside-properties">
                                                {/* Main Title 2 */}
                                                <div className="main-title-2">
                                                    <h1>
                                                        <span>Video</span>
                                                    </h1>
                                                </div>
                                                <iframe
                                                    title="."
                                                    src="https://www.youtube.com/embed/5e0LxrLSzok"
                                                    allowFullScreen
                                                />
                                            </div>
                                            {/* Inside properties end */}
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
                            <MapOfDetailEstate info={info} />
                        </div>
                    </div>
                    {/* Location end */}
                    {/* Properties details section start */}
                    <div className="Properties-details-section sidebar-widget">
                        {/* Properties comments start */}
                        <div className="properties-comments mb-40">
                            {/* Comments section start */}
                            <div className="comments-section">
                                {/* Main Title 2 */}
                                {/* <div className="main-title-2">
                                    <h1>
                                        <span>Bình luận và</span> đánh giá
                                    </h1>
                                </div>
                                <div className="row" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <Chart options={this.state.options} series={this.state.series} type="donut" width="400" />
                                </div> */}
                                <div className="main-title-2">
                                    <div className="pull-left">
                                        <h1>
                                            <span>Chi tiết</span> bình luận
                                    </h1>
                                    </div>
                                    <div className="pull-right">
                                        {comments.length > 0 ?
                                            <Pagination
                                                size="small"
                                                current={this.state.current}
                                                total={comments.length}
                                                onChange={this.onChange}
                                                pageSize={pageSize}
                                            /> : null}
                                    </div>
                                    <br></br>
                                </div>
                                <ul className="comments">
                                    {this.ShowComments(comments)}
                                </ul>
                            </div>
                            {/* Comments section end */}
                        </div>
                        {/* Properties comments end */}
                        {/* Contact 1 start */}
                        <div className="contact-1">
                            <div className="contact-form">
                                {/* Main Title 2 */}
                                <div className="main-title-2">
                                    <h1>
                                        <span>Đăng</span> bình luận
                                    </h1>
                                </div>
                                <form>
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                            <span>
                                                <Rate tooltips={desc} onChange={this.handleChangeRating} style={{ color: "yellow" }} className="ratingStar" />
                                                {starValue ? <span className="ant-rate-text">{desc[starValue - 1]}</span> : ''}
                                            </span>
                                        </div>
                                    </div>
                                    <br></br>
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div className="form-group message">
                                                <textarea
                                                    className="input-text"
                                                    id="comment"
                                                    name="content"
                                                    placeholder="Nhập bình luận vào đây..."
                                                    defaultValue={""}
                                                    onChange={this.onHandleChangeComment}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                            <div className="form-group send-btn mb-0">
                                                <Button type="primary" onClick={() => this.onPostingComments(info)}>Đăng bình luận</Button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {/* Contact 1 end */}
                    </div>
                    {/* Properties details section end */}
                </div>
                <Sidebar related={related} />
                <Modal
                    title="Gửi yêu cầu giao dịch"
                    style={{ top: 20 }}
                    visible={this.state.requestVisible}
                    // onOk={() => this.onSendingRequest(info._id)}
                    onCancel={this.onHandleCancelRequestModal}
                    footer={null}
                    closable={true}
                >
                    <Form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-md-12 col-lg-12 col-xs-12">
                                <Form.Item label={`Nhập mức giá mong muốn (đơn vị: ${info.unit})`}>
                                    {getFieldDecorator('offerPrice', {
                                        // trigger: 'onBlur',
                                        rules: [
                                            { required: true, message: 'Trường này chưa được nhập!' },
                                            // { validator: this.onCheckingOfferPrice }
                                        ],
                                    })(
                                        <InputNumber
                                            id="offerPrice"
                                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            style={{ width: "100%" }}
                                            onBlur={this.onChange}
                                        />,
                                    )}
                                </Form.Item>
                            </div>
                        </div>
                        <br></br>
                        <div className="row">
                            <div className="col-md-12 col-lg-12 col-xs-12">
                                <Form.Item label="Yêu cầu thêm (nếu có): ">
                                    <Input.TextArea
                                        id="moreRequest"
                                        style={{ width: "100%" }}
                                        placeholder="Thông tin thêm..."
                                        autosize={{ minRows: 2, maxRows: 6 }}
                                    >

                                    </Input.TextArea>
                                </Form.Item>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 col-lg-12 col-xs-12">
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" style={{ fontSize: "13px", float: "right" }}>
                                        Xác nhận
                                    </Button>
                                </Form.Item>
                            </div>
                        </div>
                    </Form>
                </Modal>
            </div >
        )
    }
    ShowComments = (comments) => {
        var result = null;
        if (comments.length === 0)
            result = "Bài đăng này hiện chưa có bình luận nào!"
        if (comments.length > 0) {
            var currentList = comments.slice((this.state.current - 1) * pageSize, this.state.current * pageSize)
            result = currentList.map((comment, index) => {
                // console.log(index)
                return (
                    <Comments key={index} comment={comment} />
                );
            });
        }
        return result;
    }
}
const mapDispathToProp = (dispatch) => {
    return {
        onGetCommentsById: (id) => dispatch(actions.actGetCommentsByIdRequest(id)),
        onPostComment: (data, user) => dispatch(actions.actPostingCommentRequest(data, user)),
        onFollowProject: (data, project) => dispatch(actions.actFollowProjectRequest(data, project)),
        onGetFollowingList: () => dispatch(actions.actGetFollowingListRequest()),
        onUnfollowProject: (data) => dispatch(actions.actUnfollowProjectRequest(data)),
        onSendingRequest: (data) => dispatch(transAction.actAddingWaitingRequest(data)),
        onSearchRelatedEstate: (data) => dispatch(actions.actSearchMapRequest(data)),
        onGetEstateDetail: (id) => dispatch(actions.actGetEstateRequest(id)),
        onSaveCurrentProject: (data) => dispatch(currentEstateAction.actSaveCurrentEstate(data))
    }
}
const mapStateToProp = (state) => {
    return {
        comments: state.comments,
        follow: state.follow,
        waiting: state.waiting,
        related: state.estates,
        estateInfo: state.estateInfo
    }
}

const WrappedFormPropertiesDetail = Form.create()(PropertiesDetail)
export default connect(mapStateToProp, mapDispathToProp)(WrappedFormPropertiesDetail);
