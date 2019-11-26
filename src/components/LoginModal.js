/* eslint-disable */
import React, { Component } from 'react'
import { GoogleLogin } from 'react-google-login';
import * as Config from '../constants/Config'
import { Modal } from 'antd'
// import axios from 'axios';
// import { withRouter } from 'react-router-dom';
// import * as actions from '../actions/request';
// import { Select } from 'antd';
// import { connect } from 'react-redux';

export default class LoginModal extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            error: '',
            isAuthenticated: false,
            user: null,
            token: '',
            visible: false
        };
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    logout = () => {
        this.setState({
            isAuthenticated: false,
            token: '', user: null
        })
    };
    googleResponse = (response) => {
        console.log(response);
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

    }
    render() {
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
                            // style={{ border: "solid 1px black" }}
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
            <div>
                <Modal
                    title="Đăng nhập"
                    visible={this.props.visible}
                    footer={null}
                    style={{ height: "80%", overflowY: "auto", zIndex: "1000", boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)" }}
                    width="40%"
                >
                    <div>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 col-md-12">
                                    {/* Form content box start */}
                                    <div className="form-content-box">
                                        {/* details */}
                                        <div className="details">
                                            {/* Main title */}
                                            <div className="main-title">
                                                <h1>
                                                    <span>Bạn phải đăng nhập trước</span>
                                                </h1>
                                            </div>
                                            {/* Form start */}
                                            <form>
                                                {/* <div style={{ marginBottom: '10px' }}>
                                            <a className="btn-google m-b-20" href>
                                                <img src="images/icons/icon-google.png" alt="GOOGLE" />
                                                Google
                                            </a>
                                        </div> */}
                                                <div className="form-group">
                                                    <input
                                                        onChange={this.handleEmailChange}
                                                        type="email"
                                                        name="email"
                                                        className="input-text"
                                                        placeholder="Nhập Email"
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <input
                                                        onChange={this.handlePasswordChange}
                                                        type="password"
                                                        name="Password"
                                                        className="input-text"
                                                        placeholder="Mật khẩu"
                                                        required
                                                    />
                                                </div>
                                                <div className="checkbox">
                                                    <div className="ez-checkbox pull-left">
                                                        <label>
                                                            <input type="checkbox" className="ez-hide" />
                                                            Remember me
                                            </label>
                                                    </div>
                                                    <a
                                                        href="forgot-password.html"
                                                        className="link-not-important pull-right"
                                                    >
                                                        Forgot Password
                                            </a>
                                                    <div className="clearfix" />
                                                </div>
                                                <div className="form-group">
                                                    <button
                                                        onClick={this.signIn}
                                                        type="submit"
                                                        className="button-md button-theme btn-block"
                                                    >
                                                        Đăng nhập
                                            </button>
                                                    <br />
                                                    <div className="App">
                                                        {content}
                                                    </div>
                                                </div>
                                            </form>
                                            {/* Form end */}
                                        </div>
                                        {/* Footer */}
                                        {/* <div className="footer">
                                            <span>
                                                New to Tempo? <a href="signup.html">Sign up now</a>
                                            </span>
                                        </div> */}
                                    </div>
                                    {/* Form content box end */}
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>

        );
    }
}
