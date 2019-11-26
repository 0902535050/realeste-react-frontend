import React, { Component } from 'react'
import MainHeader from '../components/MainHeader'
import Footer from '../components/Footer'
import Info from '../components/Profile/Info'
import { MY_TRANSACTION } from '../constants/Profile'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import SingleCurrTransaction from '../components/Profile/SingleCurrTransaction'
import * as transAction from '../actions/transactionRequest'
import { Empty, Icon, Spin } from 'antd'
import * as action from '../actions/transactionActions'
// import axios from 'axios'
// import { authHeader } from '../constants/authHeader'

const antIcon = <Icon type="loading" style={{ fontSize: 40 }} spin />

class MyTransaction extends Component {
  // _isMounted = false
  constructor() {
    super()
    this.state = {
      loading: false
    }
  }


  componentDidMount = () => {
    this.setState({ loading: true })
    // console.log("outside")
    this.props.onGetTransactionHistory('1')
    // axios.get(`http://localhost:3001/transaction/history/1`, { headers: authHeader() })
    //   .then(res => {
    //     if (this._isMounted) {
    //       console.log("inside")
    //       if (res.data.status === 200) {
    //         this.props.onGetHistory(res.data.history)
    //       }
    //     }
    //   })
    //   .catch(error => {
    //     message.error(`Có lỗi xảy ra: ${error}`)
    //   })
    this.setState({ loading: false })

  }

  render() {
    var { transaction } = this.props
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
                    <h1><span>Giao dịch</span> của tôi</h1>
                  </div>
                  <br></br>
                  {/* table start */}
                  {this.state.loading ? <Spin
                    indicator={antIcon}
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "200px",
                      marginRight: "-50%",
                    }}
                  /> :
                    <table className="manage-table responsive-table">
                      <tbody>
                        {this.ShowTransactionList(transaction)}
                      </tbody>
                    </table>}
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
  ShowTransactionList = (transaction) => {
    var result = null;
    if (transaction.length > 0) {
      result = transaction.map((single, index) => {
        // console.log(single)
        if (single.transaction !== null)
          return (
            <SingleCurrTransaction key={index} transactionSingle={single} />

          );
      });
    }
    else if (transaction.length === 0 || transaction === undefined) {
      result = (<Empty />)
    }
    return result;
  }
}

const mapStateToProps = (state) => {
  return {
    transaction: state.transaction
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetTransactionHistory: (page) => dispatch(transAction.actGettingTransactionHistoryRequest(page)),
    onGetHistory: (data) => dispatch(action.actGetTransactionHistory(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyTransaction)
