import React, { Component } from 'react'
import MainHeader from '../components/MainHeader'
import Footer from '../components/Footer'
import Info from '../components/Profile/Info'
import {MY_TRANSACTION_HISTORY} from '../constants/Profile'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import SingleTransHistory from '../components/Profile/SingleTransHistory'

class TransHistory extends Component {
  render() {
    return (
      <div>
        <MainHeader />
                {/* Sub banner start */}
                <div className="sub-banner overview-bgi">
                    <div className="overlay">
                        <div className="container">
                            <div className="breadcrumb-area">
                                <h1>Lịch sử giao dịch của tôi</h1>
                                <ul className="breadcrumbs">
                                    <li><Link to="/">Trang chủ</Link></li>
                                    <li className="active">Lịch sử giao dịch của tôi</li>
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
                                <Info component={MY_TRANSACTION_HISTORY} />
                            </div>
                            <div className="col-lg-8 col-md-8 col-sm-12">
                                <div className="main-title-2">
                                    <h1><span>Lịch sử</span> Giao dịch</h1>
                                </div>
                                {/* table start */}
                                <table className="manage-table responsive-table">
                                    <tbody>
                                        {/* {this.ShowFollowingList(follow)} */}
                                    </tbody>
                                </table>
                                {/* table end */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* My Propertiess end */}
                <Footer />
      </div>
    )
  }
  ShowTransHistoryList = (transHistory) => {
    var result = null;
    if (transHistory.length > 0) {
      result = transHistory.map((single, index) => {
        // console.log(single)
        if (single.transHistory !== null)
          return (
            <SingleTransHistory key={index} transHistorySingle={single} />

          );
      });
    }
    else if (transHistory.length === 0 || transHistory === undefined) {
      result = (<tr><td>Lịch sử giao dịch hiện đang trống!</td></tr>)
    }
    return result;
  }
}

const mapStateToProps = (state) => {

}

const mapDispatchToProps = (dispatch) => {

}

export default connect(mapStateToProps, mapDispatchToProps)(TransHistory)
