import React, { Component } from 'react';
import { Link } from 'react-router-dom'
class Agent extends Component {
    render() {
        let { agent } = this.props;
        let company =
            <li>
                <strong>Công ty:</strong>Nhà môi giới tự do
            </li>;
        if (agent.company !== "0") {
            company =
                <li>
                    {/* <strong>Công ty:</strong> */}
                </li>
        }
        let address =
            <li>
                <strong>Địa chỉ:</strong>Đang cập nhật
            </li>;
        if (agent.address !== "" && agent.address !== " ") {
            address =
                <li>
                    <strong>Địa chỉ:</strong>{agent.address}
                </li>
        }
        let mobile =
            <li>
                <strong>Điện thoại:</strong>Đang cập nhật
            </li>;
        if (agent.phone !== ' ' && agent.phone !== "") {
            mobile =
                <li>
                    <strong>Điện thoại:</strong>{agent.phone}
                </li>
        }
        let url = `/agentdetail/${agent._id}/1`
        return (
            <Link to={url}>
                <div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        {/* Agent box 2start */}
                        <div className="agent-2 clearfix" style={{ height: '231.3px' }}>
                            <div className="col-lg-5 col-md-5 col-sm-4 col-xs-5 agent-theme-2">
                                <img src={agent.avatar} alt="team-2" className="img-responsive" style={{height:'100%', width: '100%', padding: "20px"}}/>
                                {/* social list */}

                            </div>
                            <div className="col-lg-7 col-md-7 col-sm-8 col-xs-7 agent-content" style={{ padding: '7px 15px 7px 15px' }}>
                                <h3>
                                    {agent.fullname}
                                </h3>
                                <ul style={{marginTop:'-7px'}}>
                                    {address}
                                    <li>
                                        <strong>Email:</strong> {agent.email}
                                    </li>
                                    {mobile}
                                    <li>
                                        <strong>Số bài đăng:</strong> {agent.totalProject}
                                    </li>
                                    {company}
                                    {/* <li>
                                        <strong>Ngày tham gia:</strong> {moment.unix(agent.createTime).format('DD/MM/YYYY, h:mm a')}
                                    </li> */}
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

export default Agent;