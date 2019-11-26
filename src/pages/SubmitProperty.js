/* eslint-disable */
import React, { Component } from 'react';
import Login from '../pages/Login'
import Footer from '../components/Footer';
import { connect } from 'react-redux';
import * as actions from '../actions/request';
import MainHeader from '../components/MainHeader';
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import { authHeader } from '../constants/authHeader';
import MapSearching from '../components/Map/MapSearching'
import { Button, Image } from 'react-bootstrap'
import { message, Modal  } from 'antd'
import moment from 'moment'
import LoginModal from '../components/LoginModal'
import AddressData from '../countries-flat.json'
import Dropzone from 'react-dropzone'
import request from 'superagent'
import * as config from '../constants/Config'
import {SuggestionDescription} from '../constants/submitProperty'
const Types = [
    { value: '1', label: 'Chung cư. căn hộ' },
    { value: '2', label: 'Nhà ở' },
    { value: '3', label: 'Đất' },
    { value: '4', label: 'Văn phòng, mặt bằng kinh doanh' },

];

const Status = [
    { value: '1', label: 'Bất động sản bán' },
    { value: '3', label: 'Bất động sản thuê' },

];

const Units = {
    1: [
        { value: '1', label: "Triệu" }
    ],
    3: [
        { value: '1', label: 'Triệu/tháng' },
        { value: '2', label: 'Triệu/năm' },
        { value: '3', label: 'Triệu/m2/tháng' },
        { value: '4', label: 'Trăm nghìn/m2/tháng' },
    ]
};

const CLOUDINARY_UPLOAD_PRESET = 'nn6imhmo';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dne3aha8f/image/upload/w_710,h_500';
const confirm = Modal.confirm;

class SubmitProperty extends Component {
    constructor() {
        super();
        this.state = {
            tags: [],
            selectedOption: null,
            status: '',
            type: Types[0].value,
            area: '',
            price: '',
            name: '',
            description: '',
            investor: '',
            loading: false,
            toastError: '',
            url: [],
            previewList: [],
            imagesToUpload: [],
            publicId: [],
            previewVisible: false,
            previewImage: '',
            contactname: '',
            contactphonenumber: '',
            contactemail: '',
            visible: false,
            addressList: [],
            city: '',
            ward: '',
            state: '',
            mapPosition: {
                lat: 10.7625626,
                lng: 106.6805316
            },
            markerPosition: {
                lat: 10.7625626,
                lng: 106.6805316
            },
            isShowUnit: false,
            isShowCodeModal: false,
            units: []
        }
    }

    handleCancel = () => this.setState({ previewVisible: false })

    onHandleChangeAddress = (event) => {
        var name = event.target.name
        var value = event.target.value
        this.setState({
            [name]: value
        })
    }
    
    onHandleChange = (event) => {
        let target = event.target
        let name = target.name
        let value = target.value
        this.setState({
            [name]: value,
            units: Units[value]
        })
    }

