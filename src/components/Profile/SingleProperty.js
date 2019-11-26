/* eslint-disable */
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import moment from 'moment'
import ViewUI from '../My Properties/ViewUI'
import { authHeader } from '../../constants/authHeader'
import { Modal, Button, message } from 'antd';
import axios from 'axios'
import * as actions from '../../actions/request'
import { connect } from 'react-redux';
// import { Button } from 'react-bootstrap'
const confirm = Modal.confirm

export class SingleProperty extends Component {
  constructor(props) {
    super(props)

    this.state = {
      estateListOfUser: null,
      visibleView: false,
      loading: false,
      visibleEdit: false,
      flag: ''
    }
  }

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visibleView: false });
    }, 3000);
  }

  handleCancel = () => {
    this.setState({
      visibleView: false
    })
  }

  handleCancelDelete = () => {
    this.setState({
      visibleEdit: false
    })
  }

  handleOkDelete = (id) => {
    // axios.delete(`http://localhost:3001/projects/${id}`, { headers: authHeader() })
    //   .then(res => {
    //     console.log(res);
    //     if (res.status === 200) {
    //       this.props.history.goBack()
    //       return message.success('Delete post successfully!');
    //     }
    //     else return message.error('Failed to delete post!');
    //   });
    // this.setState({ visibleEdit: false })
  }

  showDeleteConfirm = (estateInfo) => {
    // console.log(e.target.id)
    // var id = e.target.id
    confirm({
      title: 'Bạn có đồng ý xóa bài này không?',
      okText: 'Đồng ý',
      okType: 'danger',
      cancelText: 'Hủy bỏ',
      onOk: () => {
        this.props.onDeleteProject(estateInfo._id, estateInfo)
      },
      onCancel() {
        // console.log('Cancel');
      },
    });
  }

  ImageSlideinModal = (url) => {
    var result = null
    if (url && url.length > 0) {
      result = url.map((image, index) => {
        return (
          <div className={index === 0 ? "item active" : "item"} style={{ height: "300px" }}>
            <img src={image} alt={index} key={index} />
          </div>
        )
      })
    }
    return result
  }
  render() {
    let { estateListOfUser } = this.props
    let { visibleView } = this.state
    let status = ' Chưa kiểm duyệt '
    if (estateListOfUser) {
      if (estateListOfUser.verify === true) {
        status = ' Đã kiểm duyệt '
      }
    }
    return (
      <div className="projectSingle" style={{ padding: "0px 20px", width: "100%" }}>
        <div className="property-tag button alt featured" style={{ color: 'white', width: '120px', textAlign: 'center', marginBottom: "15px" }}>{status}</div>
        <tr style={{ marginTop: "10px" }}>
          <td className="title-container">

            <img src={estateListOfUser.url[0]} alt="my-properties-1" className="img-responsive hidden-xs" style={{ width: "150px", height: "150px", marginLeft: "10px" }} />
            <div className="title">
              <Link to={`/properties/${estateListOfUser._id}`}>
                <h4 style={{ color: "rgb(255, 102, 0)", fontSize: "20px", cursor: "pointer" }} onClick={() => this.setState({ visibleView: true, visibleEdit: false })}>{estateListOfUser.name}</h4>
              </Link>

              <span><i className="fa fa-user-circle-o" />{estateListOfUser.investor}</span>
              <span><i className="fa fa-map-marker" style={{ width: "10px", marginLeft: "2px" }} /> {estateListOfUser.address} </span>
              {/* <span className="table-property-price"><i className="fa fa-money" />{estateListOfUser.price}</span> */}
              <span className="hidden-xs">
                <i className="fa fa-calendar-check-o" />
                {moment.unix(estateListOfUser.updateTime).format('DD/MM/YYYY')}
                <span className="hidden-xs" style={{ fontWeight: "lighter", color: "rgb(255, 102, 0)", fontSize: "18px" }}>
                  <i className="fa fa-money" style={{ fontSize: "12px" }} />
                  {estateListOfUser.price >= 1000 && estateListOfUser.statusProject === 1
                    ? `${Number(estateListOfUser.price / 1000).toFixed(1)} tỷ VNĐ`
                    : `${estateListOfUser.price} ${estateListOfUser.unit}`}
                </span>
              </span>
            </div>
          </td>

          <td className="action">
            {/* <div style={{ marginBottom: "5px" }} className="view">
              <i className="fa fa-eye"
                style={{ cursor: "pointer", width: "20px", height: "20px" }}
                // data-toggle="modal" 
                // data-target={`#` + estateListOfUser._id}
                onClick={() => this.setState({ visibleView: true, visibleEdit: false })}
              >
                <span style={{ marginLeft: "5px" }}>Xem</span>
              </i>
            </div> */}

            <Link to={`myproperties/edit/${estateListOfUser._id}`}>
              <i className="fa fa-pencil" style={{ cursor: "pointer", width: "20px", height: "20px" }} >
                <span style={{ marginLeft: "5px" }}>Sửa</span>
              </i>
            </Link>

            <div style={{ marginTop: "25px" }} className="remove">
              <i className="fa fa-remove"
                style={{ cursor: "pointer", width: "20px", height: "20px" }}
                onClick={() => this.showDeleteConfirm(estateListOfUser)}
                id={estateListOfUser._id}
              >
                <span style={{ marginLeft: "5px" }}>Xóa</span>
              </i>
            </div>
          </td>
        </tr>

        <Modal
          visible={visibleView}
          title="Estate View"
          onCancel={this.handleCancel}
          // onOk={this.handleOk}
          style={{ height: "80%", overflowY: "auto", zIndex: "1000", boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)" }}
          width="100%"
          footer={[
            <Button key="back" onClick={this.handleCancel}>Đóng</Button>
          ]}
        >
          <div style={{ overflow: 'hidden' }}>
            <ViewUI estateUserInfo={estateListOfUser} />
          </div>
        </Modal>

        <div className="modal property-modal fade" id={estateListOfUser._id} tabIndex="-1" role="dialog" aria-labelledby="carModalLabel1" aria-hidden="true">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="carModalLabel1">
                  {estateListOfUser.name}
                </h5>
                <p>
                  {estateListOfUser.address}
                </p>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row modal-raw">
                  <div className="col-lg-5 modal-left">
                    <div className="modal-left-content">
                      <div className="bs-example" data-example-id="carousel-with-captions">
                        <div className="carousel slide" id={estateListOfUser.createTime} data-ride="carousel" name={estateListOfUser._id}>
                          <div className="carousel-inner" role="listbox">
                            {this.ImageSlideinModal(estateListOfUser.url)}
                          </div>
                          <a className="control control-prev" href={`#` + estateListOfUser.createTime} role="button" data-slide="prev">
                            <i className="fa fa-angle-left" />
                          </a>
                          <a className="control control-next" href={`#` + estateListOfUser.createTime} role="button" data-slide="next">
                            <i className="fa fa-angle-right" />
                          </a>
                        </div>
                      </div>
                      <div className="description">
                        <h3>Mô tả chi tiết</h3>
                        <p>{estateListOfUser.info.length > 300 ? estateListOfUser.info.slice(0, 300) + '...' : estateListOfUser.info}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-7 modal-right">
                    <div className="modal-right-content bg-white">
                      <strong className="price">
                        {estateListOfUser.price >= 1000 && estateListOfUser.statusProject === 1 ? (estateListOfUser.price / 1000).toFixed(2) + ' tỉ VNĐ' : estateListOfUser.price + ' ' + estateListOfUser.unit}
                      </strong>
                      <section>
                        <h3>Thông tin liên hệ</h3>
                        <div className="features">
                          <ul className="bullets">
                            <li><i className="fa fa-user" />Tên người liên hệ: {estateListOfUser.fullname}</li>
                            <li><i className="fa fa-phone" />SĐT: {estateListOfUser.phone}</li>
                            <li><i className="fa fa-envelope" />Email: {estateListOfUser.email}</li>
                            <li><i className="fa fa-address-card" />Địa chỉ: {estateListOfUser.address}</li>

                          </ul>
                        </div>
                      </section>
                      <section>
                        <h3>Tổng quan</h3>
                        <dl>
                          <dt>Diện tích</dt>
                          <dd>{estateListOfUser.area + ' m2'}</dd>
                          <dt>Nhà đầu tư</dt>
                          <dd>{estateListOfUser.investor}</dd>
                          <dt>Giá</dt>
                          <dd>{estateListOfUser.price >= 1000 && estateListOfUser.statusProject === 1 ? (estateListOfUser.price / 1000).toFixed(2) + ' tỷ VNĐ' : estateListOfUser.price + ' ' + estateListOfUser.unit}</dd>
                        </dl>
                      </section>
                      {/* <section>
                                                    <h3>Last Review</h3>
                                                    <div className="ratings" data-rating={5}>
                                                        <span>
                                                            <i className="fa fa-star s1 active" data-score={1} />
                                                            <i className="fa fa-star s2 active" data-score={2} />
                                                            <i className="fa fa-star s3 active" data-score={3} />
                                                            <i className="fa fa-star s4 active" data-score={4} />
                                                            <i className="fa fa-star s5 active" data-score={5} />
                                                        </span>
                                                    </div>
                                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's </p>
                                                </section> */}
                      <Link to={`/properties/${estateListOfUser._id}`}>
                        <a className="btn button-sm button-theme">Xem chi tiết</a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    projectListRedux: state.estateListOfUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteProject: (id, data) => dispatch(actions.actDeleteProjectRequest(id, data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleProperty);
