import React, { Component } from 'react';

import HeaderCompany from '../../components/Company/HeaderCompany'
// import Footer from '../../components/Footer'
import InfoCompany from '../../components/Company/ProfileCompany/InfoCompany'
import { LIST_EMPLOYEES } from '../../constants/Company/profileCompany'
// import FollowingProject from '../components/My Properties/FollowingProject'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../actions/Company/requestCompany';
import { Table, Tag, message, Spin } from 'antd';
class ListEmployees extends Component {
    constructor(props) {
        super(props);
        // this.props.actGetInfoUserCompany();
        this.state = {
            page: 1,
        };
    }
    componentDidMount() {
        if (localStorage.getItem('company')) {
            let company = JSON.parse(localStorage.getItem('company'));
            this.props.actGetInfoUserCompany(company.id);
        }
        else {
            this.props.history.push('/company/login')
        }
    }
    render() {
        let auth = this.props.auth;
        if (auth === false) {
            message.error('Bạn đã hết phiên đăng nhập. Vui lòng đăng nhập lại')
            this.props.history.push('/company/login')
        }
        else if (auth === true) {
            let dataSource = [];
            let { employees } = this.props
            if (employees !== []) {
                dataSource = employees
            }
            const columns = [
                {
                    title: 'Họ tên',
                    dataIndex: 'employee.fullname',
                    key: 'employee.fullname',
                    sorter: (a, b) => a.employee.fullname > b.employee.fullname,
                    sortDirections: ['descend', 'ascend'],
                    // width: '25%',
                    fixed: 'left',
                },
                {
                    title: 'Email',
                    dataIndex: 'employee.email',
                    key: 'employee.email',
                    // width: '25%',
                },
                {
                    title: 'Số tin',
                    dataIndex: 'employee.totalProject',
                    key: 'employee.totalProject',
                    sorter: (a, b) => a.employee.totalProject > b.employee.totalProject,
                    // width: '10%',
                    render: tag => <Tag color={'green'} key={tag}>{tag}</Tag>
                },
                {
                    title: 'Trạng thái tài khoản',
                    dataIndex: 'employee.verify',
                    filters: [
                        {
                            text: 'Đã kích hoạt',
                            value: true,
                        },
                        {
                            text: 'Chưa kích hoạt',
                            value: false,
                        },
                    ],
                    filterMultiple: false,
                    // width: '15%',
                    onFilter: (value, record) => record.employee.verify === value,
                    key: 'employee.verify',
                    render: verify => {
                        let color = verify === true ? 'geekblue' : 'red'
                        return <Tag color={color} key={verify}>{verify === true ? 'Đã kích hoạt' : 'Chưa kích hoạt'}</Tag>
                    }

                },
                {
                    title: 'Tình trạng',
                    dataIndex: 'employee.lock',
                    key: 'employee.lock',
                    filters: [
                        {
                            text: 'Đã bị khóa',
                            value: true,
                        },
                        {
                            text: 'Không bị khóa',
                            value: false,
                        },
                    ],
                    filterMultiple: false,
                    onFilter: (value, record) => record.employee.lock === value,

                    render: lock => {
                        let color = lock === true ? 'red' : 'green'
                        return <Tag color={color} key={lock}>{lock === true ? 'Đã bị khóa' : 'Không bị khóa'}</Tag>
                    },
                    // width: '15%',
                    // fixed: 'right',
                },
            ]

            return (
                <div>
                    <HeaderCompany />
                    {/* Sub banner start */}
                    <div className="sub-banner overview-bgi">
                        <div className="overlay">
                            <div className="container">
                                <div className="breadcrumb-area">
                                    <h1>Danh sách nhân viên</h1>
                                    <ul className="breadcrumbs">
                                        <li><Link to="/company/profile-admin">Trang chủ</Link></li>
                                        <li className="active">Danh sách nhân viên</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Sub Banner end */}

                    {/* My Propertiess start */}
                    <div className="content-area my-properties">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-4 col-md-4 col-sm-12">
                                    <InfoCompany component={LIST_EMPLOYEES} />
                                </div>
                                <div className="col-lg-8 col-md-8 col-sm-12">
                                    <div className="main-title-2">
                                        <h1><span>Danh sách nhân viên</span></h1>
                                    </div>
                                    {/* table start */}

                                    <Table dataSource={dataSource} columns={columns} scroll={{ x: '115%' }}
                                        onRow={(record, rowIndex) => {
                                            return {
                                                onClick: (event) => {
                                                    // console.log(record)
                                                    this.props.history.push(`info-employee/${record.employee._id}/1`)
                                                },
                                            }
                                        }}
                                    >
                                    </Table>

                                    {/* table end */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* My Propertiess end */}
                    {/* <Footer /> */}
                </div>
            );
        }
        return (
            <div style={{ textAlign: 'center', padding: '100px' }}>
                <Spin tip="Loading...">

                </Spin>
            </div>
        );
    }
}

const mapDispathToProp = (dispatch) => {
    return {
        actGetInfoUserCompany: (id) => dispatch(actions.actGetInfoUserCompany(id))
    }
}
const mapStateToProp = (state) => {
    return {
        userCompany: state.userCompany,
        employees: state.employees,
        auth: state.auth,
    }
}
export default connect(mapStateToProp, mapDispathToProp)(ListEmployees)
