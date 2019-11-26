/* eslint-disable */
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import moment from 'moment'

export class SingleNews extends Component {
  render() {
    var { news } = this.props;
    // console.log(news);

    return (
      // <div className="thumbnail blog-box clearfix">
      //   {/* <img src="img/blog/blog-3.jpg" alt="blog-3" /> */}
      //   {/* Detail */}
      //   <div className="caption detail">
      //     <div className="date-box">
      //       <h5>{moment.unix(news.updateTime).format('DD/MM/YYYY, h:mm a')}</h5>
      //       {/* <h5>May</h5> */}
      //     </div>
      //     {/* title */}
      //     <Link to={`/news/${news._id}`}>
      //       <h3 className="title"><a href="blog-single-sidebar-right.html">{news.title}</a></h3>
      //     </Link>
      //     {/* Post meta */}
      //     {/* <div class="post-meta">
      //                 <span><a href="#"><i class="fa fa-user"></i>John Antony</a></span>
      //                 <span><a><i class="fa fa-calendar "></i>May 27, 2018</a></span>
      //                 <span><a href="#"><i class="fa fa-bars"></i> The Nest</a></span>
      //                 <span><a href="#"><i class="fa fa-comments"></i>7 Comment</a></span>
      //             </div> */}
      //     {/* paragraph */}
      //     <p>{news.content.length > 300 ? <div dangerouslySetInnerHTML={{ __html: news.content.slice(0, 300) }} ></div> : <div dangerouslySetInnerHTML={{ __html: news.content }} ></div>}</p>
      //     <div className="clearfix" />
      //     {/* Btn */}
      //     <a href={`/news/${news._id}`} className="read-more">Read More...</a>
      //   </div>
      // </div>
      <div className="col-lg-6 col-md-6 col-sm-6 ">
        <div className="thumbnail blog-box-2 clearfix">
          <div className="blog-photo">
            {news.image.url === '' ? null : <img src={news.image.url} alt="blog-1" className="img-responsive" style={{width: "100%", height: "300px"}} />}
          </div>
          {/* Detail */}
          <div className="caption detail" style={{height: "210px"}}>
            <div className="date-box">
              <h5 style={{ float: "right", color: "blue" }}>{moment.unix(news.updateTime).format('DD/MM/YYYY, h:mm a')}</h5>
            </div>
            <Link to={`/news/${news._id}`}>
              <h3>{news.title}</h3>
            </Link>
            {/* paragraph */}
            {news.content.length > 100 ? <div dangerouslySetInnerHTML={{ __html: news.content.slice(0, 100) }} ></div> : <div dangerouslySetInnerHTML={{ __html: news.content }} ></div>}
            <div className="clearfix" />
            {/* Btn */}
            <Link to={`/news/${news._id}`}>
              <a href={`true`} className="read-more">Đọc thêm...</a>
            </Link>

          </div>
        </div>
      </div>

    )
  }
}

export default (withRouter(SingleNews));
