import React, { Component } from 'react'
import { Descriptions } from 'antd'
import * as transAction from '../../../actions/transactionRequest'
import { connect } from 'react-redux';
import moment from 'moment'

class Deposit extends Component {

  componentDidMount = () => {
    this.props.onGettingTransactionDetail(this.props.transaction._id, this.props.transaction.typetransaction)
  }
  render() {
    const { transactionDetail } = this.props
    return (
      transactionDetail.typetransaction === 1 ?
        <div className="container">
          <div className="col-lg-8 col-md-8 col-sm-12">
            <Descriptions title="Đặt cọc" column={1}>
              <Descriptions.Item label="Tỉ lệ thanh toán: ">
                {transactionDetail.selldetail.deposit.detail[0] === undefined ? null : transactionDetail.selldetail.deposit.detail[0].ratio + '%'}
              </Descriptions.Item>

              <Descriptions.Item label="Thời điểm thanh toán: ">
                {transactionDetail.selldetail.deposit.detail[0] === undefined ? null : moment.unix(transactionDetail.selldetail.deposit.detail[0].createTime).format('DD/MM/YYYY, h:mm a')}
              </Descriptions.Item>
              
              <Descriptions.Item label="Nội dung thanh toán: ">
                {transactionDetail.selldetail.deposit.detail[0] === undefined ? null : transactionDetail.selldetail.deposit.detail[0].description}
              </Descriptions.Item>

              <Descriptions.Item label="Thời gian và cách thức thanh toán số tiền còn lại: ">
                {transactionDetail.selldetail.deposit.rest === 'Chua thanh toan' ? null : transactionDetail.selldetail.deposit.rest}
              </Descriptions.Item>

            </Descriptions>
          </div>
        </div>
        :
        <div className="container">
          <div className="col-lg-8 col-md-8 col-sm-12">
            <Descriptions title="Đặt cọc" column={1}>

              <Descriptions.Item label="Tỉ lệ thanh toán: ">
                {transactionDetail.rentdetail.deposit.detail[0] === undefined ? null : transactionDetail.rentdetail.deposit.detail[0].ratio + '%'}
              </Descriptions.Item>

              <Descriptions.Item label="Thời điểm thanh toán: ">
                {transactionDetail.rentdetail.deposit.detail[0] === undefined ? null : moment.unix(transactionDetail.rentdetail.deposit.detail[0].createTime).format('DD/MM/YYYY, h:mm a')}
              </Descriptions.Item>

              <Descriptions.Item label="Nội dung thanh toán: ">
                {transactionDetail.rentdetail.deposit.detail[0] === undefined ? null : transactionDetail.rentdetail.deposit.detail[0].description}
              </Descriptions.Item>

              <Descriptions.Item label="Thời gian và cách thức thanh toán số tiền còn lại: ">
                {transactionDetail.rentdetail.deposit.rest === 'Chua thanh toan' ? null : transactionDetail.rentdetail.deposit.rest}
              </Descriptions.Item>

            </Descriptions>
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    transactionDetail: state.transaction
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGettingTransactionDetail: (id, type) => dispatch(transAction.actGettingTransactionDetailRequest(id, type))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Deposit)