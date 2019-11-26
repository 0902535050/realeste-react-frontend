/* eslint-disable */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import { Image } from 'react-bootstrap'
import request from 'superagent'
import * as transAction from '../../../actions/transactionRequest'
import { Button, message, Form, Modal } from 'antd';
import moment from 'moment'

const CLOUDINARY_UPLOAD_PRESET = 'nn6imhmo';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dne3aha8f/image/upload';
const confirm = Modal.confirm;

class Transfer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ownerArray: [],
            ownerPreviewImageBeforeUpload: [],
            ownerListImagesBeforeUpload: [],
            previewImage: false,
            previewUrl: '',
            loading: false
        }
    }

    onHandlePreviewImage = (event) => {
        this.setState({ previewImage: true, previewUrl: event.target.src })
    }

    onHandleCancelImage = () => {
        this.setState({ previewImage: false })
    }

    componentDidMount = () => {
        this.props.onGettingTransactionDetail(this.props.transaction._id, this.props.transaction.typetransaction)
        this.setState({
            ownerArray: this.props.transactions.selldetail.transfer.image,
        })
    }

    onUploadingOwnerImages = async (list) => {
        // console.log(list)
        await Promise.all(list.map(async file => {
            await
                request
                    .post(CLOUDINARY_UPLOAD_URL)
                    .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                    .field('file', file)
                    .then(response => {
                        // console.log(response)
                        this.setState({
                            ownerArray: this.state.ownerArray.concat({ url: response.body.secure_url, id: response.body.public_id }),
                        })
                    })
                    .catch(err => message.error(`Có lỗi xảy ra: ${err}`))
        }))
        this.setState({ ownerListImagesBeforeUpload: [] })
        // console.log(this.state.ownerArray)

    }

    handleOwnerUpload(files) {
        files.map(file => {
            // console.log(file)
            let reader = new FileReader()
            reader.onloadend = () => {
                // console.log(reader.result)
                this.setState({
                    ownerArray: [...this.state.ownerArray, reader.result],
                    ownerPreviewImageBeforeUpload: [...this.state.ownerPreviewImageBeforeUpload, reader.result],
                    ownerListImagesBeforeUpload: [...this.state.ownerListImagesBeforeUpload, file]
                })
                // console.log(reader.result, file)
            }
            reader.readAsDataURL(file);
        })
    }

    onShowImageBeforeUpload = (array) => {
        let result = []
        if (array && array.length > 0) {
            for (var i = 0; i < array.length; i++) {
                result.push(<div className="col-md-3" key={i}>
                    <Image
                        className="imagepreview"
                        src={array[i].url ? array[i].url : array[i]}
                        thumbnail
                        style={{ width: "150px", height: "100px", cursor: "pointer" }}
                        onClick={this.onHandlePreviewImage}
                    >
                    </Image>
                    <button
                        type="button"
                        className="close"
                        aria-label="Close"
                        style={{ top: "-100px", left: "-5px", position: "relative", color: "#0A10C8" }}
                        onClick={this.showOwnerDeleteConfirm} value={array[i].url ? i : array[i]}>
                        x
                    </button>
                </div>)
            }
        }
        else return null
        return result
    }

    showOwnerDeleteConfirm = (event) => {
        var index = event.target.value
        this.state.ownerPreviewImageBeforeUpload.map((image, key) => {
            if (image === index) {
                index = key
            }
        })
        confirm({
            title: 'Bạn muốn xóa hình này không?',
            okText: 'Có',
            okType: 'danger',
            cancelText: 'Trở lại',
            onOk: () => {
                // console.log('OK');
                this.state.ownerListImagesBeforeUpload.splice(index, 1)
                this.state.ownerPreviewImageBeforeUpload.splice(index, 1)
                this.state.ownerArray.splice(index, 1)
                this.setState({
                    ownerPreviewImageBeforeUpload: this.state.ownerPreviewImageBeforeUpload,
                    ownerListImagesBeforeUpload: this.state.ownerListImagesBeforeUpload,
                    ownerArray: this.state.ownerArray
                })
            },
            onCancel() {
                // console.log('Cancel');
            },
        });
    }
    onSendingData = (uploadList, transactions) => {
        return new Promise(async () => {
            await Promise.all(this.state.ownerArray.map(image => {
                if (image.url) {
                    uploadList.push(image)
                }
            }))
            this.setState({ ownerArray: uploadList })
            // if (uploadList.length === 0)
            //     return message.error('Bạn chưa tải lên hình nào!')
            var transferData = {
                image: uploadList,
                updateTime: moment().unix(),
                _id: transactions._id,
                id: transactions.selldetail._id,
                complete: true
            }

            await this.props.onSendingTransfer(transferData)
            await this.setState({ loading: false })
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        var uploadList = []
        var { transactions } = this.props
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                try {
                    await this.setState({ loading: true })
                    await this.onUploadingOwnerImages(this.state.ownerListImagesBeforeUpload);
                    await this.onSendingData(uploadList, transactions);
                } catch (error) {
                    message.error(error)
                }
            }
        })
    }
    render() {
        var { ownerArray, previewImage, previewUrl, loading } = this.state
        // const { getFieldDecorator } = this.props.form;
        return (
            <div className="container">
                <Form onSubmit={this.handleSubmit}>
                    <div className="col-md-8 col-lg-8 col-xs-12">
                        <Form.Item label="Hình ảnh xác thực từ chính quyền địa phương: ">
                            <div className="col-md-3 col-lag-3 col-xs-12">
                                <div className="photoUpload">
                                    <Dropzone
                                        onDrop={this.handleOwnerUpload.bind(this)}
                                        multiple={true}
                                        accept="image/*">
                                        {({ getRootProps, getInputProps }) => {
                                            return (
                                                <div
                                                    {...getRootProps()}
                                                    style={{ border: "1px solid #95c41f", borderRadius: "2px" }}
                                                >
                                                    <input {...getInputProps()} />
                                                    {
                                                        <span style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><i className="fa fa-upload" /> Tải ảnh lên</span>
                                                    }
                                                </div>
                                            )
                                        }}
                                    </Dropzone>
                                </div>
                            </div>
                        </Form.Item>
                        <div className="col-md-8 col-lag-8 col-xs-12">
                            <div className="row">
                                <div className="clearfix">
                                    {(ownerArray && ownerArray.length > 0) ? this.onShowImageBeforeUpload(ownerArray) : null}
                                </div>
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
                <Modal visible={previewImage} footer={null} onCancel={this.onHandleCancelImage} width="800px" style={{ height: "500px" }}>
                    <img alt="example" src={previewUrl} style={{ width: "750px", height: "500px" }} />
                </Modal>
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
        onSendingTransfer: (TransferData) => dispatch(transAction.actPostingTransferRequest(TransferData))
    }
}

const WrappedFormTransfer = Form.create()(Transfer)

export default connect(mapStateToProps, mapDispatchToProps)(WrappedFormTransfer)
