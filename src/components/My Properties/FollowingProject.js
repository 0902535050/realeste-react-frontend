import React, { Component } from 'react'
import moment from 'moment'
import ViewUI from './ViewUI'
import { Modal, Button } from 'antd';
import * as actions from '../../actions/request'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const confirm = Modal.confirm

class FollowingProject extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visibleViewFollow: false,
      visibleUnfollow: false,
      loading: false
    }
  }

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visibleViewFollow: false });
    }, 500);
  }

  handleCancel = () => {
    this.setState({
      visibleViewFollow: false
    })
  }

  handleCancelDelete = () => {
    this.setState({
      visibleUnfollow: false
    })
  }
  showUnfollowConfirm = (e) => {
    // console.log(e.target.id)
    var id = e.target.id
    var info = {
      projectid: id
    }
    confirm({
      title: 'Bạn có đồng ý bỏ yêu thích bài đăng này không?',
      //   content: 'Data deleted can not be restored!',
      okText: 'Đồng ý',
      okType: 'danger',
      cancelText: 'Hủy bỏ',
      onOk: () => {
        this.props.onUnfollowProject(info)
        // console.log(this.props.follow)
      },
      onCancel() {
        // console.log('Cancel');
      },
    });
  }
  render() {
    let { followSingle } = this.props
    let projectInfo = followSingle.project
    // console.log(projectInfo)
    // console.log(projectInfo.url)
    let { visibleViewFollow } = this.state
    return (
      <div>

        <tr>
          <td className="title-container followSingle">
            <img src='/images/Home.png' alt="my-properties-1" className="img-responsive hidden-xs" />
            <div className="title">
              <Link to={`/properties/${projectInfo._id}`}>
                <h4
                  style={{ color: "#84ad1d", fontSize: "20px", cursor: "pointer" }}
                // onClick={() => this.setState({ visibleViewFollow: true, visibleUnfollow: false })}
                >
                  {projectInfo.name}

                </h4>
              </Link>
              <i className="fa fa-heartbeat"
                style={{ cursor: "pointer", color: "red", marginRight: "10px" }}
                onClick={this.showUnfollowConfirm} id={projectInfo._id}
              >
                {`  Bỏ yêu thích`}
                </i>
              <span><i className="fa fa-user-circle-o" />{projectInfo.investor}</span>
              <span><i className="fa fa-map-marker" style={{ width: "10px", marginLeft: "2px" }} /> {projectInfo.address} </span>
              {/* <span className="table-property-price"><i className="fa fa-money" />{projectInfo.price}</span> */}
              <span className="hidden-xs"><i className="fa fa-calendar-check-o" />{moment.unix(projectInfo.updateTime).format('DD/MM/YYYY, h:mm a')}</span>
              <span>
                <i className="fa fa-money" style={{ marginRight: "5px" }}></i>
                {projectInfo.price >= 1000 && projectInfo.statusProject === 1
                  ? (projectInfo.price / 1000).toFixed(2) + ' Tỉ' : projectInfo.price + ' ' + projectInfo.unit}
              </span>
            </div>
          </td>

          {/* <td className="action" style={{ width: "200px" }}>
            <div style={{ marginBottom: "5px" }} className="view">
              <i className="fa fa-eye"
                style={{ cursor: "pointer", width: "30px", height: "30px" }}
                onClick={() => this.setState({ visibleViewFollow: true, visibleUnfollow: false })}
              >
                <span style={{ marginLeft: "5px" }}>Xem</span>
              </i>
            </div>
          </td> */}
        </tr>

        <Modal
          visible={visibleViewFollow}
          title="Estate View"
          onCancel={this.handleCancel}
          // onOk={this.handleOk}
          style={{ height: "80%", overflowY: "auto", zIndex: "1000", boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)" }}
          width="60%"
          footer={[
            <Button key="back" onClick={this.handleCancel}>Close</Button>
          ]}
        >
          <div style={{ overflow: 'hidden' }}>
            <ViewUI estateUserInfo={projectInfo} />
          </div>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    follow: state.follow
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetFollowingList: () => dispatch(actions.actGetFollowingListRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowingProject)