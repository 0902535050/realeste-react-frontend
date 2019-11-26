/* eslint-disable */
import React, { Component } from 'react'
import { Button, message, Form, Icon, InputNumber, DatePicker } from 'antd';
import { connect } from 'react-redux'
import Searching from '../../../pages/Map/Searching'
import * as transAction from '../../../actions/transactionRequest'
import moment from 'moment'

class Tax extends Component {
    constructor(props) {
        super(props)

        this.state = {
            taxBuyerPlace: '',
            taxSellerPlace: '',
            loading: false
        }
    }

    /**
	 * When the user types an address in the search box
	 * @param placeForSeller
	 */

    onPlaceSelectedForSeller = (placeForSeller) => {
        this.setState({ taxSellerPlace: placeForSeller.formatted_address ? placeForSeller.formatted_address : '' })
    }

    /**
	 * When the user types an address in the search box
	 * @param placeForBuyer
	 */

    onPlaceSelectedForBuyer = (placeForBuyer) => {
        this.setState({ taxBuyerPlace: placeForBuyer.formatted_address ? placeForBuyer.formatted_address : '' })
    }
    handleSubmit = e => {
        var { transactions } = this.props
        e.preventDefault();
        var taxData = null
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                await this.setState({ loading: true })
                // console.log('Received values of form: ', values);
                taxData = {
                    datepay1: moment(values.sellerTaxDate, 'YYYY/MM/DD, h:mm a').unix(),
                    datepay2: moment(values.buyerTaxDate, 'YYYY/MM/DD, h:mm a').unix(),
                    place1: this.state.taxSellerPlace,
                    place2: this.state.taxBuyerPlace,
                    amountmoney1: values.sellerTaxAmount,
                    amountmoney2: values.buyerTaxAmount,
                    complete: true,
                    updateTime: moment().unix(),
                    _id: this.props.transaction._id,
                    id: this.props.transaction.selldetail._id,
                }
                if (transactions.selldetail.tax.seller.datepay === moment(values.sellerTaxDate, 'YYYY/MM/DD, h:mm a').unix()
                    && transactions.selldetail.tax.seller.place === values.sellerTaxPlace
                    && transactions.selldetail.tax.seller.amountmoney === values.sellerTaxAmount
                    && transactions.selldetail.tax.buyer.datepay === moment(values.buyerTaxDate, 'YYYY/MM/DD, h:mm a').unix()
                    && transactions.selldetail.tax.buyer.place === values.buyerTaxPlace
                    && transactions.selldetail.tax.buyer.amountmoney === values.buyerTaxAmount)
                    return message.warning('Bạn chưa thay đổi gì cả!')
                await this.props.onSendingTax(taxData)
                await this.setState({ loading: false })
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form
        var { loading } = this.state
        var { transactions } = this.props
        return (
            <div className="container">
                <Form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="main-title-2">
                            <h1><span>Bên</span> bán</h1>
                        </div>
                        <div className="row">
                            <div className="col-md-4 col-lg-4 col-xs-12">
                                <Form.Item label="Ngày đóng thuế: ">
                                    {getFieldDecorator('sellerTaxDate', {
                                        initialValue: moment(moment.unix(transactions.selldetail.tax.seller.datepay).format('DD/MM/YYYY, h:mm a'), 'DD/MM/YYYY, h:mm a'),
                                        rules: [{ required: true, message: 'Trường này chưa được nhập!' }],
                                    })(
                                        <DatePicker onChange={this.onChange} style={{ width: "100%" }} />
                                    )}
                                </Form.Item>
                            </div>
                            <div className="col-md-4 col-lg-4 col-xs-12">
                                <Form.Item label="Số tiền: ">
                                    {getFieldDecorator('sellerTaxAmount', {
                                        initialValue: Number(transactions.selldetail.tax.seller.amountmoney),
                                        rules: [{ required: true, message: 'Trường này chưa được nhập!' }],
                                    })(
                                        <InputNumber
                                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            style={{ width: "100%" }}
                                        />,
                                    )}
                                </Form.Item>
                            </div>
                            <div className="col-md-8 col-lg-8 col-xs-12">
                                <Form.Item label="Nơi đóng thuế: ">
                                    {getFieldDecorator('sellerTaxPlace', {
                                        initialValue: transactions.selldetail.tax.seller.place,
                                        rules: [{ required: true, message: 'Trường này chưa được nhập!' }],
                                    })(
                                        <Searching onPlaceChanged={this.onPlaceSelectedForSeller} />
                                    )}
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <div className="row">
                        <div className="main-title-2">
                            <h1><span>Bên</span> mua</h1>
                        </div>
                        <div className="row">
                            <div className="col-md-4 col-lg-4 col-xs-12">
                                <Form.Item label="Ngày đóng thuế: ">
                                    {getFieldDecorator('buyerTaxDate', {
                                        initialValue: moment(moment.unix(transactions.selldetail.tax.buyer.datepay).format('DD/MM/YYYY, h:mm a'), 'DD/MM/YYYY, h:mm a'),
                                        rules: [{ required: true, message: 'Trường này chưa được nhập!' }],
                                    })(
                                        <DatePicker onChange={this.onChange} style={{ width: "100%" }} />
                                    )}
                                </Form.Item>
                            </div>
                            <div className="col-md-4 col-lg-4 col-xs-12">
                                <Form.Item label="Số tiền: ">
                                    {getFieldDecorator('buyerTaxAmount', {
                                        initialValue: Number(transactions.selldetail.tax.buyer.amountmoney),
                                        rules: [{ required: true, message: 'Trường này chưa được nhập!' }],
                                    })(
                                        <InputNumber
                                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            style={{ width: "100%" }}
                                        />,
                                    )}
                                </Form.Item>
                            </div>
                            <div className="col-md-8 col-lg-8 col-xs-12">
                                <Form.Item label="Nơi đóng thuế: ">
                                    {getFieldDecorator('buyerTaxPlace', {
                                        initialValue: transactions.selldetail.tax.buyer.place,
                                        rules: [{ required: true, message: 'Trường này chưa được nhập!' }],
                                    })(
                                        <Searching onPlaceChanged={this.onPlaceSelectedForBuyer} />
                                    )}
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                    {this.props.transaction.status === 1
                        ? <div className="row">
                            <div className="col-md-8 col-lg-8 col-xs-12">
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" style={{ fontSize: "13px", float: "right" }} disabled={loading}>
                                        {loading && (
                                            <i
                                                className="fa fa-refresh fa-spin"
                                                style={{ marginRight: "5px" }}
                                            />
                                        )}
                                        {loading && <span>Đang thực thi...</span>}
                                        {!loading && <span>Gửi thông tin</span>}
                                    </Button>
                                </Form.Item>
                            </div>
                        </div>
                        : null}
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
        onSendingTax: (taxData) => dispatch(transAction.actPostingTaxRequest(taxData))
    }
}

const WrappedFormTax = Form.create()(Tax)

export default connect(mapStateToProps, mapDispatchToProps)(WrappedFormTax)
