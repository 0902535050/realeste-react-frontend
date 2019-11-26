import React, { Component } from 'react'
import { Descriptions, Modal } from 'antd'
import { Image } from 'react-bootstrap'
import * as transAction from '../../../actions/transactionRequest'
import { connect } from 'react-redux'
import moment from 'moment'

class Contract extends Component {
    constructor(props) {
        super(props)

        this.state = {
            previewImage: false,
            previewUrl: ''
        }
    }

    onHandleCancel = () => {
        this.setState({ previewImage: false })
    }

    onHandleOpenImageThumbnail = (event) => {
        this.setState({ previewImage: true, previewUrl: event.target.src })
    }

    onShowImageList = (images) => {
        // console.log(images)
        var result = null
        if (images && images.length > 0)
            result = images.map((image, index) => {
                // console.log(image.url)
                return (
                    <Image
                        key={index}
                        className="imagepreview"
                        src={image.url}
                        thumbnail
                        style={{ width: "150px", height: "100px", cursor: "pointer" }}
                        onClick={this.onHandleOpenImageThumbnail}
                    ></Image>
                )
            })
        else result = (<span style={{ display: "flex", alignContent: "center", justifyContent: "center" }}>Không có hình ảnh</span>)
        return result
    }
    render() {
        var { previewImage, previewUrl } = this.state
        var { transactionDetail } = this.props
        return (
            transactionDetail.typetransaction === 1 ?
                <div className="container">
                    <div className="col-lg-8 col-md-8 col-sm-12">
                        <Descriptions title="Ký hợp đồng" column={1}>
                            <Descriptions.Item label="Ngày kí hợp đồng: ">
                                {transactionDetail.selldetail.contract.datesign === 0 ? null : moment.unix(transactionDetail.selldetail.contract.datesign).format('DD/MM/YYYY, h:mm a')}
                            </Descriptions.Item>

                            <Descriptions.Item label="Số hợp đồng: ">
                                {transactionDetail.selldetail.contract.number === '0' ? null : transactionDetail.selldetail.contract.number}
                            </Descriptions.Item>

                            <Descriptions.Item label="Hình ảnh xác thực từ hợp đồng mua bán: ">
                                {this.onShowImageList(transactionDetail.selldetail.contract.image)}
                            </Descriptions.Item>
                        </Descriptions>
                    </div>
                    <Modal visible={previewImage} footer={null} onCancel={this.onHandleCancel} width="800px" style={{ height: "500px" }}>
                        <img alt="example" src={previewUrl} style={{ width: "750px", height: "500px" }} />
                    </Modal>
                </div>
                :
                <div className="container">
                    <div className="col-lg-8 col-md-8 col-sm-12">
                        <Descriptions title="Ký hợp đồng" column={1}>
                            <Descriptions.Item label="Ngày kí hợp đồng: ">
                                {transactionDetail.rentdetail.contract.datesign === 0 ? null : moment.unix(transactionDetail.rentdetail.contract.datesign).format('DD/MM/YYYY, h:mm a')}
                            </Descriptions.Item>

                            <Descriptions.Item label="Số hợp đồng: ">
                                {transactionDetail.rentdetail.contract.number === '0' ? null : transactionDetail.rentdetail.contract.number}
                            </Descriptions.Item>

                            <Descriptions.Item label="Hình ảnh xác thực từ hợp đồng mua bán: ">
                                {this.onShowImageList(transactionDetail.rentdetail.contract.image)}
                            </Descriptions.Item>
                        </Descriptions>
                    </div>
                    <Modal visible={previewImage} footer={null} onCancel={this.onHandleCancel} width="800px" style={{ height: "500px" }}>
                        <img alt="example" src={previewUrl} style={{ width: "750px", height: "750px" }} />
                    </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(Contract)

