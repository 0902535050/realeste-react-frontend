/* eslint-disable */
import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import { connect } from 'react-redux'
import { Image } from 'react-bootstrap'
import request from 'superagent'
import { Button, message, Form, Modal } from 'antd';
import * as transAction from '../../../actions/transactionRequest'
import moment from 'moment'

const CLOUDINARY_UPLOAD_PRESET = 'nn6imhmo';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dne3aha8f/image/upload';
const confirm = Modal.confirm;

class Legality extends Component {
    constructor(props) {
        super(props)

        this.state = {
            governmentArray: [],
            governmentPreviewImageBeforeUpload: [],
            governmentListImagesBeforeUpload: [],
            certificateArray: [],
            certificatePreviewImageBeforeUpload: [],
            certificateListImagesBeforeUpload: [],
            contractArray: [],
            contractPreviewImageBeforeUpload: [],
            contractListImagesBeforeUpload: [],
            previewImage: false,
            previewUrl: '',
            loading: false

        }
    }

    componentDidMount = () => {
        this.props.onGettingTransactionDetail(this.props.transaction._id, this.props.transaction.typetransaction)
        this.setState({
            certificateArray: this.props.transactions.selldetail.legality.certificate,
            governmentArray: this.props.transactions.selldetail.legality.government,
            contractArray: this.props.transactions.selldetail.legality.contract,
        })
    }

    onSendingLegalityInfo = () => {
        var legalityInfo = {
            complete: true,
            updateTime: moment().unix(),
            _id: this.props.transactions._id,
            id: this.props.transactions.selldetail._id,
            government: this.state.governmentArray.length === 0 ? this.props.transactions.selldetail.legality.government : this.state.governmentArray,
            certificate: this.state.certificateArray.length === 0 ? this.props.transactions.selldetail.legality.certificate : this.state.certificateArray,
            contract: this.state.contractArray.length === 0 ? this.props.transactions.selldetail.legality.contract : this.state.contractArray,
        }

        if (legalityInfo.government === this.props.transactions.selldetail.legality.government
            && legalityInfo.contract === this.props.transactions.selldetail.legality.contract
            && legalityInfo.certificate === this.props.transactions.selldetail.legality.certificate)
            return message.warning("Bạn chưa thay đổi gì cả!")

        if (legalityInfo.government.length === 0)
            return message.error("Bạn phải tải lên hình ảnh xác thực từ chính quyền địa phương!")

        this.props.onSendingLegality(legalityInfo)
    }
    onHandlePreviewImage = (event) => {
        this.setState({ previewImage: true, previewUrl: event.target.src })
    }

    onHandleCancelImage = () => {
        this.setState({ previewImage: false })
    }

