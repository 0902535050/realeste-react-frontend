import React, { Component } from 'react'
import Info from '../components/Profile/Info'
import Footer from '../components/Footer'
import SingleProperty from '../components/Profile/SingleProperty'
import { MY_PROPERTIES } from '../constants/Profile';
import { Link, Redirect } from 'react-router-dom'
import MainHeader from '../components/MainHeader';
import { connect } from 'react-redux'
import * as actions from '../actions/request';
import { Pagination, Empty, Spin, Icon } from 'antd'

const Options = [
    { value: '0', label: 'Thông thường' },
    { value: '1', label: 'Bất động sản bán' },
    { value: '2', label: 'Bất động sản cho thuê' },
    { value: '3', label: 'Bài đăng chưa kiểm duyệt' },

];
const antIcon = <Icon type="loading" style={{ fontSize: 40 }} spin />
const pageSize = 10

class MyEstateList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            current: 1,
            option: Options[0].value,
            loading: false
        }
    }

    handleOnChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value,
        });
    }

    componentDidMount = async () => {
        await this.setState({ loading: true })
        await this.props.onGetEstateListOfUser(`${this.state.current}`)
        await this.setState({ loading: false })
    }

    onChange = async (page) => {
        // console.log(page)
        await this.setState({ current: page, loading: true })
        await this.props.onGetEstateListOfUser(`${page}`)
        await this.setState({ loading: false })
    }
    render() {
        let { estatesListOfUser } = this.props
        let { option } = this.state
        // console.log(estatesListOfUser)

        return (
            localStorage.getItem('res') ?
                <div>
                    <MainHeader />
                    {/* Sub banner start */}
                    <div className="sub-banner overview-bgi">
                        <div className="overlay">
                            <div className="container">
                                <div className="breadcrumb-area">
                                    <h1>Bài đăng của tôi</h1>
                                    <ul className="breadcrumbs">
                                        <li><Link to="/">Trang chủ</Link></li>
                                        <li className="active">Bài đăng của tôi</li>
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
                                    <Info component={MY_PROPERTIES} />
                                </div>
                                <div className="col-lg-8 col-md-8 col-sm-12">
                                    <div className="main-title-2">
                                        <h1><span>Bài đăng</span> của tôi</h1>
                                    </div>
                                    <br></br>
                                    <div className="form-group" style={{ marginRight: '20px', float: "right" }}  >
                                        <select className="form-control"
                                            name="option"
                                            value={option}
                                            onChange={this.handleOnChange}
                                            id="opt"
                                            style={{ fontSize: '12px', width: "200px" }}
                                        >
                                            <option style={{ display: "none" }}>---Chọn trạng thái---</option>
                                            {Options.map((option, index) => <option key={index} value={option.value}>{option.label}</option>)}
                                        </select>
                                    </div>

                                    {/* table start */}
                                    {this.state.loading ? <Spin
                                        indicator={antIcon}
                                        style={{
                                            position: "absolute",
                                            left: "50%",
                                            top: "300px",
                                            marginRight: "-50%",
                                        }}
                                    /> :
                                        <table className="manage-table responsive-table">
                                            <tbody>
                                                {this.onShowEstateListOfUser(estatesListOfUser)}
                                            </tbody>
                                        </table>}
                                    <br></br>
                                    <div className="pull-right">
                                        {estatesListOfUser.length !== 0 ?
                                            <Pagination
                                                // size="small"
                                                current={this.state.current}
                                                total={JSON.parse(localStorage.getItem('res')).user.totalProject}
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
    onShowEstateListOfUser = (estates) => {
        var result = null;
        if (estates.length > 0) {
            if (this.state.option === '1') {
                estates = estates.filter(project => project.statusProject === 1);
            }
            else if (this.state.option === '2') {
                estates = estates.filter(project => project.statusProject === 3)
            }
            else if (this.state.option === '3') {
                estates = estates.filter(project => project.verify === false)
            }
            // des = `Hiện đang có ${estates.length} bài đăng`
            result = estates.map((estate, index) => {
                return (
                    <SingleProperty
                        key={index}
                        estateListOfUser={estate}
                    />
                )
            }
            )
        }
        else if (estates.length === 0 || estates === undefined) {
            result = (<Empty />)
        }
        return result;
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onGetEstateListOfUser: (page) => dispatch(actions.actGetEstateListOfUserRequest(page))
    }
}

const mapStateToProps = (state) => {
    return {
        estatesListOfUser: state.estatesListOfUser
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyEstateList)
