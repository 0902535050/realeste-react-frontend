import React, { Component } from 'react';
import { ADD_ACCOUNT } from '../../constants/Company/profileCompany'
import InfoCompany from '../../components/Company/ProfileCompany/InfoCompany'
// import Footer from '../../components/Footer'
import HeaderCompany from '../../components/Company/HeaderCompany'
import { Link } from 'react-router-dom'
import { message } from 'antd'
import { connect } from 'react-redux';
import * as actions from '../../actions/Company/requestCompany';
import { withRouter } from 'react-router-dom'
import { adminService } from '../../actions/Company/admin.service'
import moment from 'moment'
import { Form, Input, Button, Select, Spin } from 'antd';
const { Option } = Select;

class AddAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            address: '',
            disable: false,
        };
    }
    onCancel = (e) => {
        e.preventDefault();
        this.props.history.push('/company/profile-admin')
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async(err, values) => {
            if (!err) {
                await this.setState({
                    disable: true,
                })
                let account = {
                    fullname: values.fullname,
                    email: values.email,
                    phone: `${values.prefix} ${values.phone}`,
                    description: this.state.description,
                    address: this.state.address,
                    avatar: 'https://res.cloudinary.com/dne3aha8f/image/upload/v1559203321/ddtyciszy3oiwdjasrjh.png?fbclid=IwAR3RFWWiOrMw-sMiNigCXJMFEGdpYw_FUBa4PxZYZLTtHvjLaa1JjBpNGy0',
                    createTime: moment().unix(),
                    updateTime: moment().unix(),
                }
                // console.log(values);
                // console.log(account);
                // this.props.form.resetFields([fullname])
                message.loading('Đang thêm tài khoản, vui lòng chờ trong giây lát', 2)
                    .then(() => {
                        adminService.addAccount(account)
                            .then(res => {
                                if (res.status === 201) {
                                    message.success('Thêm tài khoản nhân viên thành công');
                                }
                                this.setState({
                                    disable: false,
                                })
                                this.props.history.push('/company/list-employees')
                            })
                            .catch(err => {
                                if (err) {
                                    if (err.data.status === 409) {
                                        message.error('Email đã tồn tại')
                                    }
                                    else if (err.data.status === 401) {
                                        localStorage.removeItem('company')
                                        message.error('Bạn đã hết phiên đăng nhập. Vui lòng đăng nhập lại')
                                        this.props.history.push('/company/login')
                                    }
                                    else {
                                        message.error('Lỗi. Phiền bạn vui lòng kiểm tra lại')
                                    }
                                }
                                else {
                                    message.error('Lỗi. Phiền bạn kiểm tra lại đường truyền!')
                                }
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
    onCheckFullName = (rule, value, callback) => {
        const reg = /\d|^[a-z]|^\s|[A-z]{8}|\S{8}|[`~!@#$%^&*()(\-)_=+[(\]){};:'",<.>/?\\|]/
        //Check kí tự đầu là số, chữ cái viết thường, 
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
        if (localStorage.getItem('company')) {
            let company = JSON.parse(localStorage.getItem('company'));
            this.props.actGetInfoUserCompany(company.id);
        }
        else {
            this.props.history.push('/company/login')
        }
    }
    render() {
        let auth = this.props.auth;
        if (auth === false) {
            message.error('Bạn đã hết phiên đăng nhập. Vui lòng đăng nhập lại')
            this.props.history.push('/company/login')
        }
        else if (auth === true) {
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
            return (
                <div>
                    <HeaderCompany />
                    {/* Sub banner start */}
                    <div className="sub-banner overview-bgi">
                        <div className="overlay">
                            <div className="container">
                                <div className="breadcrumb-area">
                                    <h1>Thêm tài khoản nhân viên</h1>
                                    <ul className="breadcrumbs">
                                        <li><Link to="/company/profile-admin">Trang chủ</Link></li>
                                        <li className="active">Thêm tài khoản nhân viên</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Sub Banner end */}

                    {/* My Propertiess start */}
                    <div className="content-area my-properties">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-4 col-md-4 col-sm-12">
                                    <InfoCompany component={ADD_ACCOUNT} />
                                </div>
                                <div className="col-lg-8 col-md-8 col-sm-12">
                                    <div className="main-title-2">
                                        <h1><span>Thêm tài khoản nhân viên</span> </h1>
                                    </div>
                                    <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                                        <Form.Item label="Họ và tên" style={{ paddingRight: '20px' }} hasFeedback>
                                            {getFieldDecorator('fullname', {
                                                rules: [
                                                    {
                                                        min: 5,
                                                        required: true,
                                                        message: 'Vui lòng nhập tên của nhân viên!',
                                                    },
                                                    {
                                                        validator: this.onCheckFullName,
                                                    },
                                                ],
                                            })(<Input
                                                //onChange={this.onChange} 
                                                style={{ marginRight: '30px' }}
                                                placeholder="Nhập tên nhân viên (Bắt đầu bằng chữ in hoa)"
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
                                            })(<Input
                                                addonBefore={prefixSelector}
                                                //onChange={this.onChange} 
                                                style={{ marginRight: '30px' }}
                                                placeholder="Nhập 9 chữ số sau số 0"
                                                maxLength={9} />)}
                                        </Form.Item>

                                        <Form.Item {...tailFormItemLayout} style={{ textAlign: 'right', paddingRight: '20px' }}>
                                            <Button type="primary" style={{ marginRight: '5px' }} htmlType="submit" disabled={this.state.disable}>
                                                {this.state.disable && (
                                                    <i
                                                        className="fa fa-refresh fa-spin"
                                                        style={{ marginRight: "5px" }}
                                                    />
                                                )}
                                                {this.state.disable && <span>Đang thêm tài khoản...</span>}
                                                {!this.state.disable && <span>Thêm tài khoản</span>}
                                            </Button>
                                            <Button type="danger" onClick={this.onCancel} disabled={this.state.disable}>
                                                Hủy
                                                </Button>
                                        </Form.Item>
                                    </Form>
                                </div>
                            </div>
                        </div>
                        {/* My Propertiess end */}
                        {/* <Footer /> */}
                    </div>
                </div>
            );
        }
        return (
            <div style={{ textAlign: 'center', padding: '100px' }}>
                <Spin tip="Loading...">

                </Spin>
            </div>
        );
    }
}
const mapDispathToProp = (dispatch) => {
    return {
        actGetInfoUserCompany: (id) => dispatch(actions.actGetInfoUserCompany(id))
    }
}
const mapStateToProp = (state) => {
    return {
        userCompany: state.userCompany,
        auth: state.auth
    }
}

export default connect(mapStateToProp, mapDispathToProp)(withRouter(Form.create()(AddAccount)));
