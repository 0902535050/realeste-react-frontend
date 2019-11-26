import React, { Component } from 'react'
import { Descriptions } from 'antd'
import * as transAction from '../../../actions/transactionRequest'
import { connect } from 'react-redux'
import moment from 'moment'

class Delivery extends Component {
    componentDidMount = () => {
        this.props.onGettingTransactionDetail(this.props.transaction._id, this.props.transaction.typetransaction)
    }
    render() {
        var { transactionDetail } = this.props
        return (
            transactionDetail.typetransaction === 1 ?
                <div className="container">
                    <div className="col-lg-8 col-md-8 col-sm-12">
                        <Descriptions title="Giao bất động sản" column={1}>
                            <Descriptions.Item label="Mã căn hộ: ">
                                {transactionDetail.selldetail.delivery.apartmentcode === 0 ? null : transactionDetail.selldetail.delivery.apartmentcode}
                            </Descriptions.Item>

                            <Descriptions.Item label="Số phòng: ">
                                {transactionDetail.selldetail.delivery.room === 0 ? null : transactionDetail.selldetail.delivery.room}
                            </Descriptions.Item>

                            <Descriptions.Item label="Ngày giao bất động sản (thực tế): ">
                                {transactionDetail.selldetail.delivery.datecomplete === 0 ? null : moment.unix(transactionDetail.selldetail.delivery.datecomplete).format('DD/MM/YYYY, h:mm a')}
                            </Descriptions.Item>

                            <Descriptions.Item label="Ngày dọn vào ở: ">
                                {transactionDetail.selldetail.delivery.datein === 0 ? null : moment.unix(transactionDetail.selldetail.delivery.datein).format('DD/MM/YYYY, h:mm a')}
                            </Descriptions.Item>

                            <Descriptions.Item label="Phí hàng tháng (nếu có): ">
                                {transactionDetail.selldetail.delivery.tax === 0 || transactionDetail.selldetail.delivery.tax === null ? "Không có phí hàng tháng" : transactionDetail.selldetail.delivery.tax}
                            </Descriptions.Item>
                        </Descriptions>
                    </div>
                </div >
                :
                <div className="container">
                    <div className="col-lg-8 col-md-8 col-sm-12">
                        <Descriptions title="Giao bất động sản" column={1}>
                            <Descriptions.Item label="Mã căn hộ: ">
                                {transactionDetail.rentdetail.delivery.apartmentcode === 0 ? null : transactionDetail.rentdetail.delivery.apartmentcode}
                            </Descriptions.Item>

                            <Descriptions.Item label="Số phòng: ">
                                {transactionDetail.rentdetail.delivery.room === 0 ? null : transactionDetail.rentdetail.delivery.room}
                            </Descriptions.Item>

                            <Descriptions.Item label="Ngày giao bất động sản (thực tế): ">
                                {transactionDetail.rentdetail.delivery.datecomplete === 0 ? null : moment.unix(transactionDetail.rentdetail.delivery.datecomplete).format('DD/MM/YYYY, h:mm a')}
                            </Descriptions.Item>

                            <Descriptions.Item label="Ngày dọn vào ở: ">
                                {transactionDetail.rentdetail.delivery.datein === 0 ? null : moment.unix(transactionDetail.rentdetail.delivery.datein).format('DD/MM/YYYY, h:mm a')}
                            </Descriptions.Item>

                            <Descriptions.Item label="Phí hàng tháng (nếu có): ">
                                {transactionDetail.rentdetail.delivery.tax === 0 || transactionDetail.rentdetail.delivery.tax === null ? "Không có phí hàng tháng" : transactionDetail.rentdetail.delivery.tax}
                            </Descriptions.Item>
                        </Descriptions>
                    </div>
                </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(Delivery)