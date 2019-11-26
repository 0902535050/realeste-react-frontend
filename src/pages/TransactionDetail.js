import React, { Component } from 'react'
import MainHeader from '../components/MainHeader'
import Footer from '../components/Footer'
import Info from '../components/Profile/Info'
import { MY_TRANSACTION } from '../constants/Profile'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
// import SingleCurrTransaction from '../components/Profile/SingleCurrTransaction'
import Stepper from '../components/Profile/Stepper'
import StepperForBuyer from '../components/Profile/StepperForBuyer'
import * as transAction from '../actions/transactionRequest'

class TransactionDetail extends Component {

    componentDidMount = () => {
        this.props.onGettingTransactionDetail(this.props.match.params.id, this.props.match.params.type)
    }

    onShowTransactionDetail = (transaction) => {
        if (JSON.parse(localStorage.getItem('res')).user._id === transaction.seller)
            return <Stepper transaction={transaction} />
        else if (JSON.parse(localStorage.getItem('res')).user._id === transaction.buyer)
            return <StepperForBuyer transaction={transaction} />
    }
    render() {
        var { transaction } = this.props
        // console.log(transaction)
        return (
            localStorage.getItem('res') ?
                <div>
                    <MainHeader />
                    {/* Sub banner start */}
                    <div className="sub-banner overview-bgi">
                        <div className="overlay">
                            <div className="container">
                                <div className="breadcrumb-area">
                                    <h1>Giao dịch của tôi</h1>
                                    <ul className="breadcrumbs">
                                        <li><Link to="/">Trang chủ</Link></li>
                                        <li className="active">Giao dịch của tôi</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Sub Banner end */}

                    {/* My Propertiess start */}
                    <div className="content-area-7 my-properties">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-4 col-md-4 col-sm-12">
                                    <Info component={MY_TRANSACTION} />
                                </div>
                                <div className="col-lg-8 col-md-8 col-sm-12">
                                    <div className="main-title-2">
                                        <h1>
                                            <span>Giao dịch của tôi</span>
                                        </h1>
                                    </div>
                                    {/* table start */}
                                    <table className="manage-table responsive-table">
                                        <tbody>
                                            {/* {this.ShowFollowingList(follow)} */}
                                            {this.onShowTransactionDetail(transaction)}
                                        </tbody>
                                    </table>
                                    {/* table end */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* My Propertiess end */}
                    <Footer />
                </div> : <Redirect to={`/login`} />
        )
    }
    //   ShowTransactionList = (transaction) => {
    //     var result = null;
    //     if (transaction.length > 0) {
    //       result = transaction.map((single, index) => {
    //         console.log(single)
    //         if (single.transaction !== null)
    //           return (
    //             <SingleCurrTransaction key={index} transactionSingle={single} />

    //           );
    //       });
    //     }
    //     else if (transaction.length === 0 || transaction === undefined) {
    //       result = (<tr><td>Hiện bạn chưa có giao dịch nào!</td></tr>)
    //     }
    //     return result;
    //   }
}

const mapStateToProps = (state) => {
    return {
        transaction: state.transaction
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGettingTransactionDetail: (id, type) => dispatch(transAction.actGettingTransactionDetailRequest(id, type)),
        onGettingTransactionHistory: () => dispatch(transAction.actGettingTransactionHistoryRequest()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetail)
