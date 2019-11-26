import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { MY_PROPERTIES, MY_FOLLOWING, SUBMIT_ESTATE, PROFILE, MY_TRANSACTION, MY_TRANSACTION_HISTORY, WAITING_REQUEST, CHANGE_PASSWORD } from '../../constants/Profile'
import Dropzone from 'react-dropzone'
import request from 'superagent'
import { connect } from 'react-redux'
import * as actions from '../../actions/request'
import { message } from 'antd'

const CLOUDINARY_UPLOAD_PRESET = 'nn6imhmo';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dne3aha8f/image/upload';

class Info extends Component {
    constructor(props) {
        super(props)

        this.state = {
            uploadedFile: null,
            uploadedFileCloudinaryUrl: ''
        }
    }

    onImageSelect(files) {
        this.setState({
            uploadedFile: files[0]
        });
        // console.log(files)
        this.handleImageUpload(files[0]);
    }
    async handleImageUpload(file) {
        // console.log(file)
        // console.log(this.props.user)
        await request
            .post(CLOUDINARY_UPLOAD_URL)
            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
            .field('file', file)
            .then(response => {
                // console.log(response)
                this.setState({
                    uploadedFileCloudinaryUrl: response.body.secure_url,
                })
            })
            .catch(err => message.error(`Có lỗi xảy ra: ${err}`))
        var profileData = {
            fullname: this.props.user.fullname,
            phone: this.props.user.phone === '' ? 'Chưa có thông tin' : this.props.user.phone,
            address: this.props.user.address === '' ? 'Chưa có thông tin' : this.props.user.address,
            identify: this.props.user.identify === '' ? 'Chưa có thông tin' : this.props.user.identify,
            description: this.props.user.description === '' ? 'Chưa có thông tin' : this.props.user.description,
            avatar: this.state.uploadedFileCloudinaryUrl ? this.state.uploadedFileCloudinaryUrl : this.props.user.avatar,
        }
        // console.log(profileData)
        await this.props.onEditUserInfo(profileData)
        await this.props.onGetUserInfo()
    }
    onMyProperties = (e) => {
        e.preventDefault();
        this.props.history.push('/myproperties');
    }
    onSubmitProperty = (e) => {
        e.preventDefault();
        this.props.history.push('/submitproperty');
    }
    onChangePassword = (e) => {
        e.preventDefault();
        this.props.history.push('/changepassword');
    }
    onShowProfile = (e) => {
        e.preventDefault();
        this.props.history.push('/profile');
    }
    onShowMyFollowing = (e) => {
        e.preventDefault()
        this.props.history.push('/myfollowing')
    }
    onShowMyTransactions = (e) => {
        e.preventDefault()
        this.props.history.push('/mytransactions')
    }
    onShowTransactionHistory = (e) => {
        e.preventDefault()
        this.props.history.push('/transhistory')
    }
    onShowWaitingRequest = (e) => {
        e.preventDefault()
        this.props.history.push('/waiting')
    }
    signOut =(e)=>{
        e.preventDefault()
        localStorage.removeItem('res');
        this.props.history.push('/')
    }
    componentDidMount = () => {
        this.props.onGetUserInfo()
    }
    render() {
        let userInfo = JSON.parse(localStorage.getItem('res'))
        // console.log(userInfo)
        let changePasswordd = ''
        if(userInfo.user.statusAccount === 2){
            changePasswordd = 
            <li>
            <a href="true" onClick={this.onChangePassword} className={this.props.component === CHANGE_PASSWORD ? "active" : ""}>
                <i className="fa fa-edit" />Đổi mật khẩu
            </a>
        </li>
        }
        let { user } = this.props
        // console.log(user)
        return (
            <div>
                <div className="user-account-box">
                    <div className="header clearfix">
                        <div className="edit-profile-photo">
                            <img src={user.avatar && user.avatar !== '' ? user.avatar : '/img/avatar/avatar-1.jpg'} alt="agent-1" className="img-responsive" style={{ width: "150px", height: "150px" }} />
                            <div className="change-photo-btn">
                                <div className="photoUpload">
                                    <Dropzone
                                        onDrop={this.onImageSelect.bind(this)}
                                        multiple={false}
                                        accept="image/*">
                                        {({ getRootProps, getInputProps }) => {
                                            return (
                                                <div
                                                    {...getRootProps()}
                                                >
                                                    <input {...getInputProps()} />
                                                    {
                                                        <span><i className="fa fa-upload" /> Đổi ảnh đại diện</span>
                                                    }
                                                </div>
                                            )
                                        }}
                                    </Dropzone>
                                </div>
                            </div>
                        </div>
                        <h3>{user.fullname !== '' ? user.fullname : userInfo.user.fullname}</h3>
                        <p>{userInfo.user.email}</p>
                    </div>
                    <div className="content">
                        <ul>
                            <li>
                                <a href="true" onClick={this.onShowProfile} className={this.props.component === PROFILE ? "active" : ""}>
                                    <i className="flaticon-social" />Thông tin cơ bản
                                </a>
                            </li>
                            {changePasswordd}
                            <li>
                                <a href="true" onClick={this.onMyProperties} className={this.props.component === MY_PROPERTIES ? "active" : ""}>
                                    <i className="flaticon-apartment" />Danh sách bài đăng
                                </a>
                            </li>
                            <li>
                                <a href="true" onClick={this.onShowMyFollowing} className={this.props.component === MY_FOLLOWING ? "active" : ""}>
                                    <i className="flaticon-shape" />Danh sách yêu thích
                                </a>
                            </li>
                            <li>
                                <a href="true" onClick={this.onShowMyTransactions} className={this.props.component === MY_TRANSACTION ? "active" : ""}>
                                    <i className="flaticon-monitor" />Giao dịch của tôi
                                </a>
                            </li>
                            {/* <li>
                                <a href="true" onClick={this.onShowTransactionHistory} className={this.props.component === MY_TRANSACTION_HISTORY ? "active" : ""}>
                                    <i className="flaticon-internet" />Lịch sử giao dịch
                                </a>
                            </li> */}
                            <li>
                                <a href="true" onClick={this.onShowWaitingRequest} className={this.props.component === WAITING_REQUEST ? "active" : ""}>
                                    <i className="fa fa-location-arrow" />Danh sách yêu cầu
                                </a>
                            </li>
                            <li>
                                <a href="true" onClick={this.onSubmitProperty} className={this.props.component === SUBMIT_ESTATE ? "active" : ""}>
                                    <i className="fa fa-plus" />Đăng bài
                                </a>
                            </li>
                            <li>
                                <a href="true" onClick={this.signOut}>
                                    <i className="flaticon-sign-out-option" />Đăng xuất
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetUserInfo: () => dispatch(actions.actGetUserInfoRequest()),
        onEditUserInfo: (data) => dispatch(actions.actEditUserInfoRequest(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Info));
