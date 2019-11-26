import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';

class Header extends Component {
    onLogin = (e) => {
        e.preventDefault();
        this.props.history.push('/login');
    }
    onHandleProfile = (e) => {
        e.preventDefault();
        this.props.history.push('/profile');
    }
    render() {
        return (
            <div>
                <header className="top-header hidden-xs" id="top">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                <div className="list-inline">
                                    <a href="tel:1-8X0-666-8X88">
                                        <i className="fa fa-phone" />1-8X0-666-8X88
                                     </a>
                                    <a href="tel:info@themevessel.com">
                                        <i className="fa fa-envelope" />info@themevessel.com
                                </a>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                <ul className="top-social-media pull-right">
                                    <li>
                                        <a href="true" onClick={this.onLogin} className="sign-in">
                                            <i className="fa fa-sign-in" /> Login
                                        </a>
                                    </li>
                                    <li>
                                        <a href="true" onClick={this.onHandleProfile} className="sign-in">
                                            <i className="fa fa-user" /> Account
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}

export default (withRouter(Header));