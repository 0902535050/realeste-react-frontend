import React, { Component } from 'react';
import MainHeader from '../../components/MainHeader'
import SidebarAgentDetail from '../../components/ContactDetail/SidebarAgentDetail';
import InfoEstateOfAgent from '../../components/ContactDetail/InfoEstateOfAgent';
import * as actions from '../../actions/Contact/requestContact';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import { Pagination } from 'antd'
const pageSize = 10

const Options = [
    { value: '0', label: 'Thông thường' },
    { value: '1', label: 'Bất động sản bán' },
    { value: '2', label: 'Bất động sản cho thuê' },
];

class AgentDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            current: Number(this.props.match.params.page),
            option: Options[0].value,
            id: this.props.match.params.id
        }
        this.props.reqGetInfoAgent(this.props.match.params.id, this.props.match.params.page);
    }
    onChange = page => {
        this.setState({
            current: page,
        });
        this.props.history.push(`/agentdetail/${this.state.id}/${page}`);
        this.props.reqGetInfoAgent(this.props.match.params.id, page);
    };
    handleOnChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value,
        });
    }
    componentDidMount() {
        if (localStorage.getItem('company')) {
            this.props.history.push('/company/profile-admin')
        }
        else {
            this.props.reqGetInfoAgent(this.props.match.params.id, this.props.match.params.page);
        }
    }
    render() {
        let { option } = this.state;
        let { info, projects } = this.props;
        let current = this.state.current
        let total = this.props.totalPage
        let des = 'Hiện chưa có bài đăng'
        let listProjects = ''
        if (projects.length > 0) {
            if (option === '1') {
                projects = projects.filter(project => project.statusProject === 1);
            }
            else if (option === '2') {
                projects = projects.filter(project => project.statusProject === 3)
            }
            // else if(option === '3') {
            // 	agents = agents.sort((a, b) => (a.area - b.area))
            // }
            // else if(option === '4') {
            // 	agents = agents.sort((a, b) => (b.area - a.area))
            // }
            des = `Hiện đang có ${total} bài đăng`
            listProjects = projects.map((project, index) => {
                return (
                    <InfoEstateOfAgent
                        key={index}
                        project={project}
                    />
                )
            }
            )
        }
        let mobile = 'Đang cập nhật'
        if (info.phone !== ' ' && info.phone !== "") {
            mobile = info.phone
        }
        let address = 'Đang cập nhật'

        if (info.address !== ' ' && info.address !== "") {
            address = info.address
        }
        return (
            <div>
                <MainHeader />
                {/* Sub banner start */}
                <div className="sub-banner overview-bgi" >
                    <div className="overlay">
                        <div className="container">
                            <div className="breadcrumb-area">
                                <h1>Thông tin nhà môi giới</h1>
                                <ul className="breadcrumbs">
                                    <li><Link to='/'>Trang chủ</Link></li>
                                    <li className="active">Thông tin nhà môi giới</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Sub Banner end */}

                {/* Agent section start */}
                <div className="agent-section content-area" style={{ backgroundColor: '#ebebeb' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                {/* Agent detail start */}
                                <div className="agent-detail clearfix" style={{ height: '285px' }}>
                                    <div className="col-lg-5 col-md-6 col-sm-5 agent-theme">
                                        <img src={info.avatar} style={{ height: '280px', width: '290px' }} alt="agent-1" className="img-responsive" />
                                    </div>
                                    <div className="col-lg-7 col-md-6 col-sm-7 agent-content" style={{ padding: '20px 10px' }}>
                                        {/* <h5>Creative Director</h5> */}
                                        <h3>
                                            {info.fullname}
                                        </h3>
                                        {/* Address list */}
                                        <ul className="address-list">

                                            <li>
                                                <span>
                                                    <i className="fa fa-envelope" />Email:
                                                </span>
                                                {info.email}
                                            </li>
                                            {/* <li>
                                                <span>
                                                    <i className="fa fa-phone" />Công ty:
                                                </span>
                                                {company}
                                            </li> */}
                                            <li>
                                                <span>
                                                    <i className="fa fa-mobile" />Điện thoại:
                                                </span>
                                                {mobile}
                                            </li>
                                            <li>
                                                <span>
                                                    <i className="fa fa-map-marker" />Địa chỉ:
                                                </span>
                                                {address}
                                            </li>
                                            <li>
                                                <span>
                                                    <i className="fa fa-file" />Bài đăng:
                                                </span>
                                                {info.totalProject}
                                            </li>
                                        </ul>

                                    </div>
                                </div>
                                {/* Agent detail end */}
                                <div className="sidebar-widget clearfix biography">
                                    {/* Main Title 2 */}
                                    <div className="main-title-2">
                                        <h1><span>Giới thiệu</span></h1>
                                    </div>
                                    <div style={{whiteSpace: 'pre-wrap',WebkitBoxOrient: 'vertical', overflow:'scroll'}}  >{info.description}</div>
                                    {/* <p>
                                        {info.description}
                                    </p> */}

                                    <br />

                                </div>
                                {/* Recently properties start */}
                                <div className="recently-properties">
                                    {/* Main title */}

                                    {/* Option bar start */}
                                    <div className="option-bar">
                                        <div className="row">
                                            <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                                                <h4>
                                                    <span className="heading-icon">
                                                        <i className="fa fa-th-list" />
                                                    </span>
                                                    <span className="hidden-xs">Danh sách bài đăng</span>
                                                </h4>
                                            </div>

                                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12" style={{ padding: '7px 5px 7px 30px' }}>
                                                <div className="form-group" style={{ marginRight: '20px' }}  >
                                                    <select className="form-control"
                                                        name="option"
                                                        value={option}
                                                        onChange={this.handleOnChange}
                                                        id="opt"
                                                        style={{ fontSize: '12px' }}
                                                    >
                                                        {Options.map((option, index) => <option key={index} value={option.value}>{option.label}</option>)}

                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="main-title-2">
                                        <h4><span>{des}</span> </h4>
                                    </div>
                                    {/* Option bar end */}
                                    <div className="clearfix" />
                                    <div className="row">
                                        {listProjects}
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <Pagination current={current} pageSize={pageSize} onChange={this.onChange} total={total} />
                                    </div>
                                </div>
                                {/* Partners block end */}
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12  col-xs-12">
                                <SidebarAgentDetail />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Agent section end */}
            </div>
        );
    }
}

const mapDispathToProp = (dispatch) => {
    return {
        reqGetInfoAgent: (id, page) => dispatch(actions.reqGetInfoAgent(id, page))
    }
}
const mapStateToProp = (state) => {
    return {
        info: state.infoAgent,
        projects: state.projectsOfAgent,
        totalPage: state.totalPage
    }
}
export default connect(mapStateToProp, mapDispathToProp)(AgentDetail);