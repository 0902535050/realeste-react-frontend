import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom'
import { Alert } from 'antd'

class Footer extends Component {
    onHome = (e) => {
        e.preventDefault();
        this.props.history.push('/')
    }
    onAbout = (e) => {
        e.preventDefault();
        this.props.history.push('/about')
    }
    onSubmit = (e) => {
        e.preventDefault()
        return (<Alert message="Chức năng này sẽ được cập nhật sau!" type="info" showIcon />)
    }
    onClickSendEmail = () => {
        return (<Alert message=" Chúng tôi đã nhận được email của bạn. Các thông tin mới nhất về BĐS sẽ được gửi đến bạn sớm nhất" type="info" />)
    }
    render() {
        return (
            <div>
                {
                    /* Footer start */
                }
                <footer className="main-footer clearfix">
                    <div className="container">
                        {/* Footer info*/}
                        <div className="footer-info">
                            <div className="row">
                                {/* About us */}
                                <div className="col-lg-5 col-md-5 col-sm-6 col-xs-12">
                                    <div className="footer-item">
                                        <div className="main-title-2">
                                            <h1>Liên hệ với chúng tôi</h1>
                                        </div>
                                        <p>
                                            Chúng tôi là sinh viên khóa 15 Trường đại học Khoa học Tự nhiên
                                            TP.Hồ Chí Minh. Mọi chi tiết thắc mắc, liên hệ quảng cáo, xin vui lòng liên hệ với thông tin đượ
                                            mô tả bên dưới.
                </p>
                                        <ul className="personal-info">
                                            <li>
                                                <i className="fa fa-map-marker" />
                                                Địa chỉ: 227 Nguyễn Văn Cừ, phường 7, quận 5, TP. Hồ Chí Minh
                  </li>
                                            <li>
                                                <i className="fa fa-envelope" />
                                                Email: <a href="mailto:sales@hotelempire.com">
                                                    bcminhtung@gmail.com
                    </a>
                                            </li>
                                            <li>
                                                <i className="fa fa-phone" />
                                                Điện thoại:{" "}
                                                <a href="tel:+55-417-634-7071">+84 989 871 786</a>
                                            </li>
                                            {/* <li>
                                                <i className="fa fa-fax" />
                                                Fax: +55 4XX-634-7071
                  </li> */}
                                        </ul>
                                    </div>
                                </div>
                                {/* Links */}
                                <div className="col-lg-2 col-md-2 col-sm-6 col-xs-12">
                                    <div className="footer-item">
                                        <div className="main-title-2">
                                            <h1>Liên kết</h1>
                                        </div>
                                        <ul className="links">
                                            <li>
                                                <a href="true" onClick={this.onHome}>Trang chủ</a>
                                            </li>
                                            <li>
                                                <a href="true" onClick={this.onAbout}>Về chúng tôi</a>
                                            </li>
                                            <li>
                                                <Link to="/agents/1">Nhà môi giới</Link>
                                            </li>
                                            <li>
                                                <Link to="/estatelistview">Danh sách bài đăng</Link>
                                            </li>
                                            <li>
                                                <Link to="/companies/1">Doanh nghiệp đối tác</Link>
                                            </li>

                                        </ul>
                                    </div>
                                </div>

                                {/* Subscribe */}
                                <div className="col-lg-5 col-md-5 col-sm-6 col-xs-12">
                                    <div className="footer-item">
                                        <div className="main-title-2">
                                            <h1>Đăng kí</h1>
                                        </div>
                                        <div className="newsletter clearfix">
                                            <p>
                                                Đăng kí tài khoản email của bạn để nhận được thông báo mới nhất của chúng tôi
                                            </p>
                                            <form onSubmit={this.onSubmit}>
                                                <div className="form-group">
                                                    <input
                                                        className="nsu-field btn-block"
                                                        id="nsu-email-0"
                                                        type="text"
                                                        name="email"
                                                        placeholder="Nhập email của bạn"
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group mb-0">
                                                    <button
                                                        type="submit"
                                                        className="button-sm button-theme btn-block"
                                                        onClick={this.onClickSendEmail}
                                                    >Đăng kí</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
                {
                    /* Footer end */
                }

            </div>
        );
    }
}

export default withRouter(Footer);