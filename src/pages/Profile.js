import React, { Component } from 'react';
import Info from '../components/Profile/Info'
import Footer from '../components/Footer';
import MainHeader from '../components/MainHeader';
import { PROFILE } from '../constants/Profile';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/request';
import Detail from '../components/Profile/Detail'
// import Login from '../pages/Login'

class Profile extends Component {
    componentDidMount() {
        // this.props.actGetInfoUser(this.props.match.params.id);
        // console.log(this.props.match.params.id);

    }
    render() {
        let { user } = this.props;
        // console.log(user);
            return (
                localStorage.getItem('res') ?
                <div>
                    <MainHeader />
                    {/* Sub banner start */}
                    <div className="sub-banner overview-bgi">
                        <div className="overlay">
                            <div className="container">
                                <div className="breadcrumb-area">
                                    <h1>Hồ sơ cá nhân của tôi</h1>
                                    <ul className="breadcrumbs">
                                        <li><Link to="/">Trang chủ</Link></li>
                                        <li className="active">Hồ sơ cá nhân của tôi</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Sub Banner end */}
                    <div className="content-area my-profile">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-4 col-md-4 col-sm-12">
                                    <Info component={PROFILE} user={user} />
                                </div>
                                <div className="col-lg-8 col-md-8 col-sm-12">
                                    <Detail user={user} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div> : <Redirect to={`/login`}/>
            );
    }
}

const mapDispathToProp = (dispatch) => {
    return {
        actGetInfoUser: () => dispatch(actions.actGetUserInfoRequest())
    }
}
const mapStateToProp = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProp, mapDispathToProp)(Profile);