    onSubmit = async(e) => {
        e.preventDefault()
        if (localStorage.getItem('res') === undefined || localStorage.getItem('res') === null) {
            await message.warning("Bạn cần phải đăng nhập trước khi đăng bài!")
            return <LoginModal visible={true} />
        }
        else {
            await this.setState({ loading: true })
            await this.onUploadingImages(this.state.imagesToUpload)
            let ownerID = JSON.parse(localStorage.getItem('res')).user._id
            let info = {
                name: document.getElementById("name").value,
                investor: document.getElementById('investor').value,
                price: document.getElementById('price').value,
                unit: document.getElementById('unit').value,
                area: document.getElementById('area').value,
                address: this.props.address.unknownAddress === '' ? localStorage.getItem('defaultAddress') : this.props.address.unknownAddress,
                type: document.getElementById('type').value,
                info: document.getElementById('description').value,
                lat: this.props.address.markerPosition === undefined ? 10.7625626 : this.props.address.markerPosition.lat,
                long: this.props.address.markerPosition === undefined ? 106.6805316 : this.props.address.markerPosition.lng,
                ownerid: ownerID,
                statusProject: document.getElementById('status').value,
                createTime: moment().unix(),
                updateTime: moment().unix(),
                url: this.state.url,
                publicId: this.state.publicId,
                fullname: document.getElementById('contactname').value,
                phone: document.getElementById('contactphonenumber').value,
                email: document.getElementById('contactemail').value,
                avatar: JSON.parse(localStorage.getItem('res')).user.avatar === undefined ? localStorage.getItem('avatar') : JSON.parse(localStorage.getItem('res')).user.avatar,
                codelist: this.state.tags
            }
            // console.log(info);
            await this.setState({ loading: true })
            await axios.post(`${config.API_URL}/projects/`, info, { headers: authHeader() })
                .then(async res => {
                    // console.log(res);
                    if (res.status === 201) {
                        await message.success('Đăng bài thành công! Bài đăng sẽ được kiểm duyệt trong vòng 2 ngày!', 4);
                        await this.props.history.push(`/myproperties`)
                    }
                    else if (res.status === 203) {
                        return message.error('Tài khoản của bạn đã đạt giới hạn đăng bài (5 bài). Vui lòng upgrade tài khoản để đăng nhiều hơn!')
                    }
                    else if (res.status === 204) {
                        return message.error('Tài khoản của bạn đã đạt giới hạn bài đăng (40 bài)')
                    }
                    else return message.error('Đăng bài thất bại!');
                });
        }
        await this.setState({ loading: false })
    }

    getUrlList = (urlArray, publicIdArray) => {
        this.setState({
            url: urlArray,
            publicId: publicIdArray
        })
    }
    showWidget = () => {
        let urlArray = []
        let publicIdArray = []
        window.cloudinary.openUploadWidget({
            cloudName: "dne3aha8f",
            uploadPreset: "dels6a22",
            googleApiKey: "AIzaSyC1xuTe6sMtQCoQZI0X3lkeRZHyyI7CReQ",
            searchBySites: ["all"],
            searchByRights: true,
            maxFiles: 5,
            cropping: false,
            maxFileSize: 500000,
            theme: "white",
            showPoweredBy: false,
        },
            (error, result) => { this.checkUploadResult(result, urlArray, publicIdArray) })
    }
    checkUploadResult = (resultEvent, urlArray, publicIdArray) => {
        if (resultEvent.event === 'success') {
            urlArray.push(resultEvent.info.secure_url)
            publicIdArray.push(resultEvent.info.public_id)
        }
        this.getUrlList(urlArray, publicIdArray)
    }

    parseStateData = (AddressData) => {
        var result = []
        AddressData.map((data => {
            if (data.country === 'Vietnam' && result.indexOf(data.state) === -1) {
                result.push(data.state)
            }
        }))
        return result.sort()
    }

    parseCityData = (AddressData, stateValue) => {
        var result = []
        AddressData.map(data => {
            if (data.country === 'Vietnam' && data.state === stateValue && result.indexOf(data.city) === -1) {
                result.push(data.city)
            }
        })
        return result.sort()
    }

    parseWardData = (AddressData, stateValue, cityValue) => {
        var result = []
        AddressData.map(data => {
            if (data.country === 'Vietnam' && data.state === stateValue && data.city === cityValue && result.indexOf(data.ward) === -1) {
                result.push(data.ward)
            }
        })
        return result.sort()
    }

    onOpenCodeModal = () => {
        this.setState({ isShowCodeModal: true })
    }

    onHandleCancelCodeModal = () => {
        this.setState({ isShowCodeModal: false })
    }

    onHandleOk = () => {
        // console.log(this.state.tags)
        this.setState({ isShowCodeModal: false })
    }
    removeTag = (i) => {
        const newTags = [...this.state.tags];
        newTags.splice(i, 1);
        this.setState({ tags: newTags });
    }

    inputKeyDown = (e) => {
        const val = e.target.value;
        if (e.key === 'Enter' && val) {
            if (this.state.tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
                return;
            }
            this.setState({ tags: [...this.state.tags, val] });
            this.tagInput.value = null;
        } else if (e.key === 'Ba ckspace' && !val) {
            this.removeTag(this.state.tags.length - 1);
        }
    }

