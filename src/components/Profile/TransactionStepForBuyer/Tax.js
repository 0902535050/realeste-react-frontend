import React, { Component } from 'react'
import { Descriptions } from 'antd'
import * as transAction from '../../../actions/transactionRequest'
import { connect } from 'react-redux'
import moment from 'moment'

class Tax extends Component {
    componentDidMount = () => {
        this.props.onGettingTransactionDetail(this.props.transaction._id, this.props.transaction.typetransaction)
    }
    render() {
        var { transactionDetail } = this.props
        return (
            <div className="container">
                <div className="col-lg-8 col-md-8 col-sm-12">
                    <Descriptions title="Thông tin đóng thuế bên bán" column={1}>
                        <Descriptions.Item label="Ngày đóng thuế: ">
                            {transactionDetail.selldetail.tax.seller.datepay === 0 ? null : moment.unix(transactionDetail.selldetail.tax.seller.datepay).format('DD/MM/YYYY, h:mm a')}
                        </Descriptions.Item>

                        <Descriptions.Item label="Số tiền đóng: ">
                            {transactionDetail.selldetail.tax.seller.amountmoney}
                        </Descriptions.Item>

                        <Descriptions.Item label="Nơi đóng thuế: ">
                            {transactionDetail.selldetail.tax.seller.place === '0' ? null : transactionDetail.selldetail.tax.seller.place}
                        </Descriptions.Item>
                    </Descriptions>
                    <br></br>
                    <Descriptions title="Thông tin đóng thuế bên mua" column={1}>
                        <Descriptions.Item label="Ngày đóng thuế: ">
                            {transactionDetail.selldetail.tax.buyer.datepay === 0 ? null : moment.unix(transactionDetail.selldetail.tax.buyer.datepay).format('DD/MM/YYYY, h:mm a')}
                        </Descriptions.Item>

                        <Descriptions.Item label="Số tiền đóng: ">
                            {transactionDetail.selldetail.tax.buyer.amountmoney}
                        </Descriptions.Item>

                        <Descriptions.Item label="Nơi đóng thuế: ">
                            {transactionDetail.selldetail.tax.buyer.place === '0' ? null : transactionDetail.selldetail.tax.buyer.place}
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

export default connect(mapStateToProps, mapDispatchToProps)(Tax)