    onUploadingContractImages = async (list) => {
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
                            contractArray: this.state.contractArray.concat({ url: response.body.secure_url, id: response.body.public_id }),
                        })
                    })
                    .catch(err => message.error(`Có lỗi xảy ra: ${err}`))
        }))
        this.setState({ contractListImagesBeforeUpload: [] })
        // console.log(this.state.contractArray)

    }
    onUploadingCertificateImages = async (list) => {
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
                            certificateArray: this.state.certificateArray.concat({ url: response.body.secure_url, id: response.body.public_id }),
                        })
                    })
                    .catch(err => message.error(`Có lỗi xảy ra: ${err}`))
        }))
        this.setState({ certificateListImagesBeforeUpload: [] })
        // console.log(this.state.certificateArray)

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

    handleContractUpload(files) {
        files.map(file => {
            // console.log(file)
            let reader = new FileReader()
            reader.onloadend = () => {
                // console.log(reader.result)
                this.setState({
                    contractArray: [...this.state.contractArray, reader.result],
                    contractPreviewImageBeforeUpload: [...this.state.contractPreviewImageBeforeUpload, reader.result],
                    contractListImagesBeforeUpload: [...this.state.contractListImagesBeforeUpload, file]
                })
                // console.log(reader.result, file)
            }
            reader.readAsDataURL(file);
        })
    }
    handleCertificateUpload(files) {
        files.map(file => {
            // console.log(file)
            let reader = new FileReader()
            reader.onloadend = () => {
                // console.log(reader.result)
                this.setState({
                    certificateArray: [...this.state.certificateArray, reader.result],
                    certificatePreviewImageBeforeUpload: [...this.state.certificatePreviewImageBeforeUpload, reader.result],
                    certificateListImagesBeforeUpload: [...this.state.certificateListImagesBeforeUpload, file]
                })
                // console.log(reader.result, file)
            }
            reader.readAsDataURL(file);
        })
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

    onShowContractImageBeforeUpload = (array) => {
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
                        onClick={this.showContractDeleteConfirm} value={array[i].url ? i : array[i]}>
                        x
                    </button>
                </div>)
            }
        }
        else return null
        return result
    }

    onShowCertificateImageBeforeUpload = (array) => {
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
                        onClick={this.showCertificateDeleteConfirm} value={array[i].url ? i : array[i]}>
                        x
                    </button>
                </div>)
            }
        }
        else return null
        return result
    }

    onShowGovernmentImageBeforeUpload = (array) => {
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

    showCertificateDeleteConfirm = (event) => {
        var index = event.target.value
        this.state.certificatePreviewImageBeforeUpload.map((image, key) => {
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
                this.state.certificateListImagesBeforeUpload.splice(index, 1)
                this.state.certificatePreviewImageBeforeUpload.splice(index, 1)
                this.state.certificateArray.splice(index, 1)
                this.setState({
                    certificatePreviewImageBeforeUpload: this.state.certificatePreviewImageBeforeUpload,
                    certificateListImagesBeforeUpload: this.state.certificateListImagesBeforeUpload,
                    certificateArray: this.state.certificateArray
                })
            },
            onCancel() {
                // console.log('Cancel');
            },
        });
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

    showContractDeleteConfirm = (event) => {
        var index = event.target.value
        this.state.contractPreviewImageBeforeUpload.map((image, key) => {
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
                this.state.contractListImagesBeforeUpload.splice(index, 1)
                this.state.contractPreviewImageBeforeUpload.splice(index, 1)
                this.state.contractArray.splice(index, 1)
                this.setState({
                    contractPreviewImageBeforeUpload: this.state.contractPreviewImageBeforeUpload,
                    contractListImagesBeforeUpload: this.state.contractListImagesBeforeUpload,
                    contractArray: this.state.contractArray
                })
            },
            onCancel() {
                // console.log('Cancel');
            },
        });
    }

    onSendingData = (contractUploadList, certificateUploadList, governmentUploadList, transactions) => {
        return new Promise(async () => {
            await Promise.all(this.state.contractArray.map(image => {
                if (image.url) {
                    contractUploadList.push(image)
                }
            }))
            await Promise.all(this.state.certificateArray.map(image => {
                if (image.url) {
                    certificateUploadList.push(image)
                }
            }))
            await Promise.all(this.state.governmentArray.map(image => {
                if (image.url) {
                    governmentUploadList.push(image)
                }
            }))
            this.setState({
                contractArray: contractUploadList,
                governmentArray: governmentUploadList,
                certificateArray: certificateUploadList
            })

            var legalityInfo = {
                complete: true,
                updateTime: moment().unix(),
                _id: transactions._id,
                id: transactions.selldetail._id,
                government: governmentUploadList,
                certificate: certificateUploadList,
                contract: contractUploadList,
            }

            if (legalityInfo.government === transactions.selldetail.legality.government
                && legalityInfo.contract === transactions.selldetail.legality.contract
                && legalityInfo.certificate === transactions.selldetail.legality.certificate)
                return message.warning("Bạn chưa thay đổi gì cả!")

            await this.props.onSendingLegality(legalityInfo)
            await this.setState({ loading: false })
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        var governmentUploadList = [], certificateUploadList = [], contractUploadList = []
        var { transactions } = this.props
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                try {
                    await this.setState({ loading: true })
                    await this.onUploadingContractImages(this.state.contractListImagesBeforeUpload);
                    await this.onUploadingCertificateImages(this.state.certificateListImagesBeforeUpload)
                    await this.onUploadingGovernmentImages(this.state.governmentListImagesBeforeUpload)
                    await this.onSendingData(contractUploadList, certificateUploadList, governmentUploadList, transactions);

                } catch (error) {
                    message.error(error)
                }
            }
        })
    }
    render() {
        // const { getFieldDecorator } = this.props.form
        var { transactions } = this.props
        var legality = transactions.selldetail.legality
        // console.log(legality)
        var { previewImage,
            previewUrl,
            contractArray,
            certificateArray,
            governmentArray,
            loading
        } = this.state
        return (
            <div className="container">
                <Form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col-md-8 col-lag-8 col-xs-12">
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
                                        {(governmentArray && governmentArray.length > 0) ? this.onShowGovernmentImageBeforeUpload(governmentArray) : null}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-md-8 col-lag-8 col-xs-12">
                            <Form.Item label="Hình ảnh xác thực từ hợp đồng mua bán (tùy chọn): ">
                                <div className="col-md-3 col-lag-3 col-xs-12">
                                    <div className="photoUpload">
                                        <Dropzone
                                            onDrop={this.handleContractUpload.bind(this)}
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
                                        {(contractArray && contractArray.length > 0) ? this.onShowContractImageBeforeUpload(contractArray) : null}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-md-8 col-lag-8 col-xs-12">
                            <Form.Item label="Hình ảnh xác thực từ giấy chứng nhận quyền sử dụng đất (tùy chọn): ">
                                <div className="col-md-3 col-lag-3 col-xs-12">
                                    <div className="photoUpload">
                                        <Dropzone
                                            onDrop={this.handleCertificateUpload.bind(this)}
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
                                        {(certificateArray && certificateArray.length > 0) ? this.onShowCertificateImageBeforeUpload(certificateArray) : null}
                                    </div>
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

const mapStateToProps = (state) => ({
    transactionDetail: state.transactionDetail,
    transactions: state.transaction
})

const mapDispatchToProps = (dispatch) => {
    return {
        onSendingLegality: (legalityData) => dispatch(transAction.actPostingLegalityRequest(legalityData)),
        onGettingTransactionDetail: (id, type) => dispatch(transAction.actGettingTransactionDetailRequest(id, type))
    }
}

const WrappedFormLegality = Form.create()(Legality)

export default connect(mapStateToProps, mapDispatchToProps)(WrappedFormLegality)
