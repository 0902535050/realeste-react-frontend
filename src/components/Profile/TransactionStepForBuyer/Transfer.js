import React, { Component } from 'react'
import { Descriptions, Modal } from 'antd'
import { Image } from 'react-bootstrap'
import * as transAction from '../../../actions/transactionRequest'
import { connect } from 'react-redux'

class Transfer extends Component {
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
        var result = null
        if (images && images.length > 0)
            result = images.map((image, index) => {
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
                        <Descriptions title="Hình ảnh xác thực từ chủ căn hộ" column={1}>
                            <Descriptions.Item label="Hình ảnh xác thực từ chủ căn hộ">
                                {this.onShowImageList(transactionDetail.selldetail.transfer.image)}
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
                        <Descriptions title="Hình ảnh xác thực từ chủ căn hộ" column={1}>
                            <Descriptions.Item label="Hình ảnh xác thực từ chủ căn hộ">
                                {this.onShowImageList(transactionDetail.rentdetail.transfer.image)}
                            </Descriptions.Item>
                        </Descriptions>
                    </div>
                    <Modal visible={previewImage} footer={null} onCancel={this.onHandleCancel} width="800px" style={{ height: "500px" }}>
                        <img alt="example" src={previewUrl} style={{ width: "750px", height: "500px" }} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Transfer)

