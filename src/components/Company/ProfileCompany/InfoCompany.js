import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { ADD_ACCOUNT, CHANGE_PASSWORD, LIST_EMPLOYEES, PROFILE } from '../../../constants/Company/profileCompany'
import Dropzone from 'react-dropzone'
import request from 'superagent'
import { message } from 'antd'
import { connect } from 'react-redux'
import * as companyActions from '../../../actions/Company/requestCompany'
import { adminService } from '../../../actions/Company/admin.service'
import moment from 'moment'

const CLOUDINARY_UPLOAD_PRESET = 'nn6imhmo';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dne3aha8f/image/upload';

class InfoCompany extends Component {
    constructor(props) {
        super(props)

        this.state = {
            uploadedFile: null,
            uploadedFileCloudinaryUrl: '',
            loading: false
        }
    }

    componentDidMount = () => {
        this.props.onGettingCompanyInfo()
    }

    onImageSelect(files) {
        this.setState({
            uploadedFile: files[0]
        });
        // console.log(files)
        this.handleImageUpload(files[0]);
    }
    onSignOut =(e)=> {
        e.preventDefault();
        localStorage.removeItem('company');
        this.props.history.push('/company/login')
    }

    async handleImageUpload(file) {
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
            companyname: this.props.userCompany.companyname,
            address: this.props.userCompany.address,
            email: this.props.userCompany.email,
            phone: this.props.userCompany.phone,
            description: this.props.userCompany.description,
            avatar: this.state.uploadedFileCloudinaryUrl ? this.state.uploadedFileCloudinaryUrl : this.props.userCompany.avatar,
            createTime: this.props.userCompany.createTime,
            updateTime: moment().unix()
        }
        // console.log(profileData)
        await adminService.editCompany(profileData)
            .then(async res => {
                if(res.status === 200){
                    await this.props.onGettingCompanyInfo()
                }
                this.props.history.push('/company/profile-admin')
            })
            .catch(err => {
                // console.log(err)
                message.error('Lỗi. Phiền bạn vui lòng kiểm tra lại')
            })

    }

    onAddAccountEmployee = (e) => {
        e.preventDefault();
        this.props.history.push('/company/add-account-employee');
    }
    onChangePassword = (e) => {
        e.preventDefault();
        this.props.history.push('/company/changepassword');
    }
    onShowProfile = (e) => {
        e.preventDefault();
        this.props.history.push('/company/profile-admin');
    }
    onShowListEmployees = (e) => {
        e.preventDefault()
        this.props.history.push('/company/list-employees')
    }
    onShowMyTransactions = (e) => {
        e.preventDefault()
        this.props.history.push('/company/mytransactions')
    }
    onShowTransactionHistory = (e) => {
        e.preventDefault()
        this.props.history.push('/company/transhistory')
    }

    render() {
        let userInfoCompany = JSON.parse(localStorage.getItem('company'))
        // console.log(userInfoCompany)
        // console.log(this.props.userCompany)
        return (
            <div>
                <div className="user-account-box">
                    <div className="header clearfix" >
                        <div className="edit-profile-photo">
                            <img style={{ width: "150px", height: "150px" }} src={this.props.userCompany.avatar ? this.props.userCompany.avatar : '/img/avatar/avatar-1.jpg'} alt="agent-1" className="img-responsive" />
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
                        {/* <h3>{userInfoCompany.fullname}</h3> */}
                    </div>
                    <div className="content">
                        <ul>
                            <li>
                                <a href="true" onClick={this.onShowProfile} className={this.props.component === PROFILE ? "active" : ""}>
                                    <i className="flaticon-social" />Thông tin cơ bản
                                </a>
                            </li>
                            <li>
                                <a href="true" onClick={this.onChangePassword} className={this.props.component === CHANGE_PASSWORD ? "active" : ""}>
                                    <i className="fa fa-plus" />Đổi mật khẩu
                                </a>
                            </li>
                            <li>
                                <a href="true" onClick={this.onAddAccountEmployee} className={this.props.component === ADD_ACCOUNT ? "active" : ""}>
                                    <i className="flaticon-apartment" />Thêm tài khoản nhân viên
                                </a>
                            </li>
                            <li>
                                <a href="true" onClick={this.onShowListEmployees} className={this.props.component === LIST_EMPLOYEES ? "active" : ""}>
                                    <i className="flaticon-shape" />Danh sách nhân viên
                                </a>
                            </li>
                            

                            <li>
                                <a href="true" onClick={this.onSignOut}>
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
        userCompany: state.userCompany
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGettingCompanyInfo: () => dispatch(companyActions.actGetInfoUserCompany())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(InfoCompany));
