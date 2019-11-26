/* eslint-disable */
import { Steps, Button, Form, Input, Progress, Select } from 'antd';
import React from 'react'
import Deal from './TransactionStepForSeller/Deal'
import Legality from './TransactionStepForSeller/Legality'
import Deposit from './TransactionStepForSeller/Deposit'
import Contract from './TransactionStepForSeller/Contract'
import Confirmation from './TransactionStepForSeller/Confirmation'
import Tax from './TransactionStepForSeller/Tax'
import Delivery from './TransactionStepForSeller/Delivery'
import Transfer from './TransactionStepForSeller/Transfer'
import * as transAction from '../../actions/transactionRequest'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const Step = Steps.Step;

class Stepper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            percent: 0,
            flag: false
        };
    }

    componentDidMount = () => {
        this.props.onGettingTransactionDetail(this.props.transaction._id, this.props.transaction.typetransaction)
    }
    next = async () => {
        await this.props.onGettingTransactionDetail(this.props.transaction._id, this.props.transaction.typetransaction)
        // console.log(this.props.transaction)
        if (this.props.transaction.typetransaction === 1) {
            switch (this.state.current) {
                case 0: if (!this.props.transaction.selldetail.deal.complete) {
                    return null
                }
                    break;
                case 1: if (!this.props.transaction.selldetail.legality.complete) return null
                    break;
                case 2: if (!this.props.transaction.selldetail.deposit.complete) return null
                    break;
                case 3: if (!this.props.transaction.selldetail.contract.complete) return null
                    break;
                case 5: if (!this.props.transaction.selldetail.confirmation.complete) return null
                    break;
                case 6: if (!this.props.transaction.selldetail.tax.complete) return null
                    break;
                case 7: if (!this.props.transaction.selldetail.delivery.complete) return null
                    break;
                default:
                    break;
            }
        }
        else if (this.props.transaction.typetransaction === 2) {
            switch (this.state.current) {
                case 0: if (!this.props.transaction.rentdetail.deal.complete) {
                    return null
                }
                    break;
                case 1: if (!this.props.transaction.rentdetail.deposit.complete) return null
                    break;
                case 2: if (!this.props.transaction.rentdetail.contract.complete) return null
                    break;
                case 3: if (!this.props.transaction.rentdetail.confirmation.complete) return null
                    break;
                case 4: if (!this.props.transaction.rentdetail.delivery.complete) return null
                    break;
                default:
                    break;
            }
        }
        const current = this.state.current + 1;
        this.setState({
            current,
            percent: this.props.transaction.typetransaction === 1 ? Number((this.state.percent + 100 / 8).toFixed(2)) : Number(this.state.percent + 20)
        });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current, percent: this.props.transaction.typetransaction === 1 ? Number((this.state.percent - 100 / 8).toFixed(2)) : Number(this.state.percent - 20) });
    }
    hasErrors = (fieldsError) => {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }

    handleComplete = () => {
        // event.preventDefault()
        this.setState({ percent: 100 })
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                var completeData = {
                    transactionid: this.props.transaction._id
                }
                if (this.props.transaction.status !== 1) {
                    await this.props.history.push("/mytransactions")
                }
                else if (this.props.transaction.status === 1) {
                    await this.props.onCompleteTransaction(completeData)
                    await this.props.history.push("/mytransactions")
                }
            }
        });
    };

    onChange = (date, dateString) => {
        // console.log(date, dateString);
    }

    render() {
        // const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const { current } = this.state;
        var { transaction } = this.props
        // console.log(transaction)
        const steps = transaction.typetransaction === 1 ? [
            {
                title: 'Thỏa thuận mua ban đầu',
                content: <Deal transaction={transaction} />
            },
            {
                title: 'Kiểm tra tính pháp lý của bất động sản',
                content: <Legality transaction={transaction} />
            },
            {
                title: 'Đặt cọc',
                content: <Deposit transaction={transaction} />,
            },
            {
                title: 'Ký hợp đồng',
                content: <Contract transaction={transaction} />,
            },
            {
                title: 'Chuyển nhượng quyền sử dụng căn hộ',
                content: <Transfer transaction={transaction} />,
            },
            {
                title: 'Công chứng hợp đồng',
                content: <Confirmation transaction={transaction} />,
            },
            {
                title: 'Đóng thuế',
                content: <Tax transaction={transaction} />,
            },
            {
                title: 'Giao bất động sản',
                content: <Delivery transaction={transaction} />,
            },
        ] : [
                {
                    title: 'Thỏa thuận mua ban đầu',
                    content: <Deal transaction={transaction} />
                },
                {
                    title: 'Đặt cọc',
                    content: <Deposit transaction={transaction} />,
                },
                {
                    title: 'Ký hợp đồng',
                    content: <Contract transaction={transaction} />,
                },
                {
                    title: 'Công chứng hợp đồng',
                    content: <Confirmation transaction={transaction} />,
                },
                {
                    title: 'Giao bất động sản',
                    content: <Delivery transaction={transaction} />,
                },
            ]
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-8 col-sm-12">
                        <Progress percent={this.state.percent} status="active" strokeColor={{
                            '0%': '#108ee9',
                            '100%': '#87d068',
                        }} />
                        <hr></hr>
                        <Steps current={current} direction="vertical" size="small">
                            {steps.map(item => (
                                <Step key={item.title} title={item.title} />
                            ))}
                        </Steps>
                        {/* <hr></hr> */}
                        <div className="steps-content">{steps[current].content}</div>
                        {/* <hr></hr> */}
                        <div className="steps-action">
                            {current > 0 && (
                                <Button style={{}} onClick={() => this.prev()}>
                                    <i className="fa fa-arrow-left" style={{ marginRight: "3px" }}></i>Bước trước
                                </Button>
                            )}
                            {current < steps.length - 1 && (
                                <Button style={{ marginLeft: "10px" }} type="primary" onClick={() => this.next()}>
                                    <i className="fa fa-arrow-right" style={{ marginRight: "3px" }}></i> Bước tiếp
                                </Button>
                            )}
                            {current === steps.length - 1 && (
                                <Button style={{ marginLeft: "10px" }} type="primary" onClick={() => this.handleComplete()}>
                                    <i className="fa fa-check" style={{ marginRight: "3px" }}></i> Hoàn tất
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const WrappedForm = Form.create()(Stepper)

const mapStateToProps = (state) => {
    return {
        transactions: state.transaction
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGettingTransactionDetail: (id, type) => dispatch(transAction.actGettingTransactionDetailRequest(id, type)),
        onCompleteTransaction: (transactionId) => dispatch(transAction.actCompleteTransaction(transactionId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WrappedForm))