    onHandlePreviewImage = (event) => {
        this.setState({ previewVisible: true, previewImage: event.target.src })
    }

    onHandleCancelImage = () => {
        this.setState({ previewVisible: false })
    }

    onUploadingImages = async (list) => {
        // console.log(list)
        await Promise.all(list.map(async file => {
            await
                request
                    .post(CLOUDINARY_UPLOAD_URL)
                    .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                    .field('file', file)
                    .then(response => {
                        // console.log(response)
                        this.setState({
                            url: this.state.url.concat(response.body.secure_url),
                            publicId: this.state.publicId.concat(response.body.public_id)
                        })
                    })
                    .catch(err => message.error(`Có lỗi xảy ra: ${err}`))
        }))
        this.setState({ imagesToUpload: [] })
    }

    handleUpload(files) {
        files.map(file => {
            // console.log(file)
            let reader = new FileReader()
            reader.onloadend = () => {
                // console.log(reader.result)
                this.setState({
                    previewList: [...this.state.previewList, reader.result],
                    imagesToUpload: [...this.state.imagesToUpload, file]
                })
                // console.log(reader.result, file)
            }
            reader.readAsDataURL(file);
        })
    }

    onShowImageBeforeUpload = (array) => {
        let result = []
        if (array && array.length > 0) {
            for (var i = 0; i < array.length; i++) {
                result.push(<div className="col-md-2" key={i}>
                    <Image
                        className="imagepreview"
                        src={array[i]}
                        thumbnail
                        style={{ width: "150px", height: "100px", cursor: "pointer" }}
                        onClick={this.onHandlePreviewImage}
                    >
                    </Image>
                    <button
                        type="button"
                        className="close"
                        aria-label="Close"
                        style={{ top: "0px", left: "-20px", position: "relative", color: "#0A10C8" }}
                        onClick={this.showDeleteConfirm} value={i}>
                        x
                    </button>
                </div>)
            }
        }
        else return null
        return result
    }

