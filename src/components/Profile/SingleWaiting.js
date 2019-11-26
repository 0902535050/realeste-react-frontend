/* eslint-disable */
import React, { Component } from 'react'
import { List, Avatar, Button, Modal, Select, Form, Card, Icon } from 'antd';
import { connect } from 'react-redux'
import * as transActions from '../../actions/transactionRequest'
// import * as actions from '../../actions/request'
import moment from 'moment'

const Option = Select.Option;
const { Meta } = Card;

class SingleWaiting extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      loading: false,
      selectedCode: {},
      currentRequestNumber: null
    }
  }

  componentDidMount = () => {

  }

  onHandleCancel = () => {
    this.setState({ visible: false })
  }

  onChangeSelectValue = (event) => {
    // console.log(event.target.value)
    // console.log(this.props.codelist[event.target.value])
    this.setState({ selectedCode: this.props.codelist[event.target.value] })
  }

  onHandleAcceptingRequest = async (waiting, waitingSingle, index) => {
    await this.setState({ currentRequestNumber: index })
    // console.log(this.props.codelist)
    if ((this.props.codelist.length === 1 && this.props.codelist[0].code === "dummy")) {
      this.setState({ loading: true })
      var step = null, typetransaction = null
      if (waiting.project.statusProject === 1) {
        step = 7
        typetransaction = 1
      }

      if (waiting.project.statusProject === 3) {
        step = 8
        typetransaction = 2
      }
      var transactionInfo = {
        step: step,
        typeproject: waiting.project.type,
        typetransaction: typetransaction,
        project: waiting.project._id,
        buyer: waitingSingle.user._id,
        company: waitingSingle.user.company,
        createTime: moment().unix(),
        updateTime: moment().unix(),
        code: this.props.codelist[0].code
      }
      // console.log(transactionInfo)
      await this.props.onCreatingTransaction(transactionInfo)
      this.setState({ loading: false })
      // console.log(this.props.transaction)
      // await this.props.onShowWaitingRequestList(waiting.project._id)
      this.props.history.push('/mytransactions')
    }
    else {
      this.setState({ visible: true })
    }

  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        await this.setState({ loading: true })
        // console.log(this.props.waitingList)
        // console.log(this.props.waitingList.requests[this.state.currentRequestNumber].user)
        var step = null, typetransaction = null
        if (this.props.waitingList.project.statusProject === 1) {
          step = 7
          typetransaction = 1
        }

        if (this.props.waitingList.project.statusProject === 3) {
          step = 8
          typetransaction = 2
        }
        var transactionInfo = {
          step: step,
          typeproject: this.props.waitingList.project.type,
          typetransaction: typetransaction,
          project: this.props.waitingList.project._id,
          buyer: this.props.waitingList.requests[this.state.currentRequestNumber].user._id,
          company: this.props.waitingList.requests[this.state.currentRequestNumber].user.company,
          createTime: moment().unix(),
          updateTime: moment().unix(),
          code: this.props.codelist[values.code].code
        }
        // console.log(transactionInfo)
        await this.props.onCreatingTransaction(transactionInfo)
        // console.log(this.props.transaction)
        await this.setState({ loading: false })
        await this.setState({ visible: false })
      }
    })

  }
  render() {
    var { waitingList, codelist, unit, waitingRequestSingle, index } = this.props
    const { loading } = this.state
    // console.log(waitingList)
    const { getFieldDecorator } = this.props.form
    return (
      <React.Fragment>
        <Card
          style={{ width: "100%" }}
          // cover={
          //   <img
          //     alt="example"
          //     src={waitingRequestSingle.user.avatar}
          //   />
          // }
          actions={[<Icon type="check" onClick={() => this.onHandleAcceptingRequest(waitingList, waitingRequestSingle, index)} >Đồng ý</Icon>, <Icon type="stop" >Hủy bỏ</Icon>]}
        >
          <Meta
            avatar={<Avatar src={waitingRequestSingle.user.avatar} />}
            // title="Lờ"
            description={`${waitingRequestSingle.user.fullname} đã gửi yêu cầu giao dịch với giá ${waitingRequestSingle.money} ${unit}`}
          />
        </Card>
        <Modal
          title="Chọn mã căn hộ"
          style={{ top: 20 }}
          visible={this.state.visible}
          // onOk={() => this.setModal1Visible(false)}
          onCancel={this.onHandleCancel}
          footer={null}
          closable={true}
        >
          <Form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-md-12 col-lg-12 col-xs-12">
                <Form.Item label="Chọn mã căn hộ: ">
                  {getFieldDecorator('code', {
                    rules: [
                      { required: true, message: 'Bạn chưa chọn mã căn hộ nào!' },
                    ],
                  })(
                    <Select style={{ width: "100%" }} id="code">
                      {codelist.map((code, index) => <Option key={index} value={index}>{`${code.code}`}</Option>)}
                    </Select>
                  )}
                </Form.Item>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 col-lg-12 col-xs-12">
                <Form.Item>
                  <Button type="primary" htmlType="submit" style={{ fontSize: "13px", float: "right" }} disabled={loading}>
                    {loading && (
                      <i
                        className="fa fa-refresh fa-spin"
                        style={{ marginRight: "5px" }}
                      />
                    )}
                    {loading && <span>Đang chấp nhận...</span>}
                    {!loading && <span>Chấp nhận</span>}
                  </Button>
                </Form.Item>
              </div>
            </div>
          </Form>
        </Modal>
      </React.Fragment>
      // <div className="waitingSingle" style={{ padding: "0px 20px" }}>
      // {/* <React.Fragment> */ }
      // < List.Item >
      //   <List.Item.Meta
      //     avatar={<Avatar src={waitingRequestSingle.user.avatar} />}
      //     description={
      //       <span>
      //         <p style={{ fontWeight: "bold" }}>{waitingRequestSingle.user.fullname}
      //           <p style={{ fontWeight: "lighter" }}>{moment.unix(waitingRequestSingle.createTime).format('DD/MM/YYYY, h:mm a')}</p>
      //         </p> đã gửi yêu cầu giao dịch bất động sản với giá mong muốn {waitingRequestSingle.money} {unit}.
      //                 <div style={{ float: "right" }}>
      //           <div className="comment-meta-reply"
      //             style={{ marginRight: "5px" }}
      //             onClick={() => this.onHandleAcceptingRequest(waitingList, waitingRequestSingle, index)}>
      //             <a>{loading && (
      //               <i
      //                 className="fa fa-refresh fa-spin"
      //                 style={{ marginRight: "5px" }}
      //               />
      //             )}
      //               {loading && <span>Đang chấp nhận...</span>}
      //               {!loading && <span>Đồng ý</span>}
      //             </a>
      //           </div>
      //           <div className="comment-meta-reply" style={{ backgroundColor: "red" }}>
      //             <a>Hủy bỏ</a>
      //           </div>
      //         </div>
      //       </span>}
      //   >
      //     <Modal
      //       title="Chọn mã căn hộ"
      //       style={{ top: 20 }}
      //       visible={this.state.visible}
      //       // onOk={() => this.setModal1Visible(false)}
      //       onCancel={this.onHandleCancel}
      //       footer={null}
      //       closable={true}
      //     >
      //       <Form onSubmit={this.handleSubmit}>
      //         <div className="row">
      //           <div className="col-md-12 col-lg-12 col-xs-12">
      //             <Form.Item label="Chọn mã căn hộ: ">
      //               {getFieldDecorator('code', {
      //                 rules: [
      //                   { required: true, message: 'Bạn chưa chọn mã căn hộ nào!' },
      //                 ],
      //               })(
      //                 <Select style={{ width: "100%" }} id="code">
      //                   {codelist.map((code, index) => <Option key={index} value={index}>{`${code.code}`}</Option>)}
      //                 </Select>
      //               )}
      //             </Form.Item>
      //           </div>
      //         </div>
      //         <div className="row">
      //           <div className="col-md-12 col-lg-12 col-xs-12">
      //             <Form.Item>
      //               <Button type="primary" htmlType="submit" style={{ fontSize: "13px", float: "right" }} disabled={loading}>
      //                 {loading && (
      //                   <i
      //                     className="fa fa-refresh fa-spin"
      //                     style={{ marginRight: "5px" }}
      //                   />
      //                 )}
      //                 {loading && <span>Đang chấp nhận...</span>}
      //                 {!loading && <span>Chấp nhận</span>}
      //               </Button>
      //             </Form.Item>
      //           </div>
      //         </div>
      //       </Form>
      //     </Modal>
      //   </List.Item.Meta>
      // </List.Item >
      //   {/* <List
      //           itemLayout="horizontal"
      //           dataSource={waitingList.requests}
      //           renderItem={(waitingRequestSingle, index) => (

      //           )}
      //         />, */}


      // {/* </React.Fragment> */ }
      //   // </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    transaction: state.transaction,
    waiting: state.waiting,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCreatingTransaction: (transactionInfo) => dispatch(transActions.actCreatingTransactionRequest(transactionInfo)),
    onShowWaitingRequestList: (projectid) => dispatch(transActions.actGettingWaitingListRequest(projectid)),
  }
}
const WrappedFormSingleWaiting = Form.create()(SingleWaiting)

export default connect(mapStateToProps, mapDispatchToProps)(WrappedFormSingleWaiting)
