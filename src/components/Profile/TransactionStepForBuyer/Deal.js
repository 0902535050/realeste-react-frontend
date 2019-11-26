import React, { Component } from 'react'
import { Descriptions } from 'antd'
import moment from 'moment'
import * as transAction from '../../../actions/transactionRequest'
import { connect } from 'react-redux'

const TypeOfPay = [
    { value: '1', label: 'Tiền mặt' },
    { value: '2', label: 'Chuyển khoản' },
];

class Deal extends Component {

    componentDidMount = () => {
        this.props.onGettingTransactionDetail(this.props.transaction._id, this.props.transaction.typetransaction)
    }
    render() {
        var { transactionDetail } = this.props
        return (
            transactionDetail.typetransaction === 1 ?
                <div className="container">
                    <div className="col-md-8 col-lg-8 col-xs-12">
                        <Descriptions title="Thỏa thuận mua ban đầu" column={1} border>
                            <Descriptions.Item label={`Tổng giá trị bất động sản (đơn vị: ${transactionDetail.project.unit})`}>{transactionDetail.selldetail.deal.total === 0 ? null : transactionDetail.selldetail.deal.total}</Descriptions.Item>
                            <Descriptions.Item label={`Tiền đặt cọc (đơn vị: ${transactionDetail.project.unit})`}>{transactionDetail.selldetail.deal.deposit === 0 ? null : transactionDetail.selldetail.deal.deposit}</Descriptions.Item>
                            <Descriptions.Item label="Hình thức thanh toán">{transactionDetail.selldetail.deal.typeofpay === 0 ? null : TypeOfPay[transactionDetail.selldetail.deal.typeofpay - 1].label}</Descriptions.Item>
                            <Descriptions.Item label="Ngày bàn giao (dự kiến)">{transactionDetail.selldetail.deal.datedeal === 0 ? null : moment.unix(transactionDetail.selldetail.deal.datedeal).format('DD/MM/YYYY, h:mm a')}</Descriptions.Item>
                            <Descriptions.Item label="Thông tin thêm">{transactionDetail.selldetail.deal.description === '0' ? null : transactionDetail.selldetail.deal.description}</Descriptions.Item>
                        </Descriptions>
                    </div>
                </div>
                :
                <div className="container">
                    <div className="col-md-8 col-lg-8 col-xs-12">
                        <Descriptions title="Thỏa thuận mua ban đầu" column={1} bordered={false}>
                            <Descriptions.Item label={`Tổng giá trị bất động sản (đơn vị: ${transactionDetail.project.unit})`}>{transactionDetail.rentdetail.deal.total === 0 ? null : transactionDetail.rentdetail.deal.total}</Descriptions.Item>
                            <Descriptions.Item label={`Tiền đặt cọc (đơn vị: ${transactionDetail.project.unit})`}>{transactionDetail.rentdetail.deal.deposit}</Descriptions.Item>
                            <Descriptions.Item label="Hình thức thanh toán">{transactionDetail.rentdetail.deal.typeofpay === 0 ? null : TypeOfPay[transactionDetail.rentdetail.deal.typeofpay - 1].label}</Descriptions.Item>
                            <Descriptions.Item label="Ngày bàn giao (dự kiến)">{transactionDetail.rentdetail.deal.datedeal === 0 ? null : moment.unix(transactionDetail.rentdetail.deal.datedeal).format('DD/MM/YYYY, h:mm a')}</Descriptions.Item>
                            <Descriptions.Item label="Thông tin thêm">{transactionDetail.rentdetail.deal.description === '0' ? null : transactionDetail.rentdetail.deal.description}</Descriptions.Item>
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

export default connect(mapStateToProps, mapDispatchToProps)(Deal)