    showDeleteConfirm = (event) => {
        var index = event.target.value
        confirm({
            title: 'Bạn muốn xóa hình này không?',
            okText: 'Có',
            okType: 'danger',
            cancelText: 'Trở lại',
            onOk: () => {
                // console.log('OK');
                this.state.imagesToUpload.splice(index, 1)
                this.state.previewList.splice(index, 1)
                this.setState({
                    previewList: this.state.previewList,
                    imagesToUpload: this.state.imagesToUpload,
                })
            },
            onCancel() {
                // console.log('Cancel');
            },
        });
    }
    render() {
        var { city, state, tags, loading } = this.state;
        var stateList = this.parseStateData(AddressData)
        var cityList = this.parseCityData(AddressData, state)
        var wardList = this.parseWardData(AddressData, state, city)
        return (
            localStorage.getItem('res') ?
            <div>
                <MainHeader />
                {
                    /* Sub banner start */
                }
                <div className="sub-banner overview-bgi">
                    <div className="overlay">
                        <div className="container">
                            <div className="breadcrumb-area">
                                <h1>Đăng bài</h1>
                                <ul className="breadcrumbs">
                                    <li>
                                        <Link to="/">Trang chủ</Link>
                                    </li>
                                    <li className="active">Đăng bài</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    /* Sub Banner end */
                }

                <div className="content-area-7 submit-property">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="submit-address">
                                    <form onSubmit={this.onSubmit}>
                                        <div className="main-title-2">
                                            <h1>
                                                <span>Thông tin</span> cơ bản
                                            </h1>
                                        </div>
                                        <div className="search-contents-sidebar mb-30">
                                            <div className="row">
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="form-group">
                                                        <label>Tên bài đăng</label>
                                                        <input
                                                            type="text"
                                                            className="input-text"
                                                            name="name"
                                                            id="name"
                                                            placeholder="Tên bài đăng"
                                                            maxLength={100}
                                                            // onChange={this.onHandleChange}
                                                            required
                                                        />
                                                        {/* <Form.Control type="email" placeholder="Enter email" required=""/> */}
                                                        {/* <Form.Text className="text-muted" style={{ color: "#827f7f" }}>Tên bài đăng không bao gồm các kí tự đặc biệt (~!@#,...)</Form.Text> */}
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="form-group">
                                                        <label>Nhà đầu tư</label>
                                                        <input
                                                            type="text"
                                                            className="input-text"
                                                            name="investor"
                                                            id="investor"
                                                            placeholder="Nhà đầu tư"
                                                            // onChange={this.onHandleChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-3 col-sm-6">
                                                    <div className="form-group">
                                                        <label>Trạng thái</label>
                                                        <select className="form-control"
                                                            name="status"
                                                            id="status"
                                                            // defaultValue={Status[0].value}
                                                            onChange={this.onHandleChange}
                                                        >
                                                            <option style={{ display: "none" }}>---Chọn trạng thái---</option>
                                                            {Status.map((status, index) => <option key={index} value={status.value}>{status.label}</option>)}

                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-3 col-sm-6">
                                                    <div className="form-group">
                                                        <label>Loại</label>
                                                        <select className="form-control"
                                                            name="type"
                                                            id="type"
                                                        // defaultValue={Types[0].value}
                                                        // onChange={this.onHandleChange}
                                                        >
                                                            <option style={{ display: "none" }}>---Chọn loại---</option>
                                                            {Types.map((type, indexx) => <option key={indexx} value={type.value}>{type.label}</option>)}

                                                        </select>
                                                    </div>
                                                </div>


                                                <div className="col-md-2 col-sm-6">
                                                    <div className="form-group">
                                                        <label>Giá</label>
                                                        <input
                                                            type="text"
                                                            className="input-text"
                                                            name="price"
                                                            id="price"
                                                            placeholder="Nhập giá bán"
                                                            // onChange={this.onHandleChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-2 col-sm-6">
                                                    <div className="form-group">
                                                        <label>Đơn vị</label>
                                                        <select className="form-control"
                                                            name="unit"
                                                            id="unit"
                                                            placeholder="Chọn đơn vị"
                                                        // defaultValue={}
                                                        >
                                                            <option style={{ display: "none" }}>---Chọn đơn vị---</option>
                                                            {this.state.units.map((single, indexx) => <option key={indexx} value={single.label}>{single.label}</option>)}

                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-2 col-sm-6">
                                                    <div className="form-group">
                                                        <label>Diện tích (m2)</label>
                                                        <input
                                                            type="text"
                                                            className="input-text"
                                                            name="area"
                                                            id="area"
                                                            placeholder="Diện tích"
                                                            // onChange={this.onHandleChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 col-sm-12">
                                                <div className="form-group">
                                                    <Button variant="primary" style={{ display: "flex", alignContent: "center", justifyContent: "center", fontSize: "12px" }} onClick={this.onOpenCodeModal}>
                                                        Nhấn vào đây để nhập mã số căn hộ/phòng
                                                   </Button>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="main-title-2">
                                            <h1>
                                                <span>Địa</span> chỉ
                                            </h1>
                                        </div>
                                        <div className="row mb-30">
                                            <div className="col-md-6">
                                                <div className="form-group" style={{ marginBottom: '0px' }}>
                                                    <label>Nhập số nhà/đường</label>
                                                    <input
                                                        type="text"
                                                        className="input-text"
                                                        name="street"
                                                        id="street"
                                                        placeholder="Nhập số nhà/đường"
                                                        
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group" style={{ marginBottom: '0px' }}>
                                                    <label>Chọn tỉnh</label>
                                                    <select className="form-control"
                                                        name="state"
                                                        id="state"
                                                        required
                                                        onChange={this.onHandleChangeAddress}
                                                        style={{ overflowY: "scroll" }}
                                                    >
                                                        {stateList.map((single, index) => <option key={index} value={single}>{single}</option>)}

                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mb-30">
                                            <div className="col-md-6">
                                                <div className="form-group" style={{ marginBottom: '0px' }}>
                                                    <label>Chọn thành phố</label>
                                                    <select className="form-control"
                                                        name="city"
                                                        id="city"
                                                        required
                                                        onChange={this.onHandleChangeAddress}
                                                        style={{ overflowY: "scroll" }}
                                                    >
                                                        {cityList.map((single, indexx) => <option key={indexx} value={single}>{single}</option>)}
                                    
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group" style={{ marginBottom: '0px' }}>
                                                    <label>Chọn xã/huyện</label>
                                                    <select className="form-control"
                                                        name="ward"
                                                        id="ward"
                                                        required
                                                        onChange={this.onHandleChangeAddress}
                                                    >
                                                        {wardList.map((single, indexx) => <option key={indexx} value={single}>{single}</option>)}

                                                    </select>
                                                </div>
                                            </div>
                                        </div> */}
                                        <div style={{ paddingBottom: '80px' }}>
                                            <MapSearching
                                                google={this.props.google}
                                                center={{ lat: 10.7625626, lng: 106.6805316 }}
                                                height='300px'
                                                zoom={15}
                                            />
                                        </div>
                                        <div className="main-title-2">
                                            <h1>
                                                Thông tin<span> chi tiết</span>
                                            </h1>
                                        </div>
                                        <div className="row mb-30">
                                            <div className="col-md-12">
                                                <div className="form-group" style={{ marginBottom: '0px' }}>
                                                    <label>Nội dung bài đăng <i>(Bạn có thể tham khảo các gợi ý của chúng tôi)</i></label>
                                                    <textarea
                                                        className="input-text"
                                                        name="description"
                                                        id="description"
                                                        placeholder="Nhập nội dung bài đăng ở đây..."
                                                        defaultValue={SuggestionDescription}
                                                        maxLength={3000}
                                                        // onChange={this.onHandleChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="main-title-2">
                                            <h1>
                                                Thông tin<span> liên hệ</span>
                                            </h1>
                                        </div>
                                        <div className="search-contents-sidebar mb-30">
                                            <div className="row">
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="form-group">
                                                        <label>Tên người liên hệ</label>
                                                        <input
                                                            type="text"
                                                            className="input-text"
                                                            name="contactname"
                                                            id="contactname"
                                                            placeholder="Tên người liên hệ"
                                                            // onChange={this.onHandleChange}
                                                            maxLength={50}
                                                            required
                                                        />

                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="form-group">
                                                        <label>Số điện thoại</label>
                                                        <input
                                                            type="tel"
                                                            className="input-text"
                                                            name="contactphonenumber"
                                                            id="contactphonenumber"
                                                            placeholder="Số điện thoại"
                                                            pattern="[0]{1}[0-9]{9}"
                                                            // onChange={this.onHandleChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="form-group">
                                                        <label>Địa chỉ email</label>
                                                        <input
                                                            type="email"
                                                            className="input-text"
                                                            name="contactemail"
                                                            id="contactemail"
                                                            placeholder="Email"
                                                        // onChange={this.onHandleChange}

