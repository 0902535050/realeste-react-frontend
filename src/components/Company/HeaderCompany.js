import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {HOME, NEWS, ABOUT} from '../../constants/Navbar'

class HeaderCompany extends Component {
    constructor() {
        super();
        this.state = {
            username: null,
            token: 'abc'
        };
    }

    onSubmitProperty = (e) => {
        e.preventDefault();
        this.props.history.push('/submitproperty');

    }
    onRedirectHome = (e) => {
        e.preventDefault();
        this.props.history.push('/company/profile-admin');
    }
    onChangePassword = (e) => {
        e.preventDefault();
        this.props.history.push('/company/changepassword')
    }
    onLogin = (e) => {
        e.preventDefault();
        this.props.history.push('/login');
    }
    onHandleProfile = (e) => {
        e.preventDefault();
        let token = JSON.parse(localStorage.getItem('company'));      
        if (token.data.id) {
            this.props.history.push(`/company/profile`);
        }

    }
    onAddAccount = (e) => {
        e.preventDefault();
        this.props.history.push('/company/add-account-employee');
    }
    onListEmployee = (e) => {
        e.preventDefault();
        this.props.history.push('/company/list-employees')
    }
    onSignOut = (e) => {
        e.preventDefault();
        localStorage.removeItem('company');
        this.props.history.push('/company/login');
    }


    onAfterLogin = (token) => {
        if (token !== null)
            return (<React.Fragment>
                
                <li>
                    <a href="true" onClick={this.onSignOut} className="button-signout" style={{ marginRight: '5px', color: 'red', border: '1px solid red' }}>
                        <i className="fa fa-sign-out" /> Đăng xuất
                    </a>
                </li>
            </React.Fragment>);
        else if (token === null)
            return (
                <li>
                    <a href="true" onClick={this.onLogin} className="button" style={{ marginRight: '5px' }}>
                        <i className="fa fa-sign-in" /> Đăng nhập
                                                </a>
                </li>

            );
    }

    render() {
        var token = localStorage.getItem('company')
        return (
            <div>
                <header className="main-header">
                    <div className="container">
                        <nav className="navbar navbar-default">
                            <div className="navbar-header">
                                <button
                                    type="button"
                                    className="navbar-toggle collapsed"
                                    data-toggle="collapse"
                                    data-target="#app-navigation"
                                    aria-expanded="false"
                                >
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar" />
                                    <span className="icon-bar" />
                                    <span className="icon-bar" />
                                </button>
                                <a href="true" onClick={this.onRedirectHome} className="logo">
                                    <img style={{ height: '60px', width: '120px',marginTop:'-13px' }} src="https://res.cloudinary.com/huantd/image/upload/v1561783181/logo/logo_RE-01_fteok3.png" alt="logo" />
                                </a>
                            </div>
                            {/* Collect the nav links, forms, and other content for toggling */}
                            <div
                                className="navbar-collapse collapse"
                                role="navigation"
                                aria-expanded="true"
                                id="app-navigation"
                            >
                                <ul className="nav navbar-nav">
                                    <li className={this.props.component === HOME ? "active" : ""}>
                                        <a href="true" onClick={this.onRedirectHome} data-toggle="dropdown active">
                                            Trang chủ
                                        </a>
                                    </li>
                                    
                                    <li className={this.props.component === NEWS ? "active" : ""}>
                                        <a href="true" onClick={this.onChangePassword}>
                                            Đổi mật khẩu
                                        </a>
                                    </li>
                                    <li className={this.props.component === ABOUT ? "active" : ""}>
                                        <a href="true" onClick={this.onAddAccount}>
                                            Thêm nhân viên
                                        </a>
                                    </li>
                                    <li className={this.props.component ===  ABOUT? "active" : ""}>
                                        <a href="true" onClick={this.onListEmployee}>
                                            Danh sách nhân viên
                                        </a>
                                    </li>
                                    
                                </ul>
                                <ul className="nav navbar-nav navbar-right rightside-navbar">
                                    {/* <li>
                                        <a href="true" onClick={this.onSubmitProperty} className="button" style={{ marginRight: '5px' }}>
                                            Đăng bài
                                        </a>
                                    </li> */}

                                    {this.onAfterLogin(token)}
                                   
                                </ul>
                            </div>
                        </nav>
                    </div>
                </header>
            </div>


        );
    }
}

export default withRouter(HeaderCompany);