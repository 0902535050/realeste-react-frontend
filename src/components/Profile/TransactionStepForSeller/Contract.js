import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import { Image } from 'react-bootstrap'
import request from 'superagent'
import { Button, message, Form, Input, DatePicker, Modal } from 'antd';
import * as transAction from '../../../actions/transactionRequest'
import moment from 'moment'

const CLOUDINARY_UPLOAD_PRESET = 'nn6imhmo';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dne3aha8f/image/upload';
const confirm = Modal.confirm;

class Contract extends Component {
    constructor(props) {
        super(props)

        this.state = {
            contractArray: [],
            previewImage: false,
            previewUrl: '',
            previewImagesBeforeUpload: [],
            listImagesBeforeUpload: [],
            uploadedImages: [],
            loading: false
        }
    }

    componentDidMount = () => {
        this.props.onGettingTransactionDetail(this.props.transaction._id, this.props.transaction.typetransaction)
        // console.log(this.props.transactionDetail)
        if (this.props.transaction.typetransaction === 1)
            this.setState({
                contractArray: this.props.transactions.selldetail.contract.image,

            })
        else this.setState({
            contractArray: this.props.transactions.rentdetail.contract.image,
        })
        // console.log(this.state.contractArray)
    }

    onHandlePreviewImage = (event) => {
        this.setState({ previewImage: true, previewUrl: event.target.src })
    }

    onHandleCancelImage = () => {
        this.setState({ previewImage: false })
    }

    handleContractUpload(files) {
        files.map(file => {
            // console.log(file)
            let reader = new FileReader()
            reader.onloadend = () => {
                // console.log(reader.result)
                // console.log(this.state.listImagesBeforeUpload.length)
                this.setState({
                    contractArray: [...this.state.contractArray, reader.result],
                    previewImagesBeforeUpload: [...this.state.previewImagesBeforeUpload, reader.result],
                    listImagesBeforeUpload: [...this.state.listImagesBeforeUpload, file]
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
                        onClick={this.showContractDeleteConfirm} value={array[i].url ? i : array[i]}>
                        x
                    </button>
                </div>)
            }
        }
        else return null
        return result
    }

    showContractDeleteConfirm = (event) => {
        var index = event.target.value
        // console.log(index)
        this.state.previewImagesBeforeUpload.map((image, key) => {
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
                this.state.listImagesBeforeUpload.splice(index, 1)
                this.state.previewImagesBeforeUpload.splice(index, 1)
                this.state.contractArray.splice(index, 1)
                this.setState({
                    listImagesBeforeUpload: this.state.listImagesBeforeUpload,
                    previewImagesBeforeUpload: this.state.previewImagesBeforeUpload,
                    contractArray: this.state.contractArray
                })
            },
            onCancel() {
                // console.log('Cancel');
            },
        });
    }

    onUploadingImages = async (list) => {
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
        this.setState({ listImagesBeforeUpload: [] })
        // console.log(this.state.contractArray)

    }

    onSendingData = (uploadList, transactions, values) => {
        if (this.props.transaction.typetransaction === 1) {
            return new Promise(async () => {
                await Promise.all(this.state.contractArray.map(image => {
                    if (image.url) {
                        // console.log('a')
                        uploadList.push(image)
                    }
                }))
                this.setState({ contractArray: uploadList })
                // console.log(this.state.contractArray)
                if (uploadList.length === 0)
                    return message.error('Bạn chưa tải lên hình nào!')
                var contractData = {
                    datesign: moment(values.contractSigningDate, 'YYYY/MM/DD, h:mm a').unix(),
                    number: values.contractNumber,
                    image: uploadList,
                    updateTime: moment().unix(),
                    _id: this.props.transactions._id,
                    id: this.props.transactions.selldetail._id,
                    complete: true
                }
                // console.log(moment(values.contractSigningDate, 'YYYY/MM/DD, h:mm a').unix(), transactions.selldetail.contract.datesign)
                // console.log(values.contractNumber, transactions.selldetail.contract.number)
                // console.log(uploadList, transactions.selldetail.contract.image)
                if (moment(values.contractSigningDate, 'YYYY/MM/DD, h:mm a').unix() === transactions.selldetail.contract.datesign
                    && values.contractNumber === transactions.selldetail.contract.number
                    && uploadList === transactions.selldetail.contract.image) {
                    // console.log("Không thay đổi gì")
                    return message.warning('Bạn chưa thay đổi gì cả!')
                }
                // else console.log("Thay đổi")
                await this.props.onSendingSellingContract(contractData)
                await this.setState({ loading: false })
            })
        }
        else if (this.props.transaction.typetransaction === 2) {
            return new Promise(async () => {
                await Promise.all(this.state.contractArray.map(image => {
                    if (image.url) {
                        // console.log('a')
                        uploadList.push(image)
                    }
                }))
                this.setState({ contractArray: uploadList })
                // console.log(this.state.contractArray)
                if (uploadList.length === 0)
                    return message.error('Bạn chưa tải lên hình nào!')
                var contractData = {
                    datesign: moment(values.contractSigningDate, 'YYYY/MM/DD, h:mm a').unix(),
                    number: values.contractNumber,
                    image: uploadList,
                    updateTime: moment().unix(),
                    _id: this.props.transactions._id,
                    id: this.props.transactions.rentdetail._id,
                    complete: true
                }
                // console.log(moment(values.contractSigningDate, 'YYYY/MM/DD, h:mm a').unix(), transactions.rentdetail.contract.datesign)
                // console.log(values.contractNumber, transactions.rentdetail.contract.number)
                // console.log(uploadList, transactions.rentdetail.contract.image)
                if (moment(values.contractSigningDate, 'YYYY/MM/DD, h:mm a').unix() === transactions.rentdetail.contract.datesign
                    && values.contractNumber === transactions.rentdetail.contract.number
                    && uploadList === transactions.rentdetail.contract.image) {
                    // console.log("Không thay đổi gì")
                    return message.warning('Bạn chưa thay đổi gì cả!')
                }
                // else console.log("Thay đổi")
                await this.props.onSendingRentingContract(contractData)
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
                    await this.onUploadingImages(this.state.listImagesBeforeUpload);
                    await this.onSendingData(uploadList, transactions, values);
                    // await this.setState({ loading: false })
                } catch (error) {
                    message.error(error)
                }
            }
        })
    }
    hasErrors = (fieldsError) => {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        var { contractArray, previewImage, previewUrl, loading } = this.state
        var { transactions } = this.props
        return (
            this.props.transaction.typetransaction === 1 ?
                <div className="container">
                    <Form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-md-4 col-lg-4 col-xs-12">
                                <Form.Item label="Ngày ký hợp đồng: ">
                                    {getFieldDecorator('contractSigningDate', {
                                        initialValue: transactions.selldetail.contract.datesign === 0 ? null : moment(moment.unix(transactions.selldetail.contract.datesign).format('DD/MM/YYYY, h:mm a'), 'DD/MM/YYYY, h:mm a'),
                                        rules: [{ required: true, message: 'Trường này chưa được nhập!' }],
                                    })(
                                        <DatePicker style={{ width: "100%" }} onChange={this.onChangeDate} />
                                    )}
                                </Form.Item>
                            </div>
                            <div className="col-md-4 col-lg-4 col-xs-12">
                                <Form.Item label="Số hợp đồng: ">
                                    {getFieldDecorator('contractNumber', {
                                        initialValue: transactions.selldetail.contract.number === 0 ? null : transactions.selldetail.contract.number,
                                        rules: [{ required: true, message: 'Trường này chưa được nhập!' }],
                                    })(
                                        <Input
                                            placeholder="Nhập số hợp đồng..."
                                            style={{ width: "100%" }}
                                        >
                                        </Input>
                                    )}
                                </Form.Item>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-8 col-lg-8 col-xs-12">
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
                                            {(contractArray && contractArray.length > 0) ? this.onShowImageBeforeUpload(contractArray) : null}
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
                :
                <div className="container">
                    <Form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-md-4 col-lg-4 col-xs-12">
                                <Form.Item label="Ngày ký hợp đồng: ">
                                    {getFieldDecorator('contractSigningDate', {
                                        initialValue: transactions.rentdetail.contract.datesign === 0 ? null : moment(moment.unix(transactions.rentdetail.contract.datesign).format('DD/MM/YYYY, h:mm a'), 'DD/MM/YYYY, h:mm a'),
                                        rules: [{ required: true, message: 'Trường này chưa được nhập!' }],
                                    })(
                                        <DatePicker style={{ width: "100%" }} onChange={this.onChangeDate} />
                                    )}
                                </Form.Item>
                            </div>
                            <div className="col-md-4 col-lg-4 col-xs-12">
                                <Form.Item label="Số hợp đồng: ">
                                    {getFieldDecorator('contractNumber', {
                                        initialValue: transactions.rentdetail.contract.number === 0 ? null : transactions.rentdetail.contract.number,
                                        rules: [{ required: true, message: 'Trường này chưa được nhập!' }],
                                    })(
                                        <Input
                                            placeholder="Nhập số hợp đồng..."
                                            style={{ width: "100%" }}
                                        >
                                        </Input>
                                    )}
                                </Form.Item>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-8 col-lg-8 col-xs-12">
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
                                            {(contractArray && contractArray.length > 0) ? this.onShowImageBeforeUpload(contractArray) : null}
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
    transactions: state.transaction,
    transactionDetail: state.transactionDetail
})

const mapDispatchToProps = (dispatch) => {
    return {
        onGettingTransactionDetail: (id, type) => dispatch(transAction.actGettingTransactionDetailRequest(id, type)),
        onSendingSellingContract: (contractData) => dispatch(transAction.actPostingContractRequest(contractData)),
        onSendingRentingContract: (contractData) => dispatch(transAction.actPostingRentingContractRequest(contractData)),
    }
}

const WrappedFormContract = Form.create()(Contract)

export default connect(mapStateToProps, mapDispatchToProps)(WrappedFormContract)
