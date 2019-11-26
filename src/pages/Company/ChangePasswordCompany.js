import React, { Component } from 'react';
import HeaderCompany from '../../components/Company/HeaderCompany'
// import Footer from '../../components/Footer'
import InfoCompany from '../../components/Company/ProfileCompany/InfoCompany'
import { CHANGE_PASSWORD } from '../../constants/Company/profileCompany'
import * as actions from '../../actions/Company/requestCompany';
import { Link } from 'react-router-dom'
import { adminService } from '../../actions/Company/admin.service'
import { message, Form, Input, Button, Spin } from 'antd';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'
class ChangePasswordCompany extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            newpassword: '',
            confirmpassword: '',
            confirmDirty: false,
            disable: false,
        };
    }

    componentDidMount() {
        if (localStorage.getItem('company')) {
            let company = JSON.parse(localStorage.getItem('company'));
            this.props.actGetInfoUserCompany(company.id);
        }
        else {
            this.props.history.push('/company/login')
        }
    }

    onCancel = (e) => {
        e.preventDefault();
        this.props.history.push('/company/profile-admin')
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async(err, values) => {
            if (!err) {
                await this.setState({
                    disable: true,
                })
                let data = {
                    currentPassword: values.currentPassword,
                    newPassword: values.newPassword,

                }
                // console.log(data)

                message.loading('Đang cập nhật lại mật khẩu', 2)
                    .then(() => {
                        adminService.changePasswordCompany(data)
                            .then(res => {
                                if (res.status === 200) {
                                    message.success('Đổi mật khẩu thành công');
                                }
                                this.setState({
                                    disable: false,
                                })
                                this.props.history.push('/company/profile-admin')
                            })
                            .catch(err => {
                                if(err){
                                    message.error('Đổi mật khẩu thất bại. Mời bạn vui lòng thử lại!')
                                }
                                else{
                                    message.error('Lỗi. Phiền bạn kiểm tra lại đường truyền!')
                                }
                                this.setState({
                                    disable: false
                                })
                            })
                    });
            }
            else {
                this.setState({
                    disable: false,
                })
            }
        });
    };

    handleConfirmBlur = e => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('newPassword')) {
            callback('Mật khẩu mới không trùng khớp!');
        } else {
            callback()
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };
    render() {
        let auth = this.props.auth;
        if (auth === false) {
            message.error('Bạn đã hết phiên đăng nhập. Vui lòng đăng nhập lại')
            this.props.history.push('/company/login')
        }
        else if (auth === true) {
            const { getFieldDecorator } = this.props.form;
            const formItemLayout = {
                labelCol: {
                    xs: { span: 24 },
                    sm: { span: 6 },
                },
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 18 },
                },
            };
            const tailFormItemLayout = {
                wrapperCol: {
                    xs: {
                        span: 24,
                        offset: 0,
                    },
                    sm: {
                        span: 24,
                        offset: 0,
                    },
                },
            };
            return (
                <div>
                    <HeaderCompany />
                    {/* Sub banner start */}
                    <div className="sub-banner overview-bgi">
                        <div className="overlay">
                            <div className="container">
                                <div className="breadcrumb-area">
                                    <h1>Đổi mật khẩu</h1>
                                    <ul className="breadcrumbs">
                                        <li><Link to="/company/profile-admin">Trang chủ</Link></li>
                                        <li className="active">Đổi mật khẩu</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Sub Banner end */}

                    {/* My Propertiess start */}
                    <div className="content-area my-properties">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-4 col-md-4 col-sm-12">
                                    <InfoCompany component={CHANGE_PASSWORD} />
                                </div>
                                <div className="col-lg-8 col-md-8 col-sm-12">
                                    <div className="main-title-2">
                                        <h1><span>Đổi mật khẩu</span></h1>
                                    </div>
                                    {/* table start */}
                                    <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                                        <Form.Item label="Mật khẩu hiện tại" style={{ paddingRight: '20px' }} hasFeedback>
                                            {getFieldDecorator('currentPassword', {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: 'Vui lòng nhập mật khẩu!',
                                                    },

                                                ],
                                            })(<Input.Password style={{ marginRight: '30px' }} />)}
                                        </Form.Item>
                                        <Form.Item label="Mật khẩu mới" style={{ paddingRight: '20px' }} hasFeedback>
                                            {getFieldDecorator('newPassword', {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: 'Vui lòng nhập mật khẩu mới!',
                                                    },
                                                    {
                                                        validator: this.validateToNextPassword,
                                                    },
                                                ],
                                            })(<Input.Password style={{ marginRight: '30px' }} />)}
                                        </Form.Item>
                                        <Form.Item label="Xác nhận mật khẩu" style={{ paddingRight: '20px' }} hasFeedback>
                                            {getFieldDecorator('confirm', {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: 'Vui lòng xác nhận lại mật khẩu!',
                                                    },
                                                    {
                                                        validator: this.compareToFirstPassword,
                                                    },
                                                ],
                                            })(<Input.Password onBlur={this.handleConfirmBlur} style={{ marginRight: '30px' }} />)}
                                        </Form.Item>
                                        <Form.Item {...tailFormItemLayout} style={{ textAlign: 'right', paddingRight: '20px' }}>
                                            <Button type="primary" style={{ marginRight: '5px' }} htmlType="submit" disabled={this.state.disable}>
                                            {this.state.disable && (
                                                    <i
                                                        className="fa fa-refresh fa-spin"
                                                        style={{ marginRight: "5px" }}
                                                    />
                                                )}
                                                {this.state.disable && <span>Đang cập nhât...</span>}
                                                {!this.state.disable && <span>Cập nhật mật khẩu</span>}
                                                </Button>
                                            <Button type="danger" onClick={this.onCancel} disabled={this.state.disable}>
                                                Hủy
                                                </Button>
                                        </Form.Item>
                                    </Form>
                                    {/* table end */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <Footer /> */}
                </div>
            );
        }
        return (
            <div style={{ textAlign: 'center', padding: '100px' }}>
                <Spin tip="Loading...">

                </Spin>
            </div>
        );
    }
}
const mapDispathToProp = (dispatch) => {
    return {
        actGetInfoUserCompany: (id) => dispatch(actions.actGetInfoUserCompany(id))
    }
}
const mapStateToProp = (state) => {
    return {
        userCompany: state.userCompany,
        auth: state.auth
    }
}

export default connect(mapStateToProp, mapDispathToProp)(withRouter(Form.create()(ChangePasswordCompany)));
