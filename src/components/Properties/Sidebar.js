/* eslint-disable */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/role-has-required-aria-props */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { Component } from 'react';
import moment from 'moment'
import { connect } from 'react-redux'
import * as actions from '../../actions/request'
import SingleHintProperty from './SingleHintProperty'
import InfiniteScroll from 'react-infinite-scroller'
import axios from 'axios'
import { message, List, Spin } from 'antd';
import * as config from '../../constants/Config'
// import { Link } from 'react-router-dom'
const count = 5

class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      selectedOption: null,
      data: [],
      list: [],
      loading: false,
      hasMore: true,
      initLoading: true,
      page: 1
    };
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevProps.currentEstate.lat === undefined && this.props.currentEstate.lat) {
      // console.log(this.props.currentEstate)
      return this.props.currentEstate.lat;
    }
    else return null
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let temp = null
    if (snapshot) {
      // console.log(this.props.currentEstate)
      // this.props.actFetchEstatesRequest(this.props.currentEstate)
      this.fetchData(res => {
        if (res.data.count > 10) {
          temp = res.data.projects.slice(0, 10)
          this.setState({
            data: temp
          })
        }

      })
    }
  }

  componentDidMount() {
    let temp = null
    this.fetchData(res => {
      if (res.data.count > 10)
        temp = res.data.projects.slice(0, 10)
      else temp = res.data.projects
      this.setState({
        data: temp
      })
    })
  }
  fetchData = (callback) => {
    axios.post(`${config.API_URL}/projects/home`, this.props.currentEstate)
      .then(res => {
        callback(res)
      })
      .catch(error => {
        message.error(error)
      })
  }

  // fetchData = (callback) => {
    // console.log(this.state.page)
  //   axios.get(`http://localhost:3001/projects/all/${this.state.page}`)
  //     .then(res => {
  //       this.setState({ page: this.state.page + 1 })
  //       callback(res)
  //     })
  //     .catch(error => {
  //       message.error(error)
  //     })
  // }

  onLoadMore = () => {
    this.setState({
      loading: true,
      list: this.state.data.concat([...new Array(count)].map(() => ({ loading: true, name: {} }))),
    });
    this.fetchData(res => {
      const data = this.state.data.concat(res.data.projects);
      this.setState(
        {
          data,
          list: data,
          loading: false,
        },
        () => {
          // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
          // In real scene, you can using public method of react-virtualized:
          // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
          window.dispatchEvent(new Event('resize'));
        },
      );
    });
  };

  handleInfiniteOnLoad = () => {
    let { data } = this.state;
    this.setState({
      loading: true,
    });
    if (data.length > 20) {
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
    this.fetchData(res => {
      if (res.data.project.length > 10)
        data = data.concat(res.data.projects.slice(0, 10))
      else data = data.concat(res.data.projects)
      this.setState({
        data,
        loading: false,
      });
    });
  }

  ShowRelatedEstate = (estates) => {
    var result = null;
    if (estates.length > 0) {
      result = estates.map((estate, index) => {
        return (
          // <Link to={`/properties/${estate._id}`}>
            <SingleHintProperty info={estate} key={index} />
          // </Link>
        );
      })

    }
    return result;
  }

  render() {
    // const { initLoading, loading, list } = this.state;
    // const loadMore =
    //   !initLoading && !loading ? (
    //     <div
    //       style={{
    //         textAlign: 'center',
    //         marginTop: 12,
    //         height: 32,
    //         lineHeight: '32px',
    //       }}
    //     >
    //       <Button onClick={this.onLoadMore}>loading more</Button>
    //     </div>
    //   ) : null;
    let { estates } = this.props
    // console.log(estates)
    return (
      <div>
        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
          {/* Sidebar start */}
          <div className="sidebar right">
            {/* Search contents sidebar start */}
            {/* <div className="sidebar-widget hidden-xs hidden-sm">
              <div className="main-title-2">
                <h1><span>Tình hình</span> giao dịch</h1>
              </div>

            </div> */}
            {/* Search contents sidebar end */}
            {/* Popular posts start */}
            <div className="sidebar-widget popular-posts">
              <div className="main-title-2">
                <h1><span>Bất động sản </span> khác</h1>
              </div>
              <InfiniteScroll
                initialLoad={false}
                pageStart={0}
                loadMore={this.handleInfiniteOnLoad}
                hasMore={!this.state.loading && this.state.hasMore}
                useWindow={false}
              >
                <List
                  dataSource={this.state.data}
                  renderItem={(item, index) => (
                    <SingleHintProperty info={item} key={index} />
                  )}
                >
                  {this.state.loading && this.state.hasMore && (
                    <div className="demo-loading-container" style={{ position: "absolute", bottom: "40px", width: "100%", textAlign: "center" }}>
                      <Spin />
                    </div>
                  )}
                </List>
              </InfiniteScroll>
              {/* <List
                className="demo-loadmore-list"
                loading={initLoading}
                itemLayout="horizontal"
                loadMore={loadMore}
                dataSource={list}
                renderItem={(item, index) => (
                  <List.Item>
                    <Skeleton avatar title={false} loading={item.loading} active>
                      <SingleHintProperty info={item} key={index} />
                    </Skeleton>
                  </List.Item>
                )}
              /> */}
            </div>
          </div>
          {/* Sidebar end */}

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    estates: state.estates,
    currentEstate: state.currentEstate
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actFetchEstatesRequest: (info) => dispatch(actions.actFetchEstatesRequest(info))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);