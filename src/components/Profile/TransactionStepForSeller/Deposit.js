import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, message, Form, Icon, Input, InputNumber, DatePicker } from 'antd';
import * as transAction from '../../../actions/transactionRequest'
import moment from 'moment'

class Deposit extends Component {
    constructor(props) {
        super(props)

        this.state = {
            depositTime: 0,
            total: 0,
            loading: false
        }
    }

    componentDidMount = () => {
        this.props.onGettingTransactionDetail(this.props.transaction._id, this.props.transaction.typetransaction)
    }

    hasErrors = (fieldsError) => {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }

    onCheckingDepositRatio = (rule, value, callback) => {
        if (value !== undefined || value !== null || value !== '')
            if (Number(value) < 100)
                callback()
            else callback('Bạn vui lòng nhập tối đa 100%!')
    }
    onChange = (dateString) => {
        var formatDate = moment(dateString, 'YYYY/MM/DD, h:mm a').unix()
        this.setState({ depositTime: formatDate })
    }

    onChangeTotal = (value) => {
        this.setState({ total: value })
    }

    onHandleDeposit = (rule, value, callback) => {
        if (value <= this.props.transactions.rentdetail.deal.deposit)
            callback()
        else callback(`Số tiền này phải nhỏ hơn số tiền đặt cọc đã thỏa thuận (${this.props.transactions.rentdetail.deal.deposit} ${this.props.transactions.project.unit})`)
    }

