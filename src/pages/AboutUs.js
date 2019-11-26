import React, { Component } from 'react';
import MainHeader from '../components/MainHeader'
import { withRouter } from 'react-router-dom';
import Footer from '../components/Footer';

class AboutUs extends Component {
    onRedirectHome = (e) => {
        e.preventDefault();
        this.props.history.push('/');
    }
    componentDidMount(){
        if(localStorage.getItem('company')){
            this.props.history.push('/company/profile-admin')
        }
    }
    render() {
        return (
            <div>
                <MainHeader />
                <div className="sub-banner overview-bgi">
                    <div className="overlay">
                        <div className="container">
                            <div className="breadcrumb-area">
                                <h1>Về chúng tôi</h1>
                                <ul className="breadcrumbs">
                                    <li><a href="true" onClick={this.onRedirectHome}>Trang chủ</a></li>
                                    <li className="active">Về chúng tôi</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="about-city-estate" style={{ padding: '50px' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                                <div className="properties-detail-slider simple-slider">
                                    <div id="carousel-custom" className="carousel slide" data-ride="carousel">
                                        <div className="carousel-outer">
                                            {/* Wrapper for slides */}
                                            <div className="carousel-inner">
                                                <div className="item active">
                                                    <img style={{ height: '400px' }} src="https://res.cloudinary.com/huantd/image/upload/v1561783842/logo/logo_RE_WHITE-02_pmvrcd.png" className="img-preview img-responsive" alt="properties-1" />
                                                </div>


                                            </div>
                                            {/* Controls */}
                                            {/* <a className="left carousel-control" href="#carousel-custom" role="button" data-slide="prev">
                                                <span className="slider-mover-left no-bg t-slider-r pojison" aria-hidden="true">
                                                    <i className="fa fa-angle-left" />
                                                </span>
                                                <span className="sr-only">Previous</span>
                                            </a>
                                            <a className="right carousel-control" href="#carousel-custom" role="button" data-slide="next">
                                                <span className="slider-mover-right no-bg t-slider-l pojison" aria-hidden="true">
                                                    <i className="fa fa-angle-right" />
                                                </span>
                                                <span className="sr-only">Next</span>
                                            </a> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12">
                                <div className="about-text">
                                    <h2>VỀ REALES</h2>
                                    <h5>REALES được thành lập dựa trên việc thực hiện đồ án tốt nghiệp của 6 sinh viên khoa Công nghệ thông tin, Trường Đại học Khoa học Tự nhiên, ĐHQG-HCM</h5>
                                    <p style={{ fontSize: '14px' }}>Đây là một sản phẩm dành cho những người có nhu cầu mua hoặc thuê BĐS và chí ít là muốn tìm hiểu về BĐS cho nhu cầu ở tương lai,
                                     những người quan tâm đến các kiến thức về thị trường BĐS nói chung, REALES một sản phẩm cung cấp cho người dùng một giải pháp toàn diện về các thông tin BĐS cũng như quá trình mua bán của nó. Không giống như những sản phẩm khác, REALES hứa hẹn sẽ mang lại cho người dung sự tin tưởng với việc xác thực thông tin BĐS, nhà môi giới và chuẩn hóa một quy trình mua bán – cho thuê.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <br />

                <div className="clearfix" />
                <div className="counters overview-bgi">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-sm-12 bordered-right">
                                <div className="counter-box">
                                    <h1 className="counter Starting" style={{ fontSize: '30px' }}>MỤC TIÊU CỦA REALES</h1>
                                    <h3>Chia sẻ, kết nối, dễ dàng tìm kiếm ngôi nhà của riêng bạn!</h3>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="clearfix" />

                <div className="testimonials-2">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                <div className="sec-title-three">
                                    <h2>Tầm nhìn</h2>
                                    <div className="text">
                                        Tốt nghiệp đại học và cùng nhau xây dựng, phát triển để trở thành Cổng thông tin online toàn diện về Bất động sản tại thị trường Đông Nam Á.
                </div>
                                </div>
                            </div>
                            <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                <div id="carouse3-example-generic" className="carousel slide" data-ride="carousel">
                                    {/* Wrapper for slides */}
                                    <div className="carousel-inner" role="listbox">
                                        <div className="item content clearfix">
                                            <div className="col-lg-4 col-md-5 col-sm-5 col-xs-12">
                                                <div className="avatar">
                                                    <img src="https://res.cloudinary.com/huantd/image/upload/v1561784027/avatar/avatar_f32azu.jpg" alt="avatar-1" className="img-responsive" />
                                                </div>
                                            </div>
                                            <div className="col-lg-8 col-md-7 col-sm-7 col-xs-12">
                                                <div className="text">
                                                Học tập là một quá trình liên tục và bền bỉ.
                                                </div>
                                                <div className="author-name">
                                                    <h3><b>Trần Đình Huân</b></h3>
                                                </div>
                                                <h4> Front-end Web Developer</h4>
                                            </div>
                                        </div>
                                        <div className="item content clearfix active">
                                            <div className="col-lg-4 col-md-5 col-sm-5 col-xs-12">
                                                <div className="avatar">
                                                    <img src="https://res.cloudinary.com/huantd/image/upload/v1561784356/avatar/tung_urm9vk.jpg" alt="avatar-2" className="img-responsive" />
                                                </div>
                                            </div>
                                            <div className="col-lg-8 col-md-7 col-sm-7 col-xs-12">
                                                <div className="text">
                                                    Chúng ta không xây dựng sản phẩm hoàn hảo mà chỉ làm cho nó tốt hơn!
                                                </div>
                                                <div className="author-name">
                                                <h3><b>Bùi Châu Minh Tùng</b></h3>
                                                    
                                                </div>
                                                <h4>Product Manager</h4>
                                                
                                            </div>
                                        </div>
                                        <div className="item content clearfix">
                                            <div className="col-lg-4 col-md-5 col-sm-5 col-xs-12">
                                                <div className="avatar">
                                                    <img src="https://res.cloudinary.com/huantd/image/upload/v1561784353/avatar/trung_d3ctba.jpg" alt="avatar-1" className="img-responsive" />
                                                </div>
                                            </div>
                                            <div className="col-lg-8 col-md-7 col-sm-7 col-xs-12">
                                                <div className="text">
                                                Hãy cứ đam mê, hãy cứ dại khờ
                                                </div>
                                                <div className="author-name">
                                                    <h3><b>Hoàng Quốc Trung</b></h3>
                                                </div>
                                                <h4> Front-end Web Developer</h4>
                                            </div>
                                        </div>
                                        <div className="item content clearfix">
                                            <div className="col-lg-4 col-md-5 col-sm-5 col-xs-12">
                                                <div className="avatar">
                                                    <img src="https://res.cloudinary.com/dne3aha8f/image/upload/v1561910163/a2176bd926cdc2939bdc.jpg" alt="avatar-1" className="img-responsive"style={{width: "220px", height: "220px"}}/>
                                                </div>
                                            </div>
                                            <div className="col-lg-8 col-md-7 col-sm-7 col-xs-12">
                                                <div className="text">
                                                Ước mơ gia nhập Facebook từ đây!
                                                </div>
                                                <div className="author-name">
                                                    <h3><b>Trần Tấn Đạt</b></h3>
                                                </div>
                                                <h4> Back-end Web Developer</h4>
                                            </div>
                                        </div>
                                        <div className="item content clearfix">
                                            <div className="col-lg-4 col-md-5 col-sm-5 col-xs-12">
                                                <div className="avatar">
                                                    <img src="https://res.cloudinary.com/huantd/image/upload/v1561784356/avatar/quoc_iv41nc.jpg" alt="avatar-1" className="img-responsive" />
                                                </div>
                                            </div>
                                            <div className="col-lg-8 col-md-7 col-sm-7 col-xs-12">
                                                <div className="text">
                                                Mong muốn mang lại cuộc sống tốt đẹp hơn dành cho mọi người
                                                </div>
                                                <div className="author-name">
                                                    <h3><b>Hoàng Anh Quốc</b></h3>
                                                </div>
                                                <h4> Android Developer</h4>
                                            </div>
                                        </div>
                                        <div className="item content clearfix">
                                            <div className="col-lg-4 col-md-5 col-sm-5 col-xs-12">
                                                <div className="avatar">
                                                    <img src="https://res.cloudinary.com/huantd/image/upload/v1561784366/avatar/Tuan_rolw9t.jpg" alt="avatar-1" className="img-responsive" />
                                                </div>
                                            </div>
                                            <div className="col-lg-8 col-md-7 col-sm-7 col-xs-12">
                                                <div className="text">
                                                Bậc thầy chém gió
                                                </div>
                                                <div className="author-name">
                                                    <h3><b>Đoàn Trần Anh Tuấn</b></h3>
                                                </div>
                                                <h4>Tester</h4>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    {/* Controls */}
                                    <a className="left carousel-control" href="#carouse3-example-generic" role="button" data-slide="prev">
                                        <span className="slider-mover-left t-slider-l" aria-hidden="true">
                                            <i className="fa fa-angle-left" />
                                        </span>
                                        <span className="sr-only">Trước</span>
                                    </a>
                                    <a className="right carousel-control" href="#carouse3-example-generic" role="button" data-slide="next">
                                        <span className="slider-mover-right t-slider-r" aria-hidden="true">
                                            <i className="fa fa-angle-right" />
                                        </span>
                                        <span className="sr-only">Sau</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="clearfix"></div>
                <Footer />
            </div>
        );
    }
}

export default withRouter(AboutUs);