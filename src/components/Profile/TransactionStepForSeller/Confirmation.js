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

class Confirmation extends Component {
    constructor(props) {
        super(props)

        this.state = {
            governmentArray: [],
            governmentPreviewImageBeforeUpload: [],
            governmentListImagesBeforeUpload: [],
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
        if (this.props.transaction.typetransaction === 1)
            this.setState({
                governmentArray: this.props.transactions.selldetail.confirmation.image,
            })
        else if (this.props.transaction.typetransaction === 2) {
            this.setState({
                governmentArray: this.props.transactions.rentdetail.confirmation.image,
            })
        }
    }

    onUploadingGovernmentImages = async (list) => {
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
                            governmentArray: this.state.governmentArray.concat({ url: response.body.secure_url, id: response.body.public_id }),
                        })
                    })
                    .catch(err => message.error(`Có lỗi xảy ra: ${err}`))
        }))
        this.setState({ governmentListImagesBeforeUpload: [] })
        // console.log(this.state.governmentArray)

    }

    handleGovernmentUpload(files) {
        files.map(file => {
            // console.log(file)
            let reader = new FileReader()
            reader.onloadend = () => {
                // console.log(reader.result)
                this.setState({
                    governmentArray: [...this.state.governmentArray, reader.result],
                    governmentPreviewImageBeforeUpload: [...this.state.governmentPreviewImageBeforeUpload, reader.result],
                    governmentListImagesBeforeUpload: [...this.state.governmentListImagesBeforeUpload, file]
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
                        onClick={this.showGovernmentDeleteConfirm} value={array[i].url ? i : array[i]}>
                        x
                    </button>
                </div>)
            }
        }
        else return null
        return result
    }

    showGovernmentDeleteConfirm = (event) => {
        var index = event.target.value
        this.state.governmentPreviewImageBeforeUpload.map((image, key) => {
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
                this.state.governmentListImagesBeforeUpload.splice(index, 1)
                this.state.governmentPreviewImageBeforeUpload.splice(index, 1)
                this.state.governmentArray.splice(index, 1)
                this.setState({
                    governmentPreviewImageBeforeUpload: this.state.governmentPreviewImageBeforeUpload,
                    governmentListImagesBeforeUpload: this.state.governmentListImagesBeforeUpload,
                    governmentArray: this.state.governmentArray
                })
            },
            onCancel() {
                // console.log('Cancel');
            },
        });
    }
    onSendingData = (uploadList, transactions) => {
        if (this.props.transaction.typetransaction === 1) {
            return new Promise(async () => {
                await Promise.all(this.state.governmentArray.map(image => {
                    if (image.url) {
                        uploadList.push(image)
                    }
                }))
                this.setState({ governmentArray: uploadList })
                // if (uploadList.length === 0)
                //     return message.error('Bạn chưa tải lên hình nào!')
                var governmentData = {
                    image: uploadList,
                    updateTime: moment().unix(),
                    _id: transactions._id,
                    id: transactions.selldetail._id,
                    complete: true
                }

                await this.props.onSendingSellingConfirmation(governmentData)
                await this.setState({ loading: false })
            })
        }
        else if (this.props.transaction.typetransaction === 2) {
            return new Promise(async () => {
                await Promise.all(this.state.governmentArray.map(image => {
                    if (image.url) {
                        uploadList.push(image)
                    }
                }))
                this.setState({ governmentArray: uploadList })
                // if (uploadList.length === 0)
                //     return message.error('Bạn chưa tải lên hình nào!')
                var governmentData = {
                    image: uploadList,
                    updateTime: moment().unix(),
                    _id: transactions._id,
                    id: transactions.rentdetail._id,
                    complete: true
                }

                await this.props.onSendingRentingConfirmation(governmentData)
                await this.setState({ loading: false })
            })
        }

    }
    handleSubmit = (e) => {
        e.preventDefault()
        var uploadList = []
        var { transactions } = this.props
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                try {
                    await this.setState({ loading: true })
                    await this.onUploadingGovernmentImages(this.state.governmentListImagesBeforeUpload);
                    await this.onSendingData(uploadList, transactions);
                } catch (error) {
                    message.error(error)
                }
            }
        })
    }
    render() {
        var { governmentArray, previewImage, previewUrl, loading } = this.state
        // const { getFieldDecorator } = this.props.form;
        return (
            <div className="container">
                <Form onSubmit={this.handleSubmit}>
                    <div className="col-md-8 col-lg-8 col-xs-12">
                        <Form.Item label="Hình ảnh xác thực từ chính quyền địa phương: ">
                            <div className="col-md-3 col-lag-3 col-xs-12">
                                <div className="photoUpload">
                                    <Dropzone
                                        onDrop={this.handleGovernmentUpload.bind(this)}
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
                                    {(governmentArray && governmentArray.length > 0) ? this.onShowImageBeforeUpload(governmentArray) : null}
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
        onSendingSellingConfirmation: (confirmationData) => dispatch(transAction.actPostingConfirmationRequest(confirmationData)),
        onSendingRentingConfirmation: (confirmationData) => dispatch(transAction.actPostingRentingConfirmationRequest(confirmationData))
    }
}

const WrappedFormConfirmation = Form.create()(Confirmation)

export default connect(mapStateToProps, mapDispatchToProps)(WrappedFormConfirmation)
