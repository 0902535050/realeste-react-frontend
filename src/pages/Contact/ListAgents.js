import React, { Component } from 'react';
import MainHeader from '../../components/MainHeader'
import Agent from '../../components/Contact/Agent'
import Footer from '../../components/Footer'
import * as actions from '../../actions/Contact/requestContact';
import { connect } from 'react-redux';
import { Pagination } from 'antd';
import {withRouter}from 'react-router-dom'
const pageSize = 10

const Options = [
    { value: '0', label: 'Sắp xếp theo' },
    { value: '1', label: 'Ít bài đăng nhất' },
    { value: '2', label: 'Nhiều bài đăng nhất' },

];
class ListAgents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            current: Number(this.props.match.params.page),
            option: Options[0].value,
        }
        this.props.reqGetListAgents(this.props.match.params.page);
    }
    onChange = page => {
        this.setState({
            current: page,
        });
        this.props.history.push(`/agents/${page}`);
        this.props.reqGetListAgents(page);
    };
    onRedirectHome = (e) => {
        e.preventDefault();
        this.props.history.push('/');
    }
    componentDidMount() {
        if (localStorage.getItem('company')) {
            this.props.history.push('/company/profile-admin')
        }
        else {
            this.props.reqGetListAgents(this.props.match.params.page);
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
    render() {
        let { option } = this.state;
        let current = this.state.current
        let total = this.props.totalPage
        
        let { agents } = this.props;
       
        let des = ''
        let listAgents = <h5 style={{ marginLeft: '15px' }}>Không có nhà môi giới nào</h5>;
        if (agents.length > 0) {
            if (option === '1') {
                agents = agents.sort((a, b) => (a.totalProject - b.totalProject))
            }
            else if (option === '2') {
                agents = agents.sort((a, b) => (b.totalProject - a.totalProject))
            }
            
            des = `Hiện đang có ${total} nhà môi giới đang hoạt động trên hệ thống`
            listAgents = agents.map((agent, index) => {
                return (
                    <Agent
                        key={index}
                        agent={agent}
                    />
                )
            }
            )
        }
        return (
            <div>
                <MainHeader />
                {/* Agent section start */}
                <div className="sub-banner overview-bgi">
                    <div className="overlay">
                        <div className="container">
                            <div className="breadcrumb-area">
                                <h1>Danh sách nhà môi giới</h1>
                                <ul className="breadcrumbs">
                                    <li><a href="true" onClick={this.onRedirectHome}>Trang chủ</a></li>
                                    <li className="active">Danh sách nhà môi giới</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="agent-section content-area" style={{ backgroundColor: '#ebebeb' }}>
                    <div className="container">
                        {/* option bar start */}
                        <div className="option-bar">
                            <div className="row">
                                <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                                    <h4>
                                        <span className="heading-icon">
                                            <i className="fa fa-th-list" />
                                        </span>
                                        <span className="hidden-xs">Danh sách nhà môi giới</span>
                                    </h4>
                                </div>
                                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12" style={{ padding: '7px 5px 7px 30px' }}>
                                    <div className="form-group" style={{ marginRight: '20px' }}>
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
                        {/* option bar end */}
                        <div className="clearfix"></div>
                        <div><h4>{des}</h4></div>
                        <div className="row">
                            {listAgents}
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <Pagination current={current} pageSize={pageSize} onChange={this.onChange} total={total} />

                        </div>
                    </div>
                </div>
                {/* Agent section end */}
                <Footer />
            </div>
        );
    }
}


const mapDispathToProp = (dispatch) => {
    return {
        reqGetListAgents: (page) => dispatch(actions.reqGetListAgents(page))
    }
}
const mapStateToProp = (state) => {
    return {
        agents: state.agents,
        totalPage: state.totalPage
    }
}

export default connect(mapStateToProp, mapDispathToProp)(withRouter(ListAgents));
