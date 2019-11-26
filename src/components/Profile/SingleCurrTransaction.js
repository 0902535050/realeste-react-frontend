/* eslint-disable */
import React, { Component } from 'react'
import { Button, Tag, Modal, Icon, Tooltip, message } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'
import * as transAction from '../../actions/transactionRequest'
import axios from 'axios'
import * as actions from '../../actions/transactionActions'
import { authHeader } from '../../constants/authHeader'
import * as config from '../../constants/Config'

const confirm = Modal.confirm

class SingleCurrTransaction extends Component {
  constructor(props) {
    super(props)
    // console.log(props)
    this.state = {
      waitingId: '',
      loading: false
    }
    this.showDeleteConfirm = this.showDeleteConfirm.bind(this)
  }
  // abortController = new AbortController()

  showDeleteConfirm() {
    confirm({
      title: 'Bạn có chắc chắn xóa giao dịch này không?',
      content: 'Toàn bộ thông tin giao dịch sẽ mất!',
      okText: this.state.loading ? "Đang xóa" : "Xóa",
      okType: 'danger',
      cancelText: 'Trở về',
      okButtonProps: {
        disabled: this.state.loading,
      },
      onOk: () => {
        this.setState({ loading: true })
        var deleteData = {
          transactionid: this.props.transactionSingle._id,
          type: this.props.transactionSingle.typetransaction,
          transactiondetail: this.props.transactionSingle.typetransaction === 1 ? this.props.transactionSingle.selldetail : this.props.transactionSingle.rentdetail,
          projectid: this.props.transactionSingle.project._id,
          seller: this.props.transactionSingle.seller,
          buyer: this.props.transactionSingle.buyer
        }
        
        // this.props.onCancelTransaction(deleteData) 
        axios.post(`${config.API_URL}/transaction/cancel`, deleteData, { headers: authHeader() })
          .then(res => {
            if (res.data.status === 200) {
              this.props.onCancel(this.props.transactionSingle._id)
              message.success("Xóa giao dịch thành công!")
            }
          })
          .catch(error => {
            // console.log(error)
            if(error.response.data.status === 404 && this.props.transactionSingle.status !== 1) return message.error("Chỉ có thể xóa giao dịch đang trong quá trình!")
            message.error(`Có lỗi xảy ra: ${error}`)
          })
        this.setState({ loading: false })
        
      },
      onCancel() {
        // console.log('Cancel');
      },
    });
  }

  // componentWillUnmount() {
  //   this.abortController.abort()
  // }
  render() {
    let { transactionSingle } = this.props
    // console.log(transactionSingle)
    return (
      <div className="containerTran" style={{ padding: "0px 20px", width: "100%" }}>
        <tr className="transactionSingle">
          <td className="title-container">
            <img src={transactionSingle.project.url[0]} alt="my-properties-1" className="img-responsive hidden-xs" style={{ width: "150px", height: "150px", marginLeft: "10px" }} />
            <div className="title">
              <Link to={`/mytransactions/${transactionSingle._id}/${transactionSingle.typetransaction}`}>
                <h4 style={{ color: "#84ad1d", fontSize: "20px", cursor: "pointer" }} className="transaction-title">{transactionSingle.project.name}</h4>
              </Link>
              <span><i className="fa fa-user-circle-o" />{transactionSingle.project.investor}</span>
              <span><i className="fa fa-map-marker" style={{ width: "10px", marginLeft: "2px" }} />{transactionSingle.project.address}</span>
              {/* <span className="table-property-price"><i className="fa fa-money" />{estateListOfUser.price}</span> */}
              <span className="hidden-xs"><i className="fa fa-calendar-check-o" />
                {moment.unix(transactionSingle.updateTime).format('DD/MM/YYYY, h:mm a')}
              </span>
              <span>
                <i className="fa fa-money" style={{ marginRight: "5px" }}></i>
                {transactionSingle.project.price >= 1000 && transactionSingle.typetransaction === 1
                  ? (transactionSingle.project.price / 1000).toFixed(2) + ' tỷ VNĐ' : transactionSingle.project.price + ' ' + transactionSingle.project.unit}
              </span>
            </div>
          </td>
          <td style={{ textAlign: "center" }}>
            <div>
              {transactionSingle.status === 1 ?
                <Tag color="cyan" style={{ width: "150px" }}>Đang giao dịch</Tag>
                : transactionSingle.status === 2 ? <Tag color="purple" style={{ width: "150px" }}>Đang chờ xác nhận</Tag> : transactionSingle.status === 3 ? <Tag color="green" style={{ width: "150px" }}>Giao dịch thành công</Tag>
                  : <Tag color="red" style={{ width: "150px" }}>Giao dịch hết hạn</Tag>}
            </div>
          </td>
          {this.props.transactionSingle.seller === JSON.parse(localStorage.getItem('res')).user._id
            ? <td>
              <Tooltip title="Xóa giao dịch">
                <Icon type="delete" style={{ fontSize: "25px" }} className="transactionDelete" onClick={this.showDeleteConfirm} />
              </Tooltip>
            </td> : null}
        </tr>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    transaction: state.transaction,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCancelTransaction: (data) => dispatch(transAction.actCancelTransactionRequest(data)),
    onCancel: (data) => dispatch(actions.actCancelTransaction(data)),
    // onGetTransactionHistory: (page) => dispatch(transAction.actGettingTransactionHistoryRequest(page)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)((SingleCurrTransaction))