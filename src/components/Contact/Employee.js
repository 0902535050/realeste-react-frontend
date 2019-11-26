import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Employee extends Component {
    render() {
        let employee = this.props.employee;
        // let employee = info.employee
        // let company =
        //     <li>
        //         <strong>Công ty:</strong>Nhà môi giới tự do
        //     </li>;
        let address =
            <li>
                <strong>Địa chỉ:</strong>Đang cập nhật
            </li>;
        let mobile =
            <li>
                <strong>Điện thoại:</strong>Đang cập nhật
            </li>;
        let url = ''
        if (employee) {
            // if (employee.company !== "0") {
            //     company =
            //         <li>
            //             <strong>Công ty:</strong>{employee.company}
            //         </li>
            // }
            if (employee.address !== '') {
                address =
                    <li>
                        <strong>Địa chỉ:</strong>{employee.address}
                    </li>
            }
            if (employee.phone !== '') {
                mobile =
                    <li>
                        <strong>Điện thoại:</strong>{employee.phone}
                    </li>
            }
            url = `/agentdetail/${employee._id}/1`;
        }
        return (
            <Link to={url}>
                <div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        {/* Agent box 2start */}
                        <div className="agent-2 clearfix" style={{ height: 'auto' }}>
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 agent-theme-2">
                                <img src={employee.avatar} style={{ height: '100%' , width: "100%", padding: "20px" }} alt="team-2" className="img-responsive" />
                                {/* social list */}
                            </div>
                            <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 agent-content" style={{ padding: '15px 15px 15px 15px' }}>
                                <h3>
                                    {employee.fullname}
                                </h3>
                                <ul>
                                    {address}
                                    <li>
                                        <strong>Email:</strong> {employee.email}
                                    </li>
                                    {mobile}
                                    <li>
                                        <strong>Số bài đăng:</strong> {employee.totalProject}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* Agent box 2 end */}
                    </div>
                </div>
            </Link>
        );
    }
}

export default Employee;