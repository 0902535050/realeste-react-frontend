/* eslint-disable */
import React, { Component } from 'react';
import MainHeader from '../../components/MainHeader'
import Footer from '../../components/Footer'
import { withRouter } from 'react-router-dom'
import { service } from '../../actions/service'
import { message, PageHeader } from 'antd'
const loading = "data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==";
class VerifyEmployee extends Component {
    constructor(props) {
        super(props);

        this.state = {
            idCompany: this.props.match.params.idc,
            idEmployee: this.props.match.params.ide,
            hash: this.props.match.params.hash,
            isLoading: true,
            success: false,
        };
    }
    componentDidMount() {
        if (localStorage.getItem('res')) {
            this.props.history.push('/')
        }
        else if (localStorage.getItem('company')) {
            this.props.history.push('/company/profile-admin')
        }
        const postParam = {
            company: this.state.idCompany,
            id: this.state.idEmployee,
            hash: this.state.hash,
        }
        // console.log(postParam);
        service.verifyEmployee(postParam)
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        isLoading: false,
                        success: true,
                    })
                    message.success('Xác nhận thành công')
                }
            })
            .catch(err => {
                // console.log(err)
                this.setState({
                    isLoading: false,
                    success: false,
                })
                message.error('Lỗi, mời bạn vui lòng thử lại')
            })
    }
    onLogin = (e) => {
        e.preventDefault();
        this.props.history.push('/login')
    }
    render() {

        return (
            <div>
                <MainHeader />
                <div className="container">
                    <div className="verify" style={{ height: '50px', paddingTop: '10px', paddingLeft: '10px', marginTop: '70px', backgroundColor: 'lightblue' }}>
                        <h3>Xác thực tài khoản nhân viên</h3>
                    </div>
                    {!this.state.isLoading && this.state.success ?
                        <div className="jumbotron">
                            <h4>Xác thực thành công</h4>
                            <p style={{ fontSize: '16px' }}>Tài khoản đã được xác thực thành công, hãy đăng nhập để tiếp tục sử dụng dịch vụ</p>
                            <button style={{ width: '100px' }} type="button" class="btn btn-block btn-primary" onClick={this.onLogin}>Đăng nhập</button>
                        </div> :
                        <div>
                            {!this.state.isLoading && !this.state.success ?
                                <div className="jumbotron">
                                    <h4>Lỗi xác thực</h4>
                                    <p style={{ fontSize: '16px' }}>Tài khoản không tồn tại hoặc đã được xác thực, vui lòng kiểm tra lại</p>
                                </div> :
                                <div className="jumbotron">
                                    <h4>Vui lòng chờ trong giây lát ...</h4>
                                    <img src={loading} alt="" />
                                </div>
                            }
                        </div>
                    }
                </div>
                <Footer />
            </div>
        );
    }
}

export default withRouter(VerifyEmployee);