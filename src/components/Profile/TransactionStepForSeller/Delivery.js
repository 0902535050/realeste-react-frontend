import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, message, Form, Input, InputNumber, DatePicker } from 'antd';
import * as transAction from '../../../actions/transactionRequest'
import moment from 'moment'

class Delivery extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false
    }
  }

  handleSubmit = e => {
    var { transactions } = this.props
    e.preventDefault();
    var deliveryData = null
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        if (this.props.transaction.typetransaction === 1) {
          await this.setState({ loading: true })
          // console.log('Received values of form: ', values);
          deliveryData = {
            datecomplete: moment(values.deliveryDate, 'YYYY/MM/DD, h:mm a').unix(),
            apartmentcode: transactions.code,
            room: Number(document.getElementById('room').value),
            datein: moment(values.startDate, 'YYYY/MM/DD, h:mm a').unix(),
            tax: Number(document.getElementById('tax').value),
            complete: true,
            updateTime: moment().unix(),
            _id: this.props.transaction._id,
            id: this.props.transaction.selldetail._id,
          }
          if (transactions.selldetail.delivery.datecomplete === moment(values.deliveryDate, 'YYYY/MM/DD, h:mm a').unix()
            && transactions.selldetail.delivery.room === document.getElementById('room').value
            && transactions.selldetail.delivery.tax === document.getElementById('tax').value
            && transactions.selldetail.delivery.datein === moment(values.startDate, 'YYYY/MM/DD, h:mm a').unix())
            return message.warning('Bạn chưa thay đổi gì cả!')
          await this.props.onSendingSellingDelivery(deliveryData)
          await this.setState({ loading: false })
        }
        else if (this.props.transaction.typetransaction === 2) {
          await this.setState({ loading: true })
          // console.log('Received values of form: ', values);
          deliveryData = {
            datecomplete: moment(values.deliveryDate, 'YYYY/MM/DD, h:mm a').unix(),
            apartmentcode: transactions.code,
            room: Number(document.getElementById('room').value),
            datein: moment(values.startDate, 'YYYY/MM/DD, h:mm a').unix(),
            tax: Number(document.getElementById('tax').value),
            complete: true,
            updateTime: moment().unix(),
            _id: this.props.transaction._id,
            id: this.props.transaction.rentdetail._id,
          }
          if (transactions.rentdetail.delivery.datecomplete === moment(values.deliveryDate, 'YYYY/MM/DD, h:mm a').unix()
            && transactions.rentdetail.delivery.room === document.getElementById('room').value
            && transactions.rentdetail.delivery.tax === document.getElementById('tax').value
            && transactions.rentdetail.delivery.datein === moment(values.startDate, 'YYYY/MM/DD, h:mm a').unix())
            return message.warning('Bạn chưa thay đổi gì cả!')
          await this.props.onSendingRentingDelivery(deliveryData)
          await this.setState({ loading: false })
        }
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form
    var { transactions } = this.props
    const { loading } = this.state
    return (
      this.props.transaction.typetransaction === 1 ?
        <div className="container">
          <Form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-md-4 col-lg-4 col-xs-12">
                <Form.Item label="Mã căn hộ: ">
                  {getFieldDecorator('estateCode', {
                    initialValue: transactions.code,
                    rules: [{ required: true, message: 'Trường này chưa được nhập!' }],
                  })(
                    <Input style={{ width: "100%" }} disabled />
                  )}
                </Form.Item>
              </div>
              <div className="col-md-4 col-lg-4 col-xs-12">
                <Form.Item label="Số phòng (nếu có): ">
                  <InputNumber style={{ width: "100%" }} defaultValue={transactions.selldetail.delivery.room} id="room" />
                </Form.Item>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 col-lg-4 col-xs-12">
                <Form.Item label="Ngày giao bất động sản (thực tế): ">
                  {getFieldDecorator('deliveryDate', {
                    initialValue: transactions.selldetail.delivery.datecomplete === 0 ? null : moment(moment.unix(transactions.selldetail.delivery.datecomplete).format('DD/MM/YYYY, h:mm a'), 'DD/MM/YYYY, h:mm a'),
                    rules: [{ required: true, message: 'Trường này chưa được nhập!' }],
                  })(
                    <DatePicker style={{ width: "100%" }} />
                  )}
                </Form.Item>
              </div>
              <div className="col-md-4 col-lg-4 col-xs-12">
                <Form.Item label="Ngày dọn vào ở: ">
                  {getFieldDecorator('startDate', {
                    initialValue: transactions.selldetail.delivery.datein === 0 ? null : moment(moment.unix(transactions.selldetail.delivery.datein).format('DD/MM/YYYY, h:mm a'), 'DD/MM/YYYY, h:mm a'),
                    rules: [{ required: true, message: 'Trường này chưa được nhập!' }],
                  })(
                    <DatePicker style={{ width: "100%" }} />
                  )}
                </Form.Item>
              </div>
            </div>
            <div className="row">
              <div className="col-md-5 col-lg-5 col-xs-12">
                <Form.Item label="Phí hàng tháng (nếu có): ">
                  <InputNumber style={{ width: "100%" }} defaultValue={transactions.selldetail.delivery.tax} id="tax" />
                </Form.Item>
              </div>
              {this.props.transaction.status === 1 ?
                <div className="col-md-3 col-lg-3 col-xs-12">
                  <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ fontSize: "13px", float: "right" }} disabled={loading}>
                      {loading && (
                        <i
                          className="fa fa-refresh fa-spin"
                          style={{ marginRight: "5px" }}
                        />
                      )}
                      {loading && <span>Đang thực thi...</span>}
                      {!loading && <span>Chấp nhận</span>}
                    </Button>
                  </Form.Item>
                </div>
                : null}
            </div>
          </Form>
        </div>
        :
        <div className="container">
          <Form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-md-4 col-lg-4 col-xs-12">
                <Form.Item label="Mã căn hộ: ">
                  {getFieldDecorator('estateCode', {
                    initialValue: transactions.code,
                    rules: [{ required: true, message: 'Trường này chưa được nhập!' }],
                  })(
                    <Input style={{ width: "100%" }} disabled />
                  )}
                </Form.Item>
              </div>
              <div className="col-md-4 col-lg-4 col-xs-12">
                <Form.Item label="Số phòng (nếu có): ">
                  <InputNumber style={{ width: "100%" }} defaultValue={transactions.rentdetail.delivery.room} id="room" />
                </Form.Item>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 col-lg-4 col-xs-12">
                <Form.Item label="Ngày giao bất động sản (thực tế): ">
                  {getFieldDecorator('deliveryDate', {
                    initialValue: transactions.rentdetail.delivery.datecomplete === 0 ? null : moment(moment.unix(transactions.rentdetail.delivery.datecomplete).format('DD/MM/YYYY, h:mm a'), 'DD/MM/YYYY, h:mm a'),
                    rules: [{ required: true, message: 'Trường này chưa được nhập!' }],
                  })(
                    <DatePicker style={{ width: "100%" }} />
                  )}
                </Form.Item>
              </div>
              <div className="col-md-4 col-lg-4 col-xs-12">
                <Form.Item label="Ngày dọn vào ở: ">
                  {getFieldDecorator('startDate', {
                    initialValue: transactions.rentdetail.delivery.datein === 0 ? null : moment(moment.unix(transactions.rentdetail.delivery.datein).format('DD/MM/YYYY, h:mm a'), 'DD/MM/YYYY, h:mm a'),
                    rules: [{ required: true, message: 'Trường này chưa được nhập!' }],
                  })(
                    <DatePicker style={{ width: "100%" }} />
                  )}
                </Form.Item>
              </div>
            </div>
            <div className="row">
              <div className="col-md-5 col-lg-5 col-xs-12">
                <Form.Item label="Phí hàng tháng (nếu có): ">
                  <InputNumber style={{ width: "100%" }} defaultValue={transactions.rentdetail.delivery.tax} id="tax" />
                </Form.Item>
              </div>
              {this.props.transaction.status === 1 ?
                <div className="col-md-3 col-lg-3 col-xs-12">
                  <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ fontSize: "13px", float: "right" }} disabled={loading}>
                      {loading && (
                        <i
                          className="fa fa-refresh fa-spin"
                          style={{ marginRight: "5px" }}
                        />
                      )}
                      {loading && <span>Đang thực thi...</span>}
                      {!loading && <span>Chấp nhận</span>}
                    </Button>
                  </Form.Item>
                </div> : null}
            </div>
          </Form>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    transactions: state.transaction,
    transactionDetail: state.transactionDetail
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGettingTransactionDetail: (id, type) => dispatch(transAction.actGettingTransactionDetailRequest(id, type)),
    onSendingSellingDelivery: (deliveryData) => dispatch(transAction.actPostingDeliveryRequest(deliveryData)),
    onSendingRentingDelivery: (deliveryData) => dispatch(transAction.actPostingRentingDeliveryRequest(deliveryData))
  }
}

const WrappedFormDelivery = Form.create()(Delivery)

export default connect(mapStateToProps, mapDispatchToProps)(WrappedFormDelivery)
