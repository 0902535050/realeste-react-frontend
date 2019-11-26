import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../actions/request';
// import axios from 'axios'
// import { authHeader } from '../../constants/authHeader';
// import Button from 'react-bootstrap/Button'
import { Image, Button } from 'react-bootstrap'
import { message, Modal } from 'antd'
import moment from 'moment'
import MapSearching from '../Map/MapSearching'
import MainHeader from '../MainHeader'
import Footer from '../Footer'
import { Link } from 'react-router-dom'
import Dropzone from 'react-dropzone'
import request from 'superagent'

// const Types = [
//     { value: '1', label: 'Chung cư. căn hộ' },
//     { value: '2', label: 'Nhà ở' },
//     { value: '3', label: 'Đất' },
//     { value: '4', label: 'Văn phòng, mặt bằng kinh doanh' },

// ];

// const Status = [
//     { value: '1', label: 'Bất động sản bán' },
//     { value: '3', label: 'Bất động sản thuê' },
// ];

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
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dne3aha8f/image/upload';
const confirm = Modal.confirm;

class EditUI extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            selectedOption: null,
            status: 0,
            type: 0,
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
            fullname: '',
            phone: '',
            email: '',
            createTime: 123,
            visible: false,
            visibleDeleteImage: false,
            estateInfo: {},
            lat: 0,
            long: 0,
            address: '',
            previewImage: false,
            previewUrl: '',
            currentIndexDeleteImage: null,
            test: null,
            avatar: '',
            _id: '',
            unit: '',
            units: [],
            isShowCodeModal: false,
        };
    }
    componentDidMount = async () => {
        await this.props.actGetEstateRequest(this.props.match.params.id)
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
    onHandlePreviewImage = (event) => {
        this.setState({ previewImage: true, previewUrl: event.target.src })
    }
    onHandleCancelImage = () => {
        this.setState({ previewImage: false })
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
                    url: [...this.state.url, reader.result],
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
                        onClick={this.showDeleteConfirm} value={array[i].search('res.cloudinary') !== -1 ? i : array[i]}>
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
        // console.log(index)
        this.state.imagesToUpload.map((image, key) => {
            if (image === index) {
                index = key
            }
        })
        confirm({
            title: 'Bạn muốn xóa hình này không?',
            okText: 'Có',
            okType: 'danger',
            cancelText: 'Trở lại',
            onOk: () => {
                // console.log('OK');
                this.state.imagesToUpload.splice(index, 1)
                this.state.previewList.splice(index, 1)
                this.state.url.splice(index, 1)
                this.state.publicId.splice(index, 1)
                this.setState({
                    previewList: this.state.previewList,
                    imagesToUpload: this.state.imagesToUpload,
                    url: this.state.url,
                    publicId: this.state.publicId
                })
                // console.log(this.state.url)
            },
            onCancel() {
                // console.log('Cancel');
            },
        });
    }

    handleCancelDeleteImage = () => {
        this.setState({ visibleDeleteImage: false });
    };

    createCodeListArray = () => {
        var codeArray = []
        if(this.state.tags.length > 0){
            this.state.tags.map(tag => {
                codeArray = codeArray.concat({code: tag, sold: false})
            })
        }
        return codeArray
    }
    updateMyProperties = async (e) => {
        e.preventDefault()
        var uploadList = []
        if (localStorage.getItem('res') === undefined || localStorage.getItem('res') === null) {
            await message.warning("Bạn cần phải đăng nhập trước khi đăng bài!")
        }
        else {
            await this.setState({ loading: true })
            await this.onUploadingImages(this.state.imagesToUpload)
            await Promise.all(this.state.url.map(image => {
                if (image.search('res.cloudinary') !== -1) {
                    // console.log('a')
                    uploadList.push(image)
                }
            }))
            await this.setState({url: uploadList})
            const codeArray = await this.createCodeListArray()
            // console.log(this.state.tags)
            // console.log(codeArray)
            let info = {
                name: (document.getElementById("name").value).toLowerCase(),
                investor: document.getElementById('investor').value,
                price: document.getElementById('price').value,
                unit: this.props.estateUserInfo.unit,
                area: document.getElementById('area').value,
                address: this.props.address.unknownAddress ? this.props.address.unknownAddress : this.state.address,
                type: this.props.estateUserInfo.type,
                info: document.getElementById('description').value,
                lat: this.props.address.markerPosition ? this.props.address.markerPosition.lat : this.state.lat,
                long: this.props.address.markerPosition ? this.props.address.markerPosition.lng : this.state.long,
                ownerid: JSON.parse(localStorage.getItem('res')).user._id,
                statusProject: this.props.estateUserInfo.statusProject,
                updateTime: moment().unix(),
                url: this.state.url,
                publicId: this.state.publicId,
                fullname: document.getElementById('contactname').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('contactemail').value,
                avatar: this.state.avatar,
                _id: this.state._id,
                codelist: codeArray
            };
            // console.log(info);
            await this.props.onUpdateUserProject(info, info._id)
            await this.setState({ loading: false })
            await this.props.history.goBack()
        }
    }

    UNSAFE_componentWillReceiveProps = (nextProps) => {
        if (nextProps && nextProps.estateUserInfo) {
            var { estateUserInfo } = nextProps
            var codelist = []
            if(estateUserInfo.codelist !== null){
                estateUserInfo.codelist.map((tag, index) => {
                    if (tag.code !== 'dummy' && tag.sold === false) {
                        codelist.push(tag.code)
                    }
                })
            }
            this.setState({
                price: estateUserInfo.price,
                area: estateUserInfo.area,
                fullname: estateUserInfo.fullname,
                email: estateUserInfo.email,
                phone: estateUserInfo.phone,
                name: estateUserInfo.name,
                status: estateUserInfo.statusProject,
                type: estateUserInfo.type,
                url: estateUserInfo.url,
                publicId: estateUserInfo.publicId,
                investor: estateUserInfo.investor,
                description: estateUserInfo.info,
                estateInfo: estateUserInfo,
                lat: estateUserInfo.lat,
                long: estateUserInfo.long,
                address: estateUserInfo.address,
                avatar: estateUserInfo.avatar,
                _id: estateUserInfo._id,
                unit: estateUserInfo.unit,
                tags: codelist
            })
        }
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

    onLoadingMap = () => {
        if (this.state.lat !== 0)
            return (
                <div style={{ paddingBottom: '80px' }}>
                    <MapSearching
                        google={this.props.google}
                        center={{ lat: this.props.estateUserInfo.lat, lng: this.props.estateUserInfo.long }}
                        height='300px'
                        zoom={15}
                    />
                </div>
            )
        else return null
    }

    render() {
        let { estateUserInfo } = this.props
        localStorage.setItem("projectid", estateUserInfo._id)
        // console.log(estateUserInfo)
        let { visible, estateInfo, previewImage, url, previewUrl, loading, tags, status } = this.state
        // console.log(estateInfo)
        // console.log(status)
        return (
            <div>
                <MainHeader />
                {
                    /* Sub banner start */
                }
                <div className="sub-banner overview-bgi">
                    <div className="overlay">
                        <div className="container">
                            <div className="breadcrumb-area">
                                <h1>Chỉnh sửa bài đăng</h1>
                                <ul className="breadcrumbs">
                                    <li>
                                        <Link to="/">Trang chủ</Link>
                                    </li>
                                    <li className="active">Chỉnh sửa bài đăng</li>
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
                                    <form onSubmit={this.updateMyProperties}>
                                        <div className="main-title-2">
                                            <h1>
                                                <span>Thông tin</span> cơ bản
                                        </h1>
                                        </div>
                                        <div className="search-contents-sidebar mb-30">
                                            <div className="row">
                                                <div className="col-md-12 col-sm-12">
                                                    <div className="form-group">
                                                        <label>Tên bài đăng</label>
                                                        <input
                                                            type="text"
                                                            className="input-text"
                                                            name="name"
                                                            id="name"
                                                            placeholder="Tên bài đăng"
                                                            maxLength={100}
                                                            required
                                                            defaultValue={this.state.name}
                                                        />
                                                    </div>
                                                </div>

                                                {/* <div className="col-md-3 col-sm-3">
                                                    <div className="form-group">
                                                        <label>Trạng thái</label>
                                                        <select className="form-control"
                                                            name="status"
                                                            // value={status}
                                                            id="status"
                                                            onChange={this.onHandleChange}
                                                            defaultValue={this.state.status === 0 ? null : Status[1].label}
                                                        >
                                                            {Status.map((status, index) => <option key={index} value={status.value}>{status.label}</option>)}

                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-md-3 col-sm-3">
                                                    <div className="form-group">
                                                        <label>Loại</label>
                                                        <select className="form-control"
                                                            name="type"
                                                            defaultValue={this.state.type}
                                                            id="type"
                                                        >
                                                            {Types.map((type, index) => <option key={index} value={type.value}>{type.label}</option>)}

                                                        </select>
                                                    </div>
                                                </div> */}
                                            </div>
                                            <div className="row">
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
                                                            defaultValue={this.state.investor}

                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-3 col-sm-6">
                                                    <div className="form-group">
                                                        <label>Giá</label>
                                                        <input
                                                            type="number"
                                                            className="input-text"
                                                            name="price"
                                                            id="price"
                                                            placeholder="Giá"
                                                            // onChange={this.onHandleChange}
                                                            defaultValue={this.state.price}
                                                            required

                                                        />
                                                    </div>
                                                </div>
                                                {/* <div className="col-md-3 col-sm-6">
                                                    <div className="form-group">
                                                        <label>Đơn vị</label>
                                                        <select className="form-control"
                                                            name="unit"
                                                            id="unit"
                                                            defaultValue={this.state.units.map(unit => unit.label === this.state.unit ? this.state.unit : null)}
                                                            placeholder="Chọn đơn vị"
                                                        >
                                                            {this.state.units.map((single, indexx) => <option key={indexx} value={single.label}>{single.label}</option>)}

                                                        </select>
                                                    </div>
                                                </div> */}
                                                <div className="col-md-3 col-sm-6">
                                                    <div className="form-group">
                                                        <label>Diện tích</label>
                                                        <input
                                                            type="number"
                                                            className="input-text"
                                                            name="area"
                                                            id="area"
                                                            placeholder="Diện tích"
                                                            // onChange={this.onHandleChange}
                                                            defaultValue={this.state.area}
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
                                        <div className="main-title-2">
                                            <h1>
                                                <span>Thông tin</span> chi tiết
                                            </h1>
                                        </div>
                                        <div className="row mb-30">
                                            <div className="col-md-12">
                                                <div className="form-group" style={{ marginBottom: '0px' }}>
                                                    <label>Nội dung bài đăng</label>
                                                    <textarea
                                                        className="input-text"
                                                        name="description"
                                                        id="description"
                                                        placeholder="Nhập nội dung bài đăng ở đây..."
                                                        value={this.state.description}
                                                        maxLength={3000}
                                                        required>

                                                    </textarea>
                                                </div>
                                            </div>
                                        </div>
                                        {this.state.lat !== 0 ?
                                            <div style={{ paddingBottom: '80px' }}>
                                                <MapSearching
                                                    google={this.props.google}
                                                    center={{ lat: this.props.estateUserInfo.lat, lng: this.props.estateUserInfo.long }}
                                                    height='300px'
                                                    zoom={15}
                                                />
                                            </div> : null}
                                        <div className="main-title-2">
                                            <h1>
                                                <span>Thông tin</span> liên hệ
                                            </h1>
                                        </div>
                                        <div className="search-contents-sidebar mb-30">
                                            <div className="row">
                                                <div className="col-md-4 col-sm-4">
                                                    <div className="form-group">
                                                        <label>Tên người liên hệ</label>
                                                        <input
                                                            type="text"
                                                            className="input-text"
                                                            name="contactname"
                                                            id="contactname"
                                                            placeholder="Tên người liên hệ"
                                                            // onChange={this.onHandleChange}
                                                            defaultValue={this.state.fullname}
                                                            maxLength={50}
                                                            required

                                                        />

                                                    </div>
                                                </div>
                                                {/* <div className="col-md-2 col-sm-2"></div> */}
                                                <div className="col-md-4 col-sm-4">
                                                    <div className="form-group">
                                                        <label>Số điện thoại</label>
                                                        <input
                                                            type="tel"
                                                            className="input-text"
                                                            name="phone"
                                                            id="phone"
                                                            placeholder="Số điện thoại"
                                                            pattern="[0]{1}[0-9]{9}"
                                                            // onChange={this.onHandleChange}
                                                            defaultValue={this.state.phone}
                                                            required

                                                        />
                                                    </div>
                                                </div>
                                                {/* <div className="col-md-2 col-sm-2"></div> */}
                                                <div className="col-md-4 col-sm-4">
                                                    <div className="form-group">
                                                        <label>Địa chỉ email</label>
                                                        <input
                                                            type="email"
                                                            className="input-text"
                                                            name="contactemail"
                                                            id="contactemail"
                                                            placeholder="Email"
                                                            defaultValue={this.state.email}
                                                        // onChange={this.onHandleChange}

                                                        />

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="main-title-2">
                                            <h1>
                                                <span>Hình ảnh</span> bài đăng
                                            </h1>
                                        </div>
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

                                        <div className="row">
                                            {(this.state.url && this.state.url.length > 0) ? this.onShowImageBeforeUpload(this.state.url) : null}
                                        </div>
                                        <Modal visible={previewImage} footer={null} onCancel={this.onHandleCancelImage} width="800px" style={{ height: "500px" }}>
                                            <img alt="example" src={previewUrl} style={{ width: "750px", height: "500px" }} />
                                        </Modal>

                                        <br></br>
                                        <div className="row">
                                            <Button type="submit" variant="success" style={{ fontSize: "16px", padding: "15px 30px 15px 30px" }} className="btn button-md button-theme" disabled={loading}>
                                                {loading && (
                                                    <i
                                                        className="fa fa-refresh fa-spin"
                                                        style={{ marginRight: "5px" }}
                                                    />
                                                )}
                                                {loading && <span>Đang cập nhật...</span>}
                                                {!loading && <span>Cập nhật</span>}
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
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
            </div>
        )
    }
}
const mapDispathToProp = (dispatch) => {
    return {
        actGetEstateRequest: (info) => dispatch(actions.actGetEstateRequest(info)),
        onUpdateUserProject: (data, id) => dispatch(actions.actEditUserProjectRequest(data, id))
    }
}
const mapStateToProp = (state) => {
    return {
        user: state.user,
        address: state.address,
        estateUserInfo: state.estateInfo,
        updatedProject: state.estateUserInfo
    }
}
export default connect(mapStateToProp, mapDispathToProp)(EditUI);
