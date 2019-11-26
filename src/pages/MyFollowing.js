import React, { Component } from 'react'
import * as actions from './../actions/request'
import MainHeader from '../components/MainHeader'
import Footer from '../components/Footer'
import Info from '../components/Profile/Info'
import { MY_FOLLOWING } from '../constants/Profile'
import FollowingProject from '../components/My Properties/FollowingProject'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
// import Login from '../pages/Login'
import { Empty, Pagination, Spin, Icon } from 'antd'

const pageSize = 5
const antIcon = <Icon type="loading" style={{ fontSize: 40 }} spin />

class MyFollowing extends Component {
    constructor(props) {
        super(props)

        this.state = {
            current: 1,
            loading: false
        }
    }

    componentDidMount = async () => {
        await this.setState({ loading: true })
        await this.props.onGetFollowingList()
        await this.setState({ loading: false })
    }

    onChange = async (page) => {
        // console.log(page)
        this.setState({ current: page })
    }

    onUnfollowProject = (data) => {
        this.props.onUnfollowProject(data)
    }
    render() {
        let { follow } = this.props
        // console.log(follow)
        return (
            localStorage.getItem('res') ?
                <div>
                    <MainHeader />
                    {/* Sub banner start */}
                    <div className="sub-banner overview-bgi">
                        <div className="overlay">
                            <div className="container">
                                <div className="breadcrumb-area">
                                    <h1>Danh sách theo dõi</h1>
                                    <ul className="breadcrumbs">
                                        <li><Link to="/">Trang chủ</Link></li>
                                        <li className="active">Danh sách theo dõi</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Sub Banner end */}

                    {/* My Propertiess start */}
                    <div className="content-area-7 my-properties">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-4 col-md-4 col-sm-12">
                                    <Info component={MY_FOLLOWING} />
                                </div>
                                <div className="col-lg-8 col-md-8 col-sm-12">
                                    <div className="main-title-2">
                                        <h1>
                                            <span>Danh sách theo dõi</span>
                                        </h1>
                                    </div>
                                    <br></br>
                                    {/* table start */}
                                    {this.state.loading ? <Spin
                                        indicator={antIcon}
                                        style={{
                                            position: "absolute",
                                            left: "50%",
                                            top: "100%",
                                            marginRight: "-50%",
                                        }}
                                    /> :
                                        <table className="manage-table responsive-table">
                                            <tbody>
                                                {this.ShowFollowingList(follow)}
                                            </tbody>
                                        </table>}
                                    <br></br>
                                    <div className="pull-right">
                                        {follow.length !== 0 ?
                                            <Pagination
                                                // size="small"
                                                current={this.state.current}
                                                total={follow.length}
                                                onChange={this.onChange}
                                                pageSize={pageSize}
                                            />
                                            : null}
                                    </div>
                                    {/* table end */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* My Propertiess end */}
                    <Footer />
                </div> : <Redirect to={`/login`} />
        )
    }

    ShowFollowingList = (follow) => {
        var result = null;
        if (follow.length > 0) {
            result = follow.map((single, index) => {
                if (single.project !== null)
                    return (
                        <FollowingProject key={index} followSingle={single} onUnfollowProject={this.onUnfollowProject} />
                    );
            });
        }
        else if (follow.length === 0 || follow === undefined) {
            result = (<Empty />)
        }
        return result;
    }
}
const mapDispathToProp = (dispatch) => {
    return {
        onGetFollowingList: () => dispatch(actions.actGetFollowingListRequest()),
        onUnfollowProject: (data) => dispatch(actions.actUnfollowProjectRequest(data))
    }
}
const mapStateToProp = (state) => {
    return {
        follow: state.follow
    }
}
export default connect(mapStateToProp, mapDispathToProp)(MyFollowing)
