import React, { Component } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import moment from 'moment'
import { connect } from 'react-redux';
import { adminService } from '../../../actions/Company/admin.service'
import * as companyActions from '../../../actions/Company/requestCompany'
import { withRouter } from 'react-router-dom'

const { Option } = Select;


class DetailCompany extends Component {
    constructor() {
        super();
        this.state = {
            description: '',
            address: '',
            disable: true,
            loading: false
        };
    }

    onCancel = (e) => {
        e.preventDefault();
        this.props.history.push('/company/profile-admin')
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                await this.setState({
                    disable: true,
                    loading: true
                })
                let account = {
                    companyname: values.companyname,
                    address: values.address,
                    email: values.email,
                    phone: `${values.prefix} ${values.phone}`,
                    description: values.description,
                    avatar: this.props.userCompany.avatar ? this.props.userCompany.avatar : localStorage.getItem('res').avatar,
                    createTime: moment().unix(),
                    updateTime: moment().unix(),
                }
               
                // this.props.form.resetFields([fullname])
                message.loading('Đang cập nhật thông tin', 0.5)
                    .then(() => {
                        adminService.editCompany(account)
                            .then(res => {
                                if (res.status === 200) {
                                    message.success('Cập nhật thông tin thành công!');
                                }
                                this.props.history.push('/company/profile-admin')
                                this.setState({
                                    disable: false,
                                    loading: false
                                })
                            })
                            .catch(err => {
                                
                                message.error('Lỗi. Phiền bạn vui lòng kiểm tra lại')
                                this.setState({
                                    disable: false,
                                })
                            })
                    });

            }
            else {
                this.setState({
                    disable: false,
                })
            }
        });
    };
    onCheckCompanyName = (rule, value, callback) => {
        const reg = /^[a-z]|^\s|[A-z]{8}|\S{8}|[`~!@#$%^&*()(\-)_=+[(\]){};:'"<>/?\\|]/
        
        // chữ cái viết thường, 
        //bắt đầu bằng khoảng trắng, 8 kí tự liền nhau (tên: Nghiêng), kí tự đặc biệt
        if ((!Number.isNaN(value) && reg.test(value)) || value === '' || value.length < 4) {
            callback('Vui lòng nhập đúng tên!');
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
    componentDidMount() {
        this.setState({ disable: false })
        this.props.onGettingCompanyInfo()

    }
    render() {
        const { loading } = this.state
        
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
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 24,
                    offset: 0,
                },
            },
        };
        let { company } = this.props;
        let phoneTmp = ''
        if (company !== {}) {
            phoneTmp = `${company.phone}`
            // let str = "42 3"
            let n = phoneTmp.search(" ")
            if (n !== -1) {
                phoneTmp = phoneTmp.slice(n + 1)
            }
            else {
                phoneTmp = company.phone
            }
        }
       
        return (
            <div>
                <div className="my-address" style={{ padding: '0px 0px' }}>
                    <div className="main-title-2">
                        <h1><span>Thông tin tài khoản</span></h1>
                    </div>
                    {/* <form >
                        <div className="form-group">
                            <label><b>Tên công ty</b></label>
                            <input type="text" className="input-text" name="your name" placeholder="Tên công ty" value={company.companyname}/>
                        </div>
                        <div className="form-group">
                            <label><b>Địa chỉ</b></label>
                            <input type="text" className="input-text" name="agent" placeholder="Địa chỉ của công ty" value={company.address}  />
                        </div>
                        <div className="form-group">
                            <label><b>Số điện thoại</b></label>
                            <input type="number" className="input-text" name="phone" placeholder="Nhập số điện thoại của công ty bạn" value={company.phone}/>
                        </div>
                        <div className="form-group">
                            <label><b>Email</b></label>
                            <input type="email" className="input-text" name="email" placeholder="Email của công ty" value={company.email}/>
                        </div>
                        <div className="form-group">
                            <label><b>Mô tả</b></label>
                            <textarea className="input-text" name="message" placeholder="Nhập mô tả về công ty của bạn" value={company.description}/>
                        </div>
                        <a href="true" className="btn button-md button-theme">Save Changes</a>
                    </form> */}
                    <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                        <Form.Item label="Tên công ty" style={{ paddingRight: '20px' }} hasFeedback>
                            {getFieldDecorator('companyname', {
                                rules: [
                                    {
                                        min: 10,
                                        required: true,
                                        message: 'Vui lòng nhập tên công ty',
                                    },
                                    {
                                        validator: this.onCheckCompanyName,
                                    }
                                ],
                                initialValue: company.companyname
                            })(<Input
                                //onChange={this.onChange} 

                                style={{ marginRight: '30px' }}
                                placeholder="Nhập tên của công ty (Bắt đầu bằng chữ in hoa)"
                                maxLength={100}
                            />)}
                        </Form.Item>
                        <Form.Item label="Địa chỉ" style={{ paddingRight: '20px' }} hasFeedback>
                            {getFieldDecorator('address', {
                                rules: [
                                    {
                                        min: 10,
                                        required: true,
                                        message: 'Vui lòng nhập địa chỉ công ty!',
                                    },
                                    {
                                        validator: this.onCheckCompanyName,
                                    },
                                ],
                                initialValue: company.address
                            })(<Input
                                //onChange={this.onChange} 
                                style={{ marginRight: '30px' }}
                                placeholder="Nhập địa chỉ của công ty (Bắt đầu bằng chữ in hoa)"
                                maxLength={50} />)}
                        </Form.Item>
                        <Form.Item label="E-mail" style={{ paddingRight: '20px' }} hasFeedback>
                            {getFieldDecorator('email', {
                                rules: [
                                    {
                                        type: 'email',
                                        message: 'Văn bản không đúng định dạng email',
                                    },
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập email của nhân viên vào ô văn bản',
                                    },
                                ],
                                initialValue: company.email
                            })(<Input style={{ marginRight: '30px' }} />)}
                        </Form.Item>
                        <Form.Item label="Số điện thoại" style={{ paddingRight: '20px' }} hasFeedback>
                            {getFieldDecorator('phone', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập số điện thoại của nhân viên!',
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
                        <Form.Item label="Mô tả" style={{ paddingRight: '20px' }}>
                            {getFieldDecorator('description', {
                                initialValue: company.description

                            })(<Input.TextArea
                                //onChange={this.onChange} 
                                style={{ marginRight: '30px' }}
                                placeholder="Nhập mô tả về công ty(Bắt đầu bằng chữ in hoa)"
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
                            <Button type="danger" onClick={this.onCancel} disabled={loading}>
                                Hủy
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
        onGettingCompanyInfo: () => dispatch(companyActions.actGetInfoUserCompany())
    }
}
const mapStateToProp = (state) => {
    return {
        userCompany: state.userCompany
    }
}

export default connect(mapStateToProp, mapDispathToProp)(withRouter(Form.create()(DetailCompany)));