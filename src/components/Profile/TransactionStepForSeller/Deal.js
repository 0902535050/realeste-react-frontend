import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, message, Form, Icon, Input, InputNumber, Select, DatePicker } from 'antd';
import moment from 'moment'
import * as transAction from '../../../actions/transactionRequest'

const Option = Select.Option;
const { TextArea } = Input
const TypeOfPay = [
    { value: '1', label: 'Tiền mặt' },
    { value: '2', label: 'Chuyển khoản' },
];

class Deal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dealdate: 0,
            typeofpay: 1,
            loading: false,
            monthNumber: 0
        }
    }

    componentDidMount() {
        // console.log(this.props.transaction)
        this.props.onGettingTransactionDetail(this.props.transaction._id, this.props.transaction.typetransaction)
    }
    hasErrors = (fieldsError) => {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }

    OnHandleDeposit = (rule, value, callback) => {
        if (value <= this.props.transaction.project.price)
            callback()
        else callback('Số tiền đặt cọc phải nhỏ hơn tổng giá trị bất động sản!')
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                if (this.props.transaction.typetransaction === 1) {
                    await this.setState({ loading: true })
                    // console.log('Received values of form: ', values);
                    var dealInfo = {
                        total: this.props.transaction.project.price,
                        deposit: Number(document.getElementById('deposit').value),
                        typeofpay: this.state.typeofpay === this.props.transactions.selldetail.deal.typeofpay ? Number(this.props.transactions.selldetail.deal.typeofpay) : Number(this.state.typeofpay),
                        datedeal: (Number(this.state.dealdate) === Number(this.props.transactions.selldetail.deal.datedeal) || Number(this.state.dealdate) === 0) ? Number(this.props.transactions.selldetail.deal.datedeal) : Number(this.state.dealdate),
                        description: document.getElementById('moreInformation').value,
                        complete: true,
                        updateTime: moment().unix(),
                        _id: this.props.transactions._id,
                        id: this.props.transactions.selldetail._id,
                    }

                    var existedDealInfo = {
                        total: Number(this.props.transactions.selldetail.deal.total),
                        deposit: Number(this.props.transactions.selldetail.deal.deposit),
                        typeofpay: Number(this.props.transactions.selldetail.deal.typeofpay),
                        description: this.props.transactions.selldetail.deal.description,
                        datedeal: Number(this.props.transactions.selldetail.deal.datedeal)
                    }

                    if (dealInfo.total === existedDealInfo.total
                        && dealInfo.deposit === existedDealInfo.deposit
                        && dealInfo.typeofpay === existedDealInfo.typeofpay
                        && dealInfo.datedeal === existedDealInfo.datedeal
                        && dealInfo.description === existedDealInfo.description) {
                        return message.warning("Bạn chưa thay đổi gì cả!")
                    }

                    await this.props.onSendingSellingDeal(dealInfo)
                    await this.setState({ loading: false })
                }
                else if (this.props.transaction.typetransaction === 2) {
                    await this.setState({ loading: true })
                    // console.log('Received values of form: ', values);
                    var dealRentingInfo = {
                        total: this.props.transactions.project.price,
                        deposit: this.props.transaction.project.price * this.state.monthNumber,
                        typeofpay: this.state.typeofpay === this.props.transactions.rentdetail.deal.typeofpay ? Number(this.props.transactions.rentdetail.deal.typeofpay) : Number(this.state.typeofpay),
                        datedeal: (Number(this.state.dealdate) === Number(this.props.transactions.rentdetail.deal.datedeal) || Number(this.state.dealdate) === 0) ? Number(this.props.transactions.rentdetail.deal.datedeal) : Number(this.state.dealdate),
                        description: document.getElementById('moreInformation').value,
                        complete: true,
                        updateTime: moment().unix(),
                        transactionid: this.props.transactions._id,
                        id: this.props.transactions.rentdetail._id,
                    }

                    var existedDealRentingInfo = {
                        total: Number(this.props.transactions.rentdetail.deal.total),
                        deposit: Number(this.props.transactions.rentdetail.deal.deposit),
                        typeofpay: Number(this.props.transactions.rentdetail.deal.typeofpay),
                        description: this.props.transactions.rentdetail.deal.description,
                        datedeal: Number(this.props.transactions.rentdetail.deal.datedeal)
                    }

                    if (dealRentingInfo.deposit === existedDealRentingInfo.deposit
                        && dealRentingInfo.typeofpay === existedDealRentingInfo.typeofpay
                        && dealRentingInfo.datedeal === existedDealRentingInfo.datedeal
                        && dealRentingInfo.description === existedDealRentingInfo.description) {
                        return message.warning("Bạn chưa thay đổi gì cả!")
                    }
                    // console.log(dealRentingInfo)
                    await this.props.onSendingRentingDeal(dealRentingInfo)
                    await this.setState({ loading: false })
                }
            }
        });
    };

    onChangeSelectValue = (value) => {
        this.setState({ typeofpay: value })
    }

    onChange = (dateString) => {
        var formatDate = moment(dateString, 'YYYY/MM/DD, h:mm a').unix()
        this.setState({ dealdate: formatDate })
    }
    onChangeMonth = (value) => {
        this.setState({ monthNumber: value })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        var { transactions } = this.props
        const { loading } = this.state
        return (
            this.props.transaction.typetransaction === 1 ?
                <div className="container">
                    <Form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-md-4 col-lg-4 col-xs-12" >
                                <Form.Item label={`Tổng giá trị: `}>
                                    {/* {getFieldDecorator('TotalPrice', {
                                        initialValue: transactions.selldetail.deal.total === 0 ? null : transactions.selldetail.deal.total,
                                        rules: [{ required: true, message: 'Trường này chưa được nhập!' }],
                                    })(
                                        <InputNumber
                                            style={{ width: "100%" }}
                                            formatter={value => `${value} ${this.props.transaction.project.unit}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={value => value.replace(`${this.props.transaction.project.unit}`, '')}
                                            id="TotalPrice"
                                            min={0}
                                            readOnly
                                        />,
                                    )} */}
                                    <InputNumber
                                        style={{ width: "100%" }}
                                        formatter={value => this.props.transaction.project.price < 1000 ? `${value} ${this.props.transaction.project.unit}` : `${(value / 1000).toFixed(1)} Tỉ`}
                                        parser={value => value.replace(`${this.props.transaction.project.unit}`, '')}
                                        id="TotalPrice"
                                        min={0}
                                        readOnly
                                        defaultValue={this.props.transaction.project.price}
                                    />,
                                </Form.Item>
                            </div>
                            <div className="col-md-4 col-lg-4 col-xs-12">
                                <Form.Item label={`Tiền đặt cọc (${this.props.transaction.project.unit}): `}>
                                    {getFieldDecorator('deposit', {
                                        initialValue: transactions.selldetail.deal.deposit === 0 ? null : transactions.selldetail.deal.deposit,
                                        rules: [
                                            { required: true, message: 'Trường này chưa được nhập!' },
                                            { validator: this.OnHandleDeposit }
                                        ],
                                    })(
                                        <InputNumber
                                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            style={{ width: "100%" }}
                                            // defaultValue={transactions.selldetail.deal.deposit}
                                            id="deposit"
                                        />,
                                    )}
                                </Form.Item>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 col-lg-4 col-xs-12">
                                <Form.Item label="Hình thức thanh toán: ">
                                    {getFieldDecorator('paymentMethod', {
                                        // valuePropName: transactions.selldetail.deal.typeofpay,
                                        initialValue: transactions.selldetail.deal.typeofpay === 0 ? null : TypeOfPay[transactions.selldetail.deal.typeofpay - 1].label,
                                        rules: [{ required: true, message: 'Trường này chưa được nhập!' }],
                                    })(
                                        <Select style={{ width: "100%" }} id="paymentMethod" onChange={this.onChangeSelectValue}>
                                            {TypeOfPay.map(type => <Option key={type.value} value={type.value}>{`${type.label}`}</Option>)}
                                        </Select>
                                    )}
                                </Form.Item>
                            </div>
                            <div className="col-md-4 col-lg-4 col-xs-12">
                                <Form.Item label="Ngày bàn giao (dự kiến): ">
                                    {getFieldDecorator('date', {
                                        initialValue: transactions.selldetail.deal.datedeal === 0 ? null : moment(moment.unix(transactions.selldetail.deal.datedeal).format('DD/MM/YYYY, h:mm a'), 'DD/MM/YYYY, h:mm a'),
                                        rules: [{ required: true, message: 'Trường này chưa được nhập!' }],
                                    })(
                                        <DatePicker onChange={this.onChange} style={{ width: "100%" }} id="dealdate" />
                                    )}
                                </Form.Item>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-8 col-lg-8 col-xs-12">
                                <Form.Item label="Thông tin thêm: ">
                                    {getFieldDecorator('moreInformation', {
                                        initialValue: transactions.selldetail.deal.description === '0' ? null : transactions.selldetail.deal.description,
                                        rules: [{ required: true, message: 'Trường này chưa được nhập!' }],
                                    })(
                                        <TextArea
                                            placeholder="Thông tin thêm..."
                                            autosize={{ minRows: 2, maxRows: 6 }}
                                            style={{ width: "100%" }}
                                            id="moreInformation"
                                        />
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
                            <div className="col-md-3 col-lg-3 col-xs-12" >
                                <Form.Item label={`Tổng giá trị: `}>
                                    <InputNumber
                                        style={{ width: "100%" }}
                                        formatter={value => `${value} ${this.props.transaction.project.unit}`}
                                        parser={value => value.replace(`${this.props.transaction.project.unit}`, '')}
                                        id="TotalPrice"
                                        min={0}
                                        readOnly
                                        defaultValue={this.props.transaction.project.price}
                                    />,
                                </Form.Item>
                            </div>
                            <div className="col-md-2 col-lg-2 col-xs-12">
                                <Form.Item label={`Số tháng cọc: `}>
                                    {getFieldDecorator('monthNumber', {
                                        initialValue: transactions.rentdetail.deal.deposit === 0 ? 0 : transactions.rentdetail.deal.deposit / transactions.project.price,
                                        rules: [
                                            { required: true, message: 'Trường này chưa được nhập!' },
                                        ],
                                    })(
                                        <InputNumber
                                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            style={{ width: "100%" }}
                                            id="monthNumber"
                                            onChange={this.onChangeMonth}
                                            step={0.5}
                                            min={0.5}
                                        />,
                                    )}
                                </Form.Item>
                            </div>
                            <div className="col-md-3 col-lg-3 col-xs-12">
                                <Form.Item label="Thành tiền: ">
                                    {getFieldDecorator('total', {
                                        initialValue: this.state.monthNumber === 0
                                            ? transactions.rentdetail.deal.deposit + ' ' + transactions.project.unit
                                            : this.state.monthNumber * transactions.project.price + ' ' + transactions.project.unit,
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
                        <div className="row">
                            <div className="col-md-4 col-lg-4 col-xs-12">
                                <Form.Item label="Hình thức thanh toán: ">
                                    {getFieldDecorator('paymentMethod', {
                                        initialValue: transactions.rentdetail.deal.typeofpay === 0 ? null : TypeOfPay[transactions.rentdetail.deal.typeofpay - 1].label,
                                        rules: [{ required: true, message: 'Trường này chưa được nhập!' }],
                                    })(
                                        <Select style={{ width: "100%" }} id="paymentMethod" onChange={this.onChangeSelectValue}>
                                            {TypeOfPay.map(type => <Option key={type.value} value={type.value}>{`${type.label}`}</Option>)}
                                        </Select>
                                    )}
                                </Form.Item>
                            </div>
                            <div className="col-md-4 col-lg-4 col-xs-12">
                                <Form.Item label="Ngày dọn vào ở (dự kiến): ">
                                    {getFieldDecorator('date', {
                                        initialValue: transactions.rentdetail.deal.datedeal === 0 ? null : moment(moment.unix(transactions.rentdetail.deal.datedeal).format('DD/MM/YYYY, h:mm a'), 'DD/MM/YYYY, h:mm a'),
                                        rules: [{ required: true, message: 'Trường này chưa được nhập!' }],
                                    })(
                                        <DatePicker onChange={this.onChange} style={{ width: "100%" }} id="dealdate" />
                                    )}
                                </Form.Item>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-8 col-lg-8 col-xs-12">
                                <Form.Item label="Thông tin thêm: ">
                                    {getFieldDecorator('moreInformation', {
                                        initialValue: transactions.rentdetail.deal.description === '0' ? null : transactions.rentdetail.deal.description,
                                        rules: [{ required: true, message: 'Trường này chưa được nhập!' }],
                                    })(
                                        <TextArea
                                            placeholder="Thông tin thêm..."
                                            autosize={{ minRows: 2, maxRows: 6 }}
                                            style={{ width: "100%" }}
                                            id="moreInformation"
                                        />
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

const mapStateToProps = (state) => {
    return {
        transactionDetail: state.transactionDetail,
        transactions: state.transaction,
        rentTransaction: state.rentTransaction
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSendingSellingDeal: (dealInfo) => dispatch(transAction.actPostingDealRequest(dealInfo)),
        onGettingTransactionDetail: (id, type) => dispatch(transAction.actGettingTransactionDetailRequest(id, type)),
        onSendingRentingDeal: (dealRentingInfo) => dispatch(transAction.actPostingRentingDealRequest(dealRentingInfo))
    }

}

const WrappedFormDeal = Form.create()(Deal)

export default connect(mapStateToProps, mapDispatchToProps)(WrappedFormDeal)

