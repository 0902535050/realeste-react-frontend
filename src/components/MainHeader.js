import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { HOME, NEWS, ABOUT, LIST_ESTATES } from '../constants/Navbar'
// import Logo from '../logo_RE-01.png'
// import { PROFILE, MY_PROPERTIES, MY_FOLLOWING, MY_TRANSACTION, MY_TRANSACTION_HISTORY, WAITING_REQUEST } from '../constants/Profile'
// const src = "https://res.cloudinary.com/huantd/image/upload/v1561783181/logo/logo_RE-01_fteok3.png"

class MainHeader extends Component {
    constructor() {
        super();
        this.state = {
            username: null,
            token: 'abc',
            src: ""
        };
    }

    onSubmitProperty = (e) => {
        e.preventDefault();
        this.props.history.push('/submitproperty');

    }
    onRedirectHome = (e) => {
        e.preventDefault();
        this.props.history.push('/');
    }
    onAboutUs = (e) => {
        e.preventDefault();
        this.props.history.push('/about')
    }
    onNews = (e) => {
        e.preventDefault();
        this.props.history.push('/news')
    }
    onContactAgent = (e) => {
        e.preventDefault();
        this.props.history.push('/agents/1')
    }
    onContactCompany = (e) => {
        e.preventDefault();
        this.props.history.push('/companies/1')
    }
    onLogin = (e) => {
        e.preventDefault();
        this.props.history.push('/login');
    }
    onListEstate = (e) => {
        e.preventDefault();
        this.props.history.push('/estatelistview')
    }
    onHandleProfile = (e) => {
        e.preventDefault();
        let token = JSON.parse(localStorage.getItem('res'));
        // console.log(token.googleId);
        // console.log(this.state.token);
        if (token.user._id) {
            this.props.history.push(`/profile`);
        }

    }

    onProfile = (e) => {
        e.preventDefault()
        this.props.history.push(`/profile`)
    }

    onMyProperty = (e) => {
        e.preventDefault()
        this.props.history.push(`/myproperties`)
    }

    onMyFollowing = (e) => {
        e.preventDefault()
        this.props.history.push(`/myfollowing`)
    }

    onMyTransaction = (e) => {
        e.preventDefault()
        this.props.history.push(`/mytransactions`)
    }

    // onTransactionHistory = (e) => {
    //     e.preventDefault()
    //     this.props.history.push(`/transhistory`)
    // }

    onWaitingList = (e) => {
        e.preventDefault()
        this.props.history.push(`/waiting`)
    }
    onSignOut = (e) => {
        e.preventDefault();
        this.props.history.push('/');
        localStorage.removeItem('res');
    }

    onChangePassword = (e) => {
        e.preventDefault();
        this.props.history.push('/changepassword');
    }

    onGetName = (name) => {
        if (name.indexOf(' ') !== -1)
            return name.slice(0, name.indexOf(' '))
        else return name
    }
    onAfterLogin = (token) => {
        if (token !== null)
            return null
        else if (token === null)
            return (
                <li>
                    <a href="true" onClick={this.onLogin} className="button" style={{ marginRight: '5px', color: "#1B419A" }} name='loginButton'>
                        <i className="fa fa-sign-in" /> Đăng nhập
                    </a>
                </li>
            );
    }
    
    render() {
        var token = localStorage.getItem('res')
        // console.log(token)
        
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
                                <Link to="/">
                                    <img style={{ height: '70px', width: '124px',marginTop:'0px' }} src="https://res.cloudinary.com/huantd/image/upload/v1561783181/logo/logo_RE-01_fteok3.png" alt="logo" />
                                </Link>
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
                                    <li className={this.props.component === ABOUT ? "active" : ""}>
                                        <a href="true" onClick={this.onAboutUs}>
                                            Về chúng tôi
                                        </a>
                                    </li>
                                    <li className={this.props.component === NEWS ? "active" : ""}>
                                        <a href="true" onClick={this.onNews}>
                                            Tin tức
                                        </a>
                                    </li>
                                    <li className={this.props.component === LIST_ESTATES ? "active" : ""}>
                                        <a href="true" onClick={this.onListEstate}>
                                            Danh sách
                                        </a>
                                    </li>
                                    <li className="dropdown">
                                        <a
                                            href="true"
                                            tabIndex={0}
                                            data-toggle="dropdown"
                                            data-submenu
                                            aria-expanded="false"

                                        >
                                            Danh bạ <span className="caret" />
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li >
                                                <a onClick={this.onContactAgent} href="true" tabIndex={0}>Nhà môi giới</a>

                                            </li>
                                            <li >
                                                <a onClick={this.onContactCompany} href="true" tabIndex={0}>Công ty</a>

                                            </li>

                                        </ul>
                                    </li>
                                    {
                                        localStorage.getItem('res')
                                            ?
                                            <li className="dropdown" name='dropdownAccount'>
                                                <a
                                                    href="true"
                                                    tabIndex={0}
                                                    data-toggle="dropdown"
                                                    data-submenu
                                                    aria-expanded="false"
                                                    style={{ color: "#1B419A" }}
                                                    name='accountDetail'
                                                >
                                                    Xin chào, {this.onGetName(JSON.parse(localStorage.getItem('res')).user.fullname)} <span className="caret" />
                                                </a>
                                                <ul className="dropdown-menu" >
                                                    <li >
                                                        <a onClick={this.onProfile} href="true" tabIndex={0}>Chỉnh sửa thông tin cơ bản</a>

                                                    </li>
                                                    {JSON.parse(localStorage.getItem('res')).user.statusAccount === 2 ?
                                                        <li>
                                                            <a href="true" onClick={this.onChangePassword} tabIndex={0} >
                                                                Đổi mật khẩu
                                                            </a>
                                                        </li> : null
                                                    }
                                                    <li >
                                                        <a onClick={this.onMyProperty} href="true" tabIndex={0}>Bài đăng của tôi</a>
                                                    </li>
                                                    <li >
                                                        <a onClick={this.onMyFollowing} href="true" tabIndex={0}>Bài đăng yêu thích</a>

                                                    </li>
                                                    <li >
                                                        <a onClick={this.onMyTransaction} href="true" tabIndex={0}>Giao dịch của tôi</a>

                                                    </li>
                                                    {/* <li >
                                                        <a onClick={this.onTransactionHistory} href="true" tabIndex={0}>Lịch sử giao dịch</a>

                                                    </li> */}
                                                    <li >
                                                        <a onClick={this.onWaitingList} href="true" tabIndex={0}>Danh sách yêu cầu</a>

                                                    </li>
                                                    <li >
                                                        <a onClick={this.onSignOut} href="true" tabIndex={0}>Đăng xuất</a>

                                                    </li>
                                                </ul>
                                            </li>
                                            : null
                                    }
                                    <li>
                                        <a href="true" onClick={this.onSubmitProperty} className="button" style={{ marginRight: '5px', color: "#1B419A" }} name='submitProjectButton'>
                                            Đăng bài
                                        </a>
                                    </li>
                                    {this.onAfterLogin(token)}
                                </ul>
                                {/* <ul className="nav navbar-nav navbar-right rightside-navbar"> */}
                                    

                                    
                                {/* </ul> */}
                            </div>
                        </nav>
                    </div>
                </header>
            </div>
        );
    }
}

export default withRouter(MainHeader);