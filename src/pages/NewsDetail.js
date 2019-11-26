/* eslint-disable */
import React, { Component } from 'react'
import MainHeader from '../components/MainHeader'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../actions/request'

export class NewsDetail extends Component {
    componentDidMount = () => {
        this.props.OnGetNewsByID(this.props.match.params.id);
    }
    render() {
        var { newsDetail } = this.props;
        // console.log(newsDetail);
        return (
            <div>
                <MainHeader />
                {/* Banner start */}
                <div className="sub-banner overview-bgi">
                    <div className="overlay">
                        <div className="container">
                            <div className="breadcrumb-area">
                                <h1>Tin tức mới nhất</h1>
                                <ul className="breadcrumbs">
                                    <li>
                                        <Link to="/">Trang chủ</Link>
                                    </li>
                                    <li className="active">Tin tức</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Banner end */}
                {/* Blog body start */}
                <div className="blog-body content-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-xs-12">
                                {/* Blog box start */}
                                <div className="thumbnail blog-box clearfix">
                                    {/* <img src="/img/blog/blog-1.jpg" alt="blog-1" className="img-responsive" /> */}
                                    {/* detail */}
                                    <div className="caption detail">
                                        {/*Main title */}
                                        <h2 className="title">
                                            <b>
                                                {newsDetail.title}
                                            </b>
                                        </h2>
                                        <div>
                                        {!newsDetail.image ? null : <img style={{ height: '300px', width: '80%', display:'flex', justifyContent:'center', alignItems:'center' }} src={newsDetail.image.url} alt="properties-3" className="img-responsiv" />}
                                        </div>

                                        {<div dangerouslySetInnerHTML={{ __html: newsDetail.content }} ></div>}
                                    </div>
                                </div>
                                {/* Blog box end */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Blog body end */}
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        newsDetail: state.newsDetail
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        OnGetNewsByID: (id) => dispatch(actions.actGetNewsByIdRequest(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsDetail)
