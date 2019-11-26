/* eslint-disable */
import React, { Component } from 'react'
// import Info from '../components/Profile/Info'
import Footer from '../components/Footer'
// import SingleProperty from '../components/Profile/SingleProperty'
import SingleNews from '../components/News/SingleNews'
// import { MY_PROPERTIES } from '../constants/Profile';
import { Link } from 'react-router-dom'
import MainHeader from '../components/MainHeader';
import * as actions from '../actions/request'
import { connect } from 'react-redux'
import { NEWS } from '../constants/Navbar'
import { Button, Empty, message } from 'antd'

const NewsType = [
    { value: '1', label: 'Phong thủy' },
    { value: '2', label: 'Nội thất' },
    { value: '3', label: 'Ngoại thất' },
    { value: '4', label: 'Xây dựng' },
    { value: '5', label: 'Kiến trúc' },
    { value: '6', label: 'Tài chính' },
    { value: '7', label: 'Luật bất động sản' },
];

const pageSize = 10

export class News extends Component {
    constructor() {
        super();
        this.state = {
            newsType: 1,
            current: 1,
            nextDisable: false,
            prevDisable: false
        }
    }

    componentDidMount() {
        if (this.state.current === 1) {
            this.setState({ prevDisable: true })
        }
    }
    onChangeValue = (e) => {
        // console.log(e.target.value)
        this.setState({
            newsType: e.target.value,
            current: 1
        });
        if (this.props.news.length < 10)
            this.setState({ nextDisable: true })
        this.props.actGetNewsByTypeRequest(e.target.value, `${this.state.current}`);

    }

    componentWillMount = () => {
        this.props.actGetNewsByTypeRequest(this.state.newsType, `${this.state.current}`)
        // if (this.props.news.length < 10)
        //     this.setState({ nextDisable: true })
    }

    prev = async () => {
        if (this.state.current === 1) {
            this.setState({ prevDisable: true })
            return
        }
        else {
            await this.setState({ current: this.state.current - 1 })
            await this.props.actGetNewsByTypeRequest(this.state.newsType, `${this.state.current}`)
        }
    }

    next = async () => {
        if (this.props.news.length < 10) {
            await this.setState({ nextDisable: true })
            await message.warning('Bạn đã xem hết tin!')
            return
        }
        else {
            await this.setState({ current: this.state.current + 1 })
            await this.props.actGetNewsByTypeRequest(this.state.newsType, `${this.state.current}`)

        }
    }
    render() {
        var { news } = this.props;
        let { newsType } = this.state;
        // console.log(news);
        // console.log(newsType);
        return (
            <div>
                <MainHeader component={NEWS} />
                {/* Sub banner start */}
                <div className="sub-banner overview-bgi">
                    <div className="overlay">
                        <div className="container">
                            <div className="breadcrumb-area">
                                <h1>Tin tức mới nhất</h1>
                                <ul className="breadcrumbs">
                                    <li><Link to="/">Trang chủ</Link></li>
                                    <li className="active">Tin tức</li>
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

                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className='row'>
                                    <div className="main-title-2 col-lg-4 col-md-4 col-xs-4">
                                        <h1><span>Tin tức</span> mới nhất</h1>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-xs-6"></div>
                                    <div className="col-lg-2 col-md-2 col-xs-2">
                                        <label>
                                            Xem theo loại tin
                                        </label>
                                        <select className="form-control"
                                            name="type"
                                            value={newsType}
                                            onChange={this.onChangeValue}
                                            id="News">
                                            {NewsType.map((type, index) => <option key={index} value={type.value}>{type.label}</option>)}

                                        </select>
                                    </div>
                                </div>

                                {/* table start */}
                                <div className="blog-body content-area">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            {this.ShowNewsList(news)}
                                        </div>
                                    </div>
                                </div>
                                {/* <table className="manage-table responsive-table">
                                    <tbody>
                                        
                                    </tbody>
                                </table> */}
                                {/* table end */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Page navigation start */}
                <div style={{ marginBottom: "20px", right: "10px", textAlign: "center" }}>
                    {news.length !== 0 ?
                        <React.Fragment>
                            <Button style={{ marginRight: "10px" }} onClick={() => this.prev()} disabled={this.state.prevDisable}>
                                <i className="fa fa-arrow-left" style={{ marginRight: "3px" }}></i>Trang trước
                            </Button>
                            <Button style={{}} onClick={() => this.next()} disabled={this.state.nextDisable}>
                                <i className="fa fa-arrow-right" style={{ marginRight: "3px" }}></i>Trang kế
                            </Button>
                        </React.Fragment>
                        : null}
                </div>
                {/* Page navigation end*/}

                {/* My Propertiess end */}

                <Footer />
            </div>
        )
    }
    ShowNewsList = (newss) => {
        var result = null;
        if (newss.length > 0) {
            result = newss.map((news, index) => {
                return (
                    <SingleNews key={index} news={news} />

                );
            });
        }
        else result = (<Empty />)
        return result;
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actGetNewsByTypeRequest: (type, page) => dispatch(actions.actGetNewsByTypeRequest(type, page))
    }
}

const mapStateToProps = (state) => {
    return {
        news: state.news
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(News);