                                                        />

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="row">
                                            <div className="col-md-12">
                                                <Button variant="info" style={{ float: "right", fontSize: '12px', marginTop: "0px" }} onClick={this.showWidget}>Đăng hình kèm theo</Button>
                                            </div>
                                        </div> */}
                                        <div className="row">
                                            <div className="clearfix">
                                                <div className="col-md-12 col-lg-12 col-xs-12">
                                                    <div className="photoUpload">
                                                        <Dropzone
                                                            onDrop={this.handleUpload.bind(this)}
                                                            multiple={true}
                                                            accept="image/*">
                                                            {({ getRootProps, getInputProps }) => {
                                                                return (
                                                                    <div
                                                                        {...getRootProps()}
                                                                        style={{ border: "1px solid #95c41f", borderRadius: "5px", float: "right" }}
                                                                    >
                                                                        <input {...getInputProps()} />
                                                                        {
                                                                            <span style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "10px 20px 10px 20px" }}><i className="fa fa-upload" /> Tải ảnh lên</span>
                                                                        }
                                                                    </div>
                                                                )
                                                            }}
                                                        </Dropzone>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="col-md-8 col-lag-8 col-xs-12"> */}
                                        <div className="row">
                                            {/* <div className="clearfix"> */}
                                            {(this.state.previewList && this.state.previewList.length > 0) ? this.onShowImageBeforeUpload(this.state.previewList) : null}
                                            {/* </div> */}
                                        </div>
                                        {/* </div> */}
                                        <br></br>
                                        <div className="row">
                                            <Button type="submit" variant="success" style={{ fontSize: "16px", padding: "15px 30px 15px 30px" }} className="btn button-md button-theme" disabled={loading} name='submitProperty'>
                                                {loading && (
                                                    <i
                                                        className="fa fa-refresh fa-spin"
                                                        style={{ marginRight: "5px" }}
                                                    />
                                                )}
                                                {loading && <span>Đang đăng bài...</span>}
                                                {!loading && <span>Đăng bài</span>}
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    /* Submit Property end */
                }
                <Footer />
                <Modal
                    title="Nhập mã số"
                    style={{ top: 20 }}
                    visible={this.state.isShowCodeModal}
                    onOk={this.onHandleOk}
                    onCancel={this.onHandleCancelCodeModal}
                    footer={[
                        <Button key="back" onClick={this.onHandleCancelCodeModal}>
                            Trở về
                        </Button>,
                        <Button key="submit" type="primary" onClick={this.onHandleOk}>
                            Chấp nhận
                        </Button>,
                    ]}
                >
                    <div className="input-tag"
                        style={{
                            background: "white",
                            border: "1px solid #d6d6d6",
                            borderRadius: "2px",
                            display: "flex",
                            flexWrap: "wrap",
                            padding: "5px 5px 0"
                        }}
                    >
                        <ul
                            className="input-tag__tags"
                            style={{
                                display: "inline-flex",
                                flexWrap: "wrap",
                                margin: "0",
                                padding: "0",
                                width: "100%"
                            }}
                        >
                            {tags.map((tag, i) => (
                                <li
                                    key={tag}
                                    style={{
                                        alignItems: "center",
                                        background: "#85A3BF",
                                        borderRadius: "2px",
                                        color: "white",
                                        display: "flex",
                                        fontWeight: "300",
                                        listStyle: "none",
                                        marginBottom: "5px",
                                        marginRight: "5px",
                                        padding: "5px 10px"
                                    }}
                                >
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => { this.removeTag(i); }}
                                        style={{
                                            alignItems: "center",
                                            appearance: "none",
                                            background: "#333333",
                                            border: "none",
                                            borderRadius: "50%",
                                            color: "white",
                                            cursor: "pointer",
                                            display: "inline-flex",
                                            fontSize: "12px",
                                            height: "15px",
                                            justifyContent: "center",
                                            lineHeight: "0",
                                            marginLeft: "8px",
                                            transform: "rotate(45deg)",
                                            width: "15px"
                                        }}
                                    >
                                        +
                            </button>
                                </li>
                            ))}
                            <li
                                className="input-tag__tags__input"
                                style={{
                                    background: "none",
                                    flexGrow: "1",
                                    padding: "0"
                                }}
                            >
                                <input
                                    type="text"
                                    onKeyDown={this.inputKeyDown}
                                    ref={c => { this.tagInput = c; }}
                                    style={{ border: "none", width: "100%" }}
                                />

                            </li>
                        </ul>
                    </div>
                </Modal>
                <Modal visible={this.state.previewVisible} footer={null} onCancel={this.onHandleCancelImage} width="800px" style={{ height: "500px" }}>
                    <img alt="example" src={this.state.previewImage} style={{ width: "750px", height: "500px" }} />
                </Modal>
            </div> : <Redirect to={"/notilogin"}/>
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
        user: state.user,
        address: state.address
    }
}
export default connect(mapStateToProp, mapDispathToProp)(SubmitProperty);