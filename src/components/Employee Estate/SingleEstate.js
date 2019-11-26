/* eslint-disable */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import ViewEstate from "./ViewEstate";
import { Modal, Button, Tag } from "antd";
import * as actionEmployee from '../../actions/Company/requestCompany'
import { connect } from "react-redux";
// import { Button } from 'react-bootstrap'
const confirm = Modal.confirm;

class SingleEstate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      estateListOfUser: null,
      visibleView: false,
      loading: false,
      visibleEdit: false,
      flag: ""
    };
  }

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visibleView: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({
      visibleView: false
    });
  };

  handleCancelDelete = () => {
    this.setState({
      visibleEdit: false
    });
  };

  handleOkDelete = id => {
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
  };

  showDeleteConfirm = estateInfo => {
    // console.log(e.target.id)
    // var id = e.target.id
    confirm({
      title: "Bạn có đồng ý xóa bài này không?",
      okText: "Đồng ý",
      okType: "danger",
      cancelText: "Hủy bỏ",
      onOk: () => {
        const data = {
          userid: estateInfo.ownerid,
          id: estateInfo._id
        }
        this.props.onDeleteEmployeeProject(estateInfo._id, data)
      },
      onCancel() {
        // console.log("Cancel");
      }
    });
  };

  render() {
    let { estateListOfUser } = this.props;
    let { visibleView } = this.state;
    return (
      <div>
        <div className="property clearfix wow ">
          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 col-pad">
            {/* Property img */}
            <div className="property-img">
              <div className="property-tag button alt featured">{status}</div>
              {/* <div className="property-tag button sale">For Sale</div>
                                <div className="property-price">$150,000</div> */}
              <img
                style={{ height: "244px" }}
                src={estateListOfUser.url[0]}
                alt="fp-list"
                className="img-responsive hp-1"
              />
              {/* <div className="property-overlay">
                                    
                                </div> */}
            </div>
          </div>
          <div className="col-lg-7 col-md-7 col-sm-7 col-xs-12 property-content ">
            {/* title */}
            <h2
              className="title"
              style={{ marginTop: "8px", fontSize: "17px" }}
            >
              <a href="true">{estateListOfUser.name}</a>
            </h2>
            <p
              style={{
                width: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                lineHeight: "16px",
                WebkitLineClamp: "2",
                display: "webkit-box",
                WebkitBoxOrient: "vertical",
                height: "32px"
              }}
            >
              {estateListOfUser.info}
            </p>
            {/* Property address */}
            <h6 style={{ fontSize: "13px" }}>
              <b>Địa chỉ:</b> {estateListOfUser.address}
            </h6>
            <h6 style={{ fontSize: "13px" }}>
              <b>Diện tích:</b> {estateListOfUser.area}
            </h6>
            <h6>
              <b>Giá:</b>{estateListOfUser.price >= 1000 &&
                estateListOfUser.statusProject === 1
                ? `${Number(estateListOfUser.price / 1000).toFixed(
                  2
                )} Tỉ`
                : `${estateListOfUser.price} ${estateListOfUser.unit}`}
            </h6>
            {/* Property footer */}
            <div className="property-footer">
              <span className="left">
                <a href="true">
                  <i className="fa fa-user" />
                  {estateListOfUser.fullname}
                </a>
              </span>
              <span className="right">
                <Tag style={{ fontSize: "13px" }} color="green">
                  <p
                    style={{
                      fontSize: "13px",
                      margin: "auto",
                      color: "green",
                      textAlign: "center"
                    }}
                  >
                    <strong>Đăng ngày:</strong>
                    {moment.unix(estateListOfUser.updateTime).format("DD/MM/YYYY")}
                  </p>
                </Tag>
              </span>
            </div>
          </div>
          <div className="col-lg-1 col-md-1 col-sm-1 col-xs-12" style={{ paddingRight: '30px' }}>
            <div style={{ textAlign: 'center', marginRight: '15px', marginTop: '30px' }}>
              <div style={{ marginBottom: "5px" }}>
                <i
                  className="fa fa-eye"
                  style={{ cursor: "pointer", width: "20px", height: "20px" }}
                  onClick={() =>
                    this.setState({ visibleView: true, visibleEdit: false })
                  }
                >
                  <span style={{ marginLeft: "5px" }}>Xem</span>
                </i>
              </div>

              <Link
                to={`/company/edit-estate/${estateListOfUser._id}`}
    
              >
                <div style={{ marginBottom: "5px" }}>
                  <i
                    className="fa fa-pencil"
                    style={{ cursor: "pointer", width: "20px", height: "20px" }}
                  >
                    <span style={{ marginLeft: "5px" }}>Sửa</span>
                  </i>
                </div>
              </Link>

              <div className="remove">
                <i
                  className="fa fa-remove"
                  style={{ cursor: "pointer", width: "20px", height: "20px" }}
                  onClick={() => this.showDeleteConfirm(estateListOfUser)}
                  id={estateListOfUser._id}
                >
                  <span style={{ marginLeft: "5px" }}>Xóa</span>
                </i>
              </div>
            </div>
          </div>
        </div>


        <Modal
          visible={visibleView}
          title="Estate View"
          onCancel={this.handleCancel}
          // onOk={this.handleOk}
          style={{
            height: "80vh",
            overflowY: "auto",
            zIndex: "1000",
            boxShadow:
              "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)",
            marginTop: '-20px'
          }}
          width="60%"
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Close
            </Button>
          ]}
        >
          <div style={{ overflow: "hidden" }}>
            <ViewEstate estateUserInfo={estateListOfUser} />
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    projectListRedux: state.estateListOfUser,
    projectsOfEmployee: state.projectsOfEmployee
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteEmployeeProject: (id, data) => dispatch(actionEmployee.actDeleteEmployeeProjectRequest(id, data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleEstate);