    onHandleSellingDeposit = (rule, value, callback) => {
        if (value <= this.props.transactions.selldetail.deal.deposit)
            callback()
        else callback(`Số tiền này phải nhỏ hơn số tiền đặt cọc đã thỏa thuận (${this.props.transactions.selldetail.deal.deposit} ${this.props.transactions.project.unit})`)
    }
    handleSubmit = e => {
        e.preventDefault();
        var depositData = null
        var detail = []
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                if (this.props.transaction.typetransaction === 1) {
                    this.setState({ loading: true })
                    // console.log('Received values of form: ', values);
                    detail = [
                        {
                            ratio: Number(values.depositRatio),
                            description: values.depositContent,
                            createTime: this.state.depositTime === 0 && this.props.transactions.selldetail.deposit.detail[0] !== undefined
                                ? this.props.transactions.selldetail.deposit.detail[0].createTime
                                : this.state.depositTime
                        }
                    ]
                    depositData = {
                        detail: detail,
                        rest: values.restContent,
                        complete: true,
                        updateTime: moment().unix(),
                        _id: this.props.transaction._id,
                        id: this.props.transaction.selldetail._id,
                    }
                    if (this.props.transactions.selldetail.deposit.detail[0] !== undefined &&
                        this.props.transactions.selldetail.deposit.detail[0].ratio === values.depositRatio
                        && this.props.transactions.selldetail.deposit.detail[0].description === values.depositContent
                        && this.props.transactions.selldetail.deposit.detail[0].createTime === detail[0].createTime)
                        return message.warning('Bạn chưa thay đổi gì cả!')
                    await this.props.onSendingSellingDeposit(depositData)
                    await this.setState({ loading: false })
                }
                else if (this.props.transaction.typetransaction === 2) {
                    this.setState({ loading: true })
                    // console.log('Received values of form: ', values);
                    detail = [
                        {
                            ratio: Number(values.depositRatio),
                            description: values.depositContent,
                            createTime: this.state.depositTime === 0 && this.props.transactions.rentdetail.deposit.detail[0] !== undefined
                                ? this.props.transactions.rentdetail.deposit.detail[0].createTime
                                : this.state.depositTime
                        }
                    ]
                    depositData = {
                        detail: detail,
                        rest: values.restContent,
                        complete: true,
                        updateTime: moment().unix(),
                        _id: this.props.transaction._id,
                        id: this.props.transaction.rentdetail._id,
                    }
                    if (this.props.transactions.rentdetail.deposit.detail[0] !== undefined &&
                        this.props.transactions.rentdetail.deposit.detail[0].ratio === values.depositRatio
                        && this.props.transactions.rentdetail.deposit.detail[0].description === values.depositContent
                        && this.props.transactions.rentdetail.deposit.detail[0].createTime === detail[0].createTime)
                        return message.warning('Bạn chưa thay đổi gì cả!')
                    await this.props.onSendingRentingDeposit(depositData)
                    await this.setState({ loading: false })
                }
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        var { transactions } = this.props
        const { loading } = this.state
        return (
            this.props.transaction.typetransaction === 1 ?
                <div className="container">
                    <Form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-md-5 col-lg-5 col-xs-12">
                                <Form.Item label="Số tiền đã thanh toán: ">
                                    {getFieldDecorator('total', {
                                        initialValue: transactions.selldetail.deposit.detail[0] === undefined ? 0 : (transactions.selldetail.deposit.detail[0].ratio * transactions.selldetail.deal.deposit) / 100 + ' ' + transactions.project.unit,
                                        rules: [
                                            { required: true, message: 'Trường này chưa được nhập!' },
                                            { validator: this.onHandleSellingDeposit }
                                        ],
                                    })(
                                        <InputNumber
                                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            style={{ width: "100%" }}
                                            min={0}
                                            step={1}
                                            onChange={this.onChangeTotal}
                                        />,
                                    )}
                                </Form.Item>
                            </div>

                            <div className="col-md-3 col-lg-3 col-xs-12">
                                <Form.Item label="Thời điểm thanh toán: ">
                                    {getFieldDecorator('depositTime', {
                                        initialValue: transactions.selldetail.deposit.detail[0] === undefined ? null : moment(moment.unix(transactions.selldetail.deposit.detail[0].createTime).format('DD/MM/YYYY, h:mm a'), 'DD/MM/YYYY, h:mm a'),
                                        rules: [{ required: true, message: 'Trường này chưa được nhập!' }],
                                    })(
                                        <DatePicker onChange={this.onChange} style={{ width: "100%" }} id="depositTime" />
                                    )}
                                </Form.Item>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-8 col-lg-8 col-xs-12">
                                <Form.Item label="Nội dung thanh toán: ">
                                    {getFieldDecorator('depositContent', {
                                        initialValue: transactions.selldetail.deposit.detail[0] === undefined ? '' : transactions.selldetail.deposit.detail[0].description,
                                        rules: [{ required: true, message: 'Trường này chưa được nhập!' }],
                                    })(
                                        <Input.TextArea
                                            style={{ width: "100%" }}
                                            autosize={{ minRows: 2, maxRows: 6 }}
                                            placeholder="Nội dung thanh toán"
                                        />,
                                    )}
                                </Form.Item>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-8 col-lg-8 col-xs-12">
                                <Form.Item label="Thời gian và cách thức thanh toán số tiền còn lại: ">
                                    {getFieldDecorator('restContent', {
                                        initialValue: transactions.selldetail.deposit.rest === 'Chua thanh toan' ? null : transactions.selldetail.deposit.rest,
                                        rules: [{ required: true, message: 'Trường này chưa được nhập!' }],
                                    })(
                                        <Input.TextArea
                                            style={{ width: "100%" }}
                                            autosize={{ minRows: 2, maxRows: 6 }}
                                        />,
                                    )}
                                </Form.Item>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3 col-lg-3 col-xs-12">
                                <Form.Item label="Tỉ lệ thanh toán: ">
                                    {getFieldDecorator('depositRatio', {
                                        initialValue: this.state.total === 0 && transactions.selldetail.deposit.detail[0] !== undefined ? transactions.selldetail.deposit.detail[0].ratio : Number((this.state.total * 100) / transactions.selldetail.deal.deposit).toFixed(1),
                                        rules: [
                                            { required: true, message: 'Trường này chưa được nhập!' },
                                            // { validator: this.onCheckingDepositAmount }
                                        ],
                                    })(
                                        <InputNumber
                                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            style={{ width: "100%" }}
                                            min={0}
                                            step={1}
                                            max={100}
                                            formatter={value => `${value}%`}
                                            parser={value => value.replace('%', '')}
                                            // onChange={this.onChangeRatio}
                                            readOnly
                                        />,
                                    )}
                                </Form.Item>
                            </div>

                            <div className="col-md-3 col-lg-3 col-xs-12">
                                <Form.Item label="Số tiền đặt cọc còn lại: ">
                                    {getFieldDecorator('rest', {
                                        initialValue: transactions.selldetail.deposit.detail[0] === undefined ? transactions.selldetail.deal.deposit - this.state.total : transactions.selldetail.deal.deposit,
                                        rules: [{ required: true, message: 'Trường này chưa được nhập!' }],
                                    })(
                                        <Input
                                            style={{ width: "100%" }}
                                            readOnly
                                        />,
                                    )}
                                </Form.Item>
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
                :
                <div className="container">
                    <Form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-md-5 col-lg-5 col-xs-12">
                                <Form.Item label="Số tiền đã thanh toán: ">
                                    {getFieldDecorator('total', {
                                        initialValue: transactions.rentdetail.deposit.detail[0] === undefined ? 0 : (transactions.rentdetail.deposit.detail[0].ratio * transactions.rentdetail.deal.deposit) / 100 + ' ' + transactions.project.unit,
                                        rules: [
                                            { required: true, message: 'Trường này chưa được nhập!' },
                                            { validator: this.onHandleDeposit }
                                        ],
                                    })(
                                        <InputNumber
                                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            style={{ width: "100%" }}
                                            min={0}
                                            step={1}
                                            onChange={this.onChangeTotal}
                                        />,
                                    )}
                                </Form.Item>
                            </div>

                            <div className="col-md-3 col-lg-3 col-xs-12">
                                <Form.Item label="Thời điểm thanh toán: ">
                                    {getFieldDecorator('depositTime', {
                                        initialValue: transactions.rentdetail.deposit.detail[0] === undefined ? null : moment(moment.unix(transactions.rentdetail.deposit.detail[0].createTime).format('DD/MM/YYYY, h:mm a'), 'DD/MM/YYYY, h:mm a'),
                                        rules: [{ required: true, message: 'Trường này chưa được nhập!' }],
                                    })(
                                        <DatePicker onChange={this.onChange} style={{ width: "100%" }} id="depositTime" />
                                    )}
                                </Form.Item>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-8 col-lg-8 col-xs-12">
                                <Form.Item label="Nội dung thanh toán: ">
                                    {getFieldDecorator('depositContent', {
                                        initialValue: transactions.rentdetail.deposit.detail[0] === undefined ? '' : transactions.rentdetail.deposit.detail[0].description,
                                        rules: [{ required: true, message: 'Trường này chưa được nhập!' }],
                                    })(
                                        <Input.TextArea
                                            style={{ width: "100%" }}
                                            autosize={{ minRows: 2, maxRows: 6 }}
                                            placeholder="Nội dung thanh toán"
                                        />,
                                    )}
                                </Form.Item>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-8 col-lg-8 col-xs-12">
                                <Form.Item label="Thời gian và cách thức thanh toán số tiền còn lại: ">
                                    {getFieldDecorator('restContent', {
                                        initialValue: transactions.rentdetail.deposit.rest === 'Chua thanh toan' ? null : transactions.rentdetail.deposit.rest,
                                        rules: [{ required: true, message: 'Trường này chưa được nhập!' }],
                                    })(
                                        <Input.TextArea
                                            style={{ width: "100%" }}
                                            autosize={{ minRows: 2, maxRows: 6 }}
                                        />,
                                    )}
                                </Form.Item>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3 col-lg-3 col-xs-12">
                                <Form.Item label="Tỉ lệ thanh toán: ">
                                    {getFieldDecorator('depositRatio', {
                                        initialValue: this.state.total === 0 && transactions.rentdetail.deposit.detail[0] !== undefined ? transactions.rentdetail.deposit.detail[0].ratio : Number((this.state.total * 100) / transactions.rentdetail.deal.deposit).toFixed(1),
                                        rules: [
                                            { required: true, message: 'Trường này chưa được nhập!' },
                                            // { validator: this.onCheckingDepositAmount }
                                        ],
                                    })(
                                        <InputNumber
                                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            style={{ width: "100%" }}
                                            min={0}
                                            step={1}
                                            max={100}
                                            formatter={value => `${value}%`}
                                            parser={value => value.replace('%', '')}
                                            // onChange={this.onChangeRatio}
                                            readOnly
                                        />,
                                    )}
                                </Form.Item>
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

const mapStateToProps = (state) => ({
    transactions: state.transaction,
    transactionDetail: state.transactionDetail,
    rentTransaction: state.rentTransaction
})

const mapDispatchToProps = (dispatch) => {
    return {
        onSendingSellingDeposit: (depositData) => dispatch(transAction.actPostingDepositRequest(depositData)),
        onGettingTransactionDetail: (id, type) => dispatch(transAction.actGettingTransactionDetailRequest(id, type)),
        onSendingRentingDeposit: (depositData) => dispatch(transAction.actPostingRentingDepositRequest(depositData))
    }
}

const WrappedFormDeposit = Form.create()(Deposit)

export default connect(mapStateToProps, mapDispatchToProps)(WrappedFormDeposit)
