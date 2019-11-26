import React, { Component } from 'react';
import MainHeader from '../../components/MainHeader';
// import InfoEstateOfAgent from '../../components/ContactDetail/InfoEstateOfAgent';
import SidebarAgentDetail from '../../components/ContactDetail/SidebarAgentDetail';
import * as actions from '../../actions/Contact/requestContact';
import { connect } from 'react-redux';
import Employee from '../../components/Contact/Employee';
import { Pagination } from 'antd';
import {Link} from 'react-router-dom'
import moment from 'moment'
const pageSize = 5
const Options = [
    { value: '0', label: 'Sắp xếp theo' },
    { value: '1', label: 'Ít bài đăng nhất' },
    { value: '2', label: 'Nhiều bài đăng nhất' },

];
class CompanyDetail extends Component {
    constructor(props) {
        super(props);
        this.props.reqGetInfoCompany(this.props.match.params.id);
        this.state = {
            current: 1,
            pageEmployee: [],
            option: Options[0].value,
        }
    }
    onChange = page => {
        this.setState({
            current: page,
        });
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
        this.props.reqGetInfoCompany(this.props.match.params.id);
        
    }
    render() {
        let { option } = this.state;
        let company = this.props.info;
        let { employees } = this.props;
        let total = 1
        let list = []
        let current = this.state.current
        let offset = (current - 1) * pageSize;
        let des = 'Hiện chưa có nhân viên'
        let listEmployees = 'Không có nhân viên'
        if (employees.length > 0) {
            if (option === '1') {
                employees = employees.sort((a, b) => (a.totalProject - b.totalProject))
            }
            else if (option === '2') {
                employees = employees.sort((a, b) => (b.totalProject - a.totalProject))
            }
            total = employees.length
            des = `Hiện đang có ${employees.length} nhân viên`
            list = employees.slice(offset, current * pageSize)
            listEmployees = list.map((employee, index) => {
                return (
                    <Employee
                        key={index}
                        employee={employee.employee}
                    />
                )
            }
            )
        }
        let mobile = 'Đang cập nhật'
        if (company.phone !== '') {
            mobile = company.phone
        }
        let address = 'Đang cập nhật'

        if (company.address !== '') {
            address = company.address
        }
        return (
            <div>
                <MainHeader />
                {/* Sub banner start */}
                <div className="sub-banner overview-bgi" >
                    <div className="overlay">
                        <div className="container">
                            <div className="breadcrumb-area">
                                <h1>Thông tin công ty</h1>
                                <ul className="breadcrumbs">
                                    <li><Link to='/'>Trang chủ</Link></li>
                                    <li className="active">Thông tin công ty</li>
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
                                <div className="agent-detail clearfix" style={{ height: '300px' }}>
                                    <div className="col-lg-5 col-md-6 col-sm-5 agent-theme">
                                        <img src={company.avatar} alt="agent-1" className="img-responsive" style={{ height: '300px', width: '300px' }} />
                                    </div>
                                    <div className="col-lg-7 col-md-6 col-sm-7 agent-content clearfix">
                                        {/* <h5>Creative Director</h5> */}
                                        <h3>
                                            {company.companyname}
                                        </h3>
                                        {/* Address list */}
                                        <ul className="address-list">

                                            <li>
                                                <span>
                                                    <i className="fa fa-envelope" />Email:
                                                </span>
                                                {company.email}
                                            </li>

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
                                                <i className="fa fa-calendar" />Tham gia:
                                                    
                                                </span>
                                                {moment.unix(company.createTime).format('DD/MM/YYYY')}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {/* Agent detail end */}
                                <div className="sidebar-widget clearfix biography">
                                    {/* Main Title 2 */}
                                    <div className="main-title-2">
                                        <h1><span>Mô tả</span></h1>
                                    </div>

                                    <p style={{whiteSpace: 'pre-wrap',WebkitBoxOrient: 'vertical', overflow:'scroll'}}>
                                        {company.description}
                                    </p>

                                    <br />
                                    
                                </div>
                                {/* Recently properties start */}
                                <div className="recently-properties">
                                    {/* Main title */}
                                    <div className="main-title-2">
                                        <h1><span>Danh sách nhân viên</span> </h1>
                                    </div>
                                    {/* Option bar start */}
                                    <div className="option-bar">
                                        <div className="row">
                                            <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                                                <h4>
                                                    <span className="heading-icon">
                                                        <i className="fa fa-th-list" />
                                                    </span>
                                                    <span className="hidden-xs">Danh sách nhân viên</span>
                                                </h4>
                                            </div>
                                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12" style={{ padding: '7px 5px 7px 30px' }}>
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
                                    {/* Option bar end */}
                                    <div className="clearfix" />
                                    <h4>{des}</h4>
                                    <div className="row">
                                        {listEmployees}
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <Pagination current={this.state.current} pageSize={pageSize} onChange={this.onChange} total={total} />

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
        reqGetInfoCompany: (id) => dispatch(actions.reqGetInfoCompany(id))
    }
}
const mapStateToProp = (state) => {
    return {
        info: state.infoCompany,
        employees: state.employees,
        totalPage: state.totalPage
    }
}
export default connect(mapStateToProp, mapDispathToProp)(CompanyDetail);