import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../../actions/request'
import { Form, Input, Button, Select, message } from 'antd';

const { Option } = Select;

class Detail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false
        }
    }

    componentDidMount = () => {
        this.props.onGetUserInfo()
    }
    // onSubmit = (e) => {
    //     e.preventDefault()
    //     var updateInfo = {
    //         fullname: document.getElementById('fullname').value,
    //         address: document.getElementById('address').value,
    //         phone: document.getElementById('phone').value,
    //         description: document.getElementById('description').value,
    //         avatar: localStorage.getItem('avatar') ? localStorage.getItem('avatar') : JSON.parse(localStorage.getItem('res')).user.avatar,
    //         statusAccount: 2,
    //         // totalProject: this.props.estatesListOfUser.length
    //     }
    //     this.props.onEditUserInfo(updateInfo)
    // }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                this.setState({
                    loading: true
                })
                let account = {
                    fullname: values.fullname,
                    address: values.address,
                    email: values.email,
                    phone: `${values.prefix} ${values.phone}`,
                    identify: values.identify,
                    description: values.description,
                    avatar: this.props.user.avatar ? this.props.user.avatar : JSON.parse(localStorage.getItem('res')).user.avatar
                }

                let currentAccount = {
                    fullname: this.props.user.fullname,
                    address: this.props.user.address,
                    email: this.props.user.email,
                    phone: this.props.user.phone,
                    identify: this.props.user.identify,
                    description: this.props.user.description,
                    avatar: this.props.user.avatar
                }

                if (account.fullname === currentAccount.fullname
                    && account.address === currentAccount.address
                    && account.email === currentAccount.email
                    && account.phone === currentAccount.phone
                    && account.identify === currentAccount.identify
                    && account.description === currentAccount.description
                    && account.avatar === currentAccount.avatar) {
                    await this.setState({ loading: false })
                    return message.warning('Bạn chưa thay đổi gì cả!')
                }

                await this.props.onEditUserInfo(account)
                this.setState({ loading: false })
            }
        });
    };

    onCheckingName = (rule, value, callback) => {
        const reg = /^[a-z]|^\s|[A-z]{8}|\S{8}|[`~!@#$%^&*()(\-)_=+[(\]){};:'"</>?\\|]/
        // console.log(value)
        // chữ cái viết thường, 
        //bắt đầu bằng khoảng trắng, 8 kí tự liền nhau (tên: Nghiêng), kí tự đặc biệt
        if ((!Number.isNaN(value) && reg.test(value)) || value === '' || value.length < 4) {
            callback('Vui lòng nhập đúng tên!');
        }
        else {
            callback()
        }
    }
    onCheckingAddress = (rule, value, callback) => {
        const reg = /^[a-z]|^\s|[A-z]{8}|\S{8}|[`~!@#$%^&*()(\-)_=+[(\]){};:'"<>?\\|]/
        // console.log(value)
        if ((!Number.isNaN(value) && reg.test(value)) || value === '' || value.length < 4) {
            callback('Vui lòng nhập đúng địa chỉ!');
        }
        else {
            callback()
        }
    }
    onCheckPhoneNumber = (rule, value, callback) => {
        const reg = /^[1-9]?([1-9][0-9]*)?$/;
        if ((!Number.isNaN(value) && reg.test(value) && value.length === 9)) {
            callback();
        }
        else {
            callback('Vui lòng nhập đúng số điện thoại!')
        }
    };

    onCheckIdentify = (rule, value, callback) => {
        const reg = /^[0-9]?([1-9][0-9]*)?$/;
        if ((!Number.isNaN(value) && reg.test(value) && value.length === 9)) {
            callback();
        }
        else {
            callback('Vui lòng nhập đúng số CMND!')
        }
    };

    render() {
        const { loading } = this.state
        const { user } = this.props
        const { getFieldDecorator } = this.props.form;
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '84',
        })(
            <Select style={{ width: 70 }}>
                <Option value="84">+84</Option>
                <Option value="86">+86</Option>
            </Select>,
        );
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 22,
                    offset: 0,
                },
                sm: {
                    span: 22,
                    offset: 0,
                },
            },
        };
        let phoneTmp = ''
        if (user !== {}) {
            phoneTmp = `${user.phone}`
            // let str = "42 3"
            let n = phoneTmp.search(" ")
            if (n !== -1) {
                phoneTmp = phoneTmp.slice(n + 1)
            }
            else {
                phoneTmp = user.phone
            }
        }
        return (
            <div>
                <div className="my-address">
                    <div className="main-title-2">
                        <h1><span>Thông tin</span> cơ bản</h1>
                    </div>
                    <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                        <Form.Item label="Tên đầy đủ" style={{ paddingRight: '20px' }} hasFeedback>
                            {getFieldDecorator('fullname', {
                                rules: [
                                    {
                                        min: 10,
                                        required: true,
                                        message: 'Vui lòng nhập tên đầy đủ',
                                    },
                                    {
                                        validator: this.onCheckingName,
                                    }
                                ],
                                initialValue: user.fullname
                            })(<Input
                                //onChange={this.onChange} 

                                style={{ marginRight: '30px' }}
                                placeholder="Nhập tên đầy đủ (Bắt đầu bằng chữ in hoa)"
                                maxLength={50}
                            />)}
                        </Form.Item>
                        <Form.Item label="Địa chỉ" style={{ paddingRight: '20px' }} hasFeedback>
                            {getFieldDecorator('address', {
                                rules: [
                                    {
                                        min: 10,
                                        required: true,
                                        message: 'Vui lòng nhập địa chỉ!',
                                    },
                                    {
                                        validator: this.onCheckingAddress,
                                    },
                                ],
                                initialValue: user.address
                            })(<Input
                                //onChange={this.onChange} 
                                style={{ marginRight: '30px' }}
                                placeholder="Nhập địa chỉ (Bắt đầu bằng chữ in hoa)"
                                max={150} />)}
                        </Form.Item>
                        <Form.Item label="E-mail" style={{ paddingRight: '20px' }} hasFeedback>
                            {getFieldDecorator('email', {
                                rules: [
                                    {
                                        type: 'email',
                                        message: 'Không đúng định dạng email',
                                    },
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập email!',
                                    },
                                ],
                                initialValue: user.email
                            })(<Input style={{ marginRight: '30px' }} />)}
                        </Form.Item>
                        <Form.Item label="Số điện thoại" style={{ paddingRight: '20px' }} hasFeedback>
                            {getFieldDecorator('phone', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập số điện thoại!',
                                    },
                                    {
                                        validator: this.onCheckPhoneNumber,
                                    },
                                ],
                                initialValue: phoneTmp
                            })(<Input
                                addonBefore={prefixSelector}
                                //onChange={this.onChange} 
                                style={{ marginRight: '30px' }}
                                placeholder="Nhập 9 chữ số sau số 0"
                                maxLength={9} />)}
                        </Form.Item>
                        <Form.Item label="Số CMND/thẻ căn cước/Passport" style={{ paddingRight: '20px' }} hasFeedback>
                            {getFieldDecorator('identify', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập CMND/thẻ căn cước/passport của bạn!',
                                    },
                                    {
                                        validator: this.onCheckIdentify,
                                    },
                                ],
                                initialValue: user.identify !== null ? user.identify : ' '
                            })(<Input
                                //onChange={this.onChange} 
                                style={{ marginRight: '30px' }}
                                placeholder="Nhập 9 chữ số sau số 0"
                                maxLength={9} />)}
                        </Form.Item>
                        <Form.Item label="Mô tả bản thân" style={{ paddingRight: '20px' }}>
                            {getFieldDecorator('description', {
                                initialValue: user.description

                            })(<Input.TextArea
                                //onChange={this.onChange} 
                                style={{ marginRight: '30px' }}
                                placeholder="Nhập mô tả (Bắt đầu bằng chữ in hoa)"
                            />)}
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout} style={{ textAlign: 'right', paddingRight: '20px' }}>
                            <Button type="primary" style={{ marginRight: '5px' }} htmlType="submit" disabled={loading}>
                                {loading && (
                                    <i
                                        className="fa fa-refresh fa-spin"
                                        style={{ marginRight: "5px" }}
                                    />
                                )}
                                {loading && <span>Đang cập nhật...</span>}
                                {!loading && <span>Cập nhật</span>}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}

const mapDispathToProp = (dispatch) => {
    return {
        onEditUserInfo: (data) => dispatch(actions.actEditUserInfoRequest(data)),
        onGetUserInfo: () => dispatch(actions.actGetUserInfoRequest())
    }
}
const mapStateToProp = (state) => {
    return {
        user: state.user
    }
}
const WrappedFormDetail = Form.create()(Detail)
export default connect(mapStateToProp, mapDispathToProp)(WrappedFormDetail)