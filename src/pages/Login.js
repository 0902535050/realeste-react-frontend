/* eslint-disable */
import React, { Component } from 'react';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import * as Config from '../constants/Config'
import { withRouter, Redirect } from 'react-router-dom';
import * as actions from '../actions/request';
// import { Select } from 'antd';
import { connect } from 'react-redux';
import MainHeader from '../components/MainHeader'
import { message, Modal, Form, Input, Button } from 'antd'
import Footer from '../components/Footer'

class Login extends Component {
    constructor(props) {
        super(props);
        // console.log(props)
        this.state = {
            email: '',
            password: '',
            error: '',
            isAuthenticated: false,
            user: null,
            token: '',
            disable: false,
        };
    }
    onResetPassword = (e) => {
        e.preventDefault();
        this.props.history.push('/forgotpassword');
    }
    onLoginCompany = () => {
        this.props.history.push(`/company/login`)
    }
    logout = () => {
        this.setState({
            isAuthenticated: false,
            token: '', user: null
        })
    };
    googleResponse = (response) => {
        // console.log(response);
        // localStorage.setItem('tokenbeforeposting', response)
        const tokenBlob = new Blob([JSON.stringify({ access_token: response.accessToken }, null, 2)], { type: 'application/json' });
        const options = {
            method: 'POST',
            body: tokenBlob,
            mode: 'cors',
            cache: 'default'
        };
        fetch(`${Config.API_URL}/users/auth/google`, options).then(r => r.json()
            .then(json => {
                console.log(json)
                localStorage.setItem('res', JSON.stringify(json))
                this.props.history.goBack();
            }))
            .catch(error => {
                message.error('Lỗi. Đường truyền không ổn định hoặc server bị sập!')
            })

    }
    onFailure(error) {
        message.error('Lỗi. Vui lòng kiểm tra lại tài khoản Google!')
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
                        axios.post(`${Config.API_URL}/users/login`, data)
                            .then(res => {
                                if (res.status === 200) {
                                    message.success("Đăng nhập thành công");
                                    localStorage.setItem('res', JSON.stringify(res.data));
                                    this.props.actGetInfoUser(res.data.id);
                                    this.props.history.goBack();
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
        let content = !!this.state.isAuthenticated ?
            (
                <div>
                    <p>Authenticated</p>
                    <div>
                        {this.state.user.email}
                    </div>
                    <div>
                        <button onClick={this.logout} className="button">
                            Log out
                        </button>
                    </div>
                </div>
            ) :
            (
                <div>
                    <GoogleLogin
                        clientId={Config.GOOGLE_CLIENT_ID}
                        buttonText="Login"
                        render={renderProps => (
                            <button
                                onClick={renderProps.onClick}
                                type="submit"
                                className="button-google btn-block"
                                disabled={this.state.disable}
                                name='googleLoginButton'
                                style={{color:'white', background:'#5d733b'}}
                            >
                                <img src="/images/icons/icon-google.png" alt="GOOGLE" style={{ marginRight: "10px", width: "18px" }} />
                                Đăng nhập với Google
                            </button>
                        )}
                        onSuccess={this.googleResponse}
                        onFailure={this.onFailure}
                    />
                </div>
            );
        return (
            !localStorage.getItem('res') ?
                (<div>
                    <MainHeader />
                    <div className="content-area" style={{ backgroundColor: 'lightgray' }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-content-box" style={{ textAlign: 'unset', paddingTop:'80px'}}>
                                        {/* details */}
                                        <div className="details">
                                            {/* Main title */}
                                            <div className="main-title">
                                                <h1>
                                                    <span>Dành cho cá nhân</span>
                                                </h1>
                                                <br/>
                                                {content}
                                            </div> 
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    {/* Form content box start */}
                                    <div className="form-content-box" style={{ textAlign: 'unset', maxWidth:'500px' }}>
                                        {/* details */}
                                        <div className="details">
                                            {/* Main title */}
                                            <div className="main-title">
                                                <h1>
                                                    <span>Dành cho doanh nghiệp</span>
                                                </h1>
                                                <h6>(*Đăng nhập bằng tài khoản nhân viên)</h6>
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
                                                        style={{ marginRight: '30px' }} name='inputLogin' />)}
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
                                                        style={{ marginRight: '30px' }} name='inputPass' />)}
                                                </Form.Item>
                                                <Form.Item {...tailFormItemLayout} style={{ paddingLeft: '20px', paddingRight: '20px', textAlign: 'right', marginTop: '-30px' }}>
                                                    <a
                                                        onClick={this.onResetPassword}
                                                    >
                                                        Quên mật khẩu?
                                            </a>
                                                </Form.Item>

                                                <Form.Item {...tailFormItemLayout} style={{ paddingLeft: '20px', paddingRight: '20px', textAlign: 'center', marginTop: '-30px' }}>
                                                    <Button style={{ width: '100%', overflow: "hidden", textOverflow: "ellipsis" }} type="primary" size='large' htmlType="submit" disabled={this.state.disable} name='normalLoginButton'>
                                                        Đăng nhập
                                                </Button>

                                                </Form.Item>
                                                <Form.Item {...tailFormItemLayout} style={{ paddingLeft: '20px', paddingRight: '20px', textAlign: 'center', display: "block" }}>
                                                    <Button style={{ width: '100%', overflow: "hidden", textOverflow: "ellipsis" }} type="danger" size='large' disabled={this.state.disable} onClick={this.onLoginCompany} name='companyLoginButton'>
                                                        Đăng nhập bằng tài khoản công ty
                                                </Button>

                                                </Form.Item>
                                                {/* <Form.Item {...tailFormItemLayout} style={{ paddingLeft: '20px', paddingRight: '20px', textAlign: 'center', height: '47px' }}>
                                                    {content}
                                                </Form.Item>
                                                <Form.Item {...tailFormItemLayout} style={{ paddingTop: '10px', textAlign: 'center', height: '47px' }}>
                                                    <h6>(*Đăng nhập bằng google nếu bạn người dùng thông thường)</h6>
                                                </Form.Item> */}
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
                </div>)
                : <Redirect to={"/"} />
        );
    }
}

const mapDispathToProp = (dispatch) => {
    return {
        actGetInfoUser: () => dispatch(actions.actGetUserInfoRequest()),
    }
}
const mapStateToProp = (state) => {
    return {

    }
}
export default connect(mapStateToProp, mapDispathToProp)(withRouter(Form.create()((Login))));