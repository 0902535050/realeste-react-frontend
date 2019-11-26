/* eslint-disable */
import React, { Component } from 'react';
import axios from 'axios';
// import { GoogleLogin } from 'react-google-login';
import * as Config from '../../constants/Config'
import { withRouter, Link } from 'react-router-dom';
import * as actions from '../../actions/Company/requestCompany';
import * as actionAuth from '../../actions/auth'
import { connect } from 'react-redux';
import { message, Modal, Form, Input, Button } from 'antd'
import MainHeader from '../../components/MainHeader'
import Footer from '../../components/Footer';
//=== tai khoan
// thaodien@gmail.com
// 5yPQAn
//===
class Login extends Component {
    constructor(props) {
        super(props);
        this.props.actCheckAuth('')
        this.state = {
            disable: false,
        };
    }
    componentDidMount() {
        if (localStorage.getItem('company')) {
            this.props.history.push('/company/profile-admin')
        }
        else if (localStorage.getItem('res')) {
            this.props.history.push('/')
        }
    }

    onResetPassword = (e) => {
        e.preventDefault();
        this.props.history.push('/company/forgotpassword');
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({
                    disable: true,
                })
                let data = {
                    email: values.email,
                    password: values.password
                }
                // console.log(data)
                message.loading('Vui lòng chờ trong giây lát', 1)
                    .then(() => {
                        axios.post(`${Config.API_URL}/company/login`, data)
                            .then(res => {
                                if (res.status === 200) {
                                    message.success("Đăng nhập thành công");
                                    // console.log(res);
                                    localStorage.setItem('company', JSON.stringify(res.data));
                                    this.props.actCheckAuth(true)
                                    this.props.history.push(`/company/profile-admin`);
                                }
                            })
                            .catch(err => {
                                if (err) {
                                    if (err.response.data.status === 401) {
                                        message.error('Lỗi. Phiền bạn vui lòng kiểm tra lại')
                                    }
                                    else {
                                        message.error('Lỗi. Phiền bạn kiểm tra lại')
                                    }
                                }
                                else {
                                    message.error('Lỗi. Phiền bạn kiểm tra lại đường truyền')
                                }

                                this.setState({
                                    disable: false,
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
    render() {
        Modal.destroyAll()
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            // labelCol: {
            //     xs: { span: 24 },
            //     sm: { span: 6 },
            // },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 24 },
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
                <MainHeader />
                <div className="content-area" style={{ backgroundColor: 'lightgray' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                {/* Form content box start */}
                                <div className="form-content-box" style={{ textAlign: 'unset' }}>
                                    {/* details */}
                                    <div className="details">
                                        {/* Main title */}
                                        <div className="main-title">
                                            <h1>
                                                <span>Đăng nhập công ty</span>
                                            </h1>
                                        </div>
                                        {/* Form start */}
                                        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                                            <Form.Item style={{ paddingRight: '20px', paddingLeft: '20px' }} hasFeedback>
                                                {getFieldDecorator('email', {
                                                    rules: [
                                                        {
                                                            type: 'email',
                                                            message: 'Văn bản không đúng định dạng email',
                                                        },
                                                        {
                                                            required: true,
                                                            message: 'Vui lòng nhập email vào ô văn bản',
                                                        },
                                                    ],
                                                })(<Input
                                                    placeholder='Email*'
                                                    style={{ marginRight: '30px' }} />)}
                                            </Form.Item>
                                            <Form.Item style={{ paddingRight: '20px', paddingLeft: '20px' }} hasFeedback>
                                                {getFieldDecorator('password', {
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: 'Vui lòng nhập mật khẩu!',
                                                        },

                                                    ],
                                                })(<Input.Password
                                                    placeholder='Mật khẩu*'
                                                    style={{ marginRight: '30px' }} />)}
                                            </Form.Item>
                                            <Form.Item {...tailFormItemLayout} style={{ paddingLeft: '20px', paddingRight: '20px', textAlign: 'right', marginTop: '-30px' }}>
                                                <a
                                                    onClick={this.onResetPassword}
                                                >
                                                    Quên mật khẩu?
                                            </a>
                                            </Form.Item>

                                            <Form.Item {...tailFormItemLayout} style={{ paddingLeft: '20px', paddingRight: '20px', textAlign: 'center', marginTop: '-30px' }}>
                                                <Button style={{ width: '100%' }} type="primary" size='large' htmlType="submit" disabled={this.state.disable} name='companyLoginButton'>
                                                    Đăng nhập
                                                </Button>

                                            </Form.Item>
                                            <Form.Item {...tailFormItemLayout} style={{ paddingLeft: '20px', paddingRight: '20px', textAlign: 'right', marginTop: '-30px' }}>
                                                <Link to='/login'>
                                                    Quay về trang đăng nhập chính
                                                    </Link>
                                            </Form.Item>
                                        </Form>
                                        {/* Form end */}
                                    </div>
                                    {/* Footer */}

                                </div>
                                {/* Form content box end */}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

const mapDispathToProp = (dispatch) => {
    return {
        // actGetInfoUserCompany: () => dispatch(actions.actGetInfoUserCompany()),
        actCheckAuth: (isAuth) => dispatch(actionAuth.actCheckAuth(isAuth))
    }
}
const mapStateToProp = (state) => {
    return {

    }
}
export default connect(mapStateToProp, mapDispathToProp)(withRouter(Form.create()((Login))));