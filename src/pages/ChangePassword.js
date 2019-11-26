import React, { Component } from 'react'
import Footer from '../components/Footer'
import Info from '../components/Profile/Info'
import { CHANGE_PASSWORD } from '../constants/Profile';
import {Link} from 'react-router-dom'
import MainHeader from '../components/MainHeader';

export default class ChangePassword extends Component {
    render() {
        return (
            <div>
                <MainHeader />
                <div>
                    {/* Sub banner start */}
                    <div className="sub-banner overview-bgi">
                        <div className="overlay">
                            <div className="container">
                                <div className="breadcrumb-area">
                                    <h1>Change Password</h1>
                                    <ul className="breadcrumbs">
                                        <li><Link to="/">Home</Link></li>
                                        <li className="active">Change Password</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Sub Banner end */}
                    {/* Change password start */}
                    <div className="content-area change-password">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-4 col-md-4 col-sm-12">
                                    <Info component={CHANGE_PASSWORD}/> 
                                </div>
                                <div className="col-lg-8 col-md-8 col-sm-7">
                                    {/* My address start */}
                                    <div className="my-address">
                                        <div className="main-title-2">
                                            <h1><span>Change</span> Password</h1>
                                        </div>
                                        <form action="http://themevessel-item.s3-website-us-east-1.amazonaws.com/nest/index.html" method="GET">
                                            <div className="form-group">
                                                <label>Current Password</label>
                                                <input type="password" className="input-text" name="current password" placeholder="Current Password" />
                                            </div>
                                            <div className="form-group">
                                                <label>New Password</label>
                                                <input type="password" className="input-text" name="new-password" placeholder="New Password" />
                                            </div>
                                            <div className="form-group">
                                                <label>Confirm New Password</label>
                                                <input type="password" className="input-text" name="confirm-new-password" placeholder="Confirm New Password" />
                                            </div>
                                            <a href="submit-property.html" className="btn button-md button-theme">Save Changes</a>
                                        </form>
                                    </div>
                                    {/* My address end */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Change password end */}
                </div>
                <Footer />
            </div>
        )
    }
}
