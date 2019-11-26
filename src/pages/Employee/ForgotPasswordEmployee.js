import React, { Component } from 'react';
import { message, Form, Input, Button } from 'antd';
import { service } from '../../actions/service'
import MainHeader from '../../components/MainHeader';
import Footer from '../../components/Footer';

class ForgotPasswordEmployee extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            disable: false,
        };
    }
    componentDidMount() {
        if (localStorage.getItem('company')) {
            this.props.history.push('/company/profile-admin')
        }
        else if (localStorage.getItem('res')) {
            this.props.history.push('/')
        }
        this.setState({
            disable: false,
        })
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({
                    disable: true,
                })
                let data = {
                    email: values.email
                }
                message.loading('Vui lòng chờ trong giây lát', 1)
                    .then(() => {
                        service.resetPasswordEmployee(data)
                            .then(res => {
                                if (res.status === 200) {
                                    message.success('Mật khẩu đã được gửi tới email của bạn');
                                }
                                this.props.history.push('/login')
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

    onCancel = (e) => {
        e.preventDefault();
        this.props.history.push('/login')
    }
    onSendEmail = (e) => {
        e.preventDefault();
       
        let data = {
            email: this.state.email
        }
        message.loading('Vui lòng chờ trong giây lát', 1)
            .then(() => {
                service.resetPasswordEmployee(data)
                    .then(res => {
                        if (res.status === 200) {
                            message.success('Mật khẩu đã được gửi tới email của bạn');
                        }
                        this.props.history.push('/login')
                    })
                    .catch(err => {
                        message.error('Lỗi. Phiền bạn vui lòng kiểm tra lại')
                    })
            });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
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
                <MainHeader />
                <div className="content-area" style={{ backgroundColor: 'lightgray' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                {/* Form content box start */}
                                <div className="form-content-box" style={{ textAlign: 'unset' }}>
                                    {/* details */}
                                    <div className="details">
                                        {/* Main title */}
                                        <div className="main-title" >
                                            <h1>
                                                <span>Quên mật khẩu</span>
                                            </h1>
                                            <h6>(*Đây là trang cho nhân viên)</h6>
                                        </div>
                                        <div style={{ borderBottom: '1px solid #ccc', marginBottom: '10px' }}></div>
                                        {/* Form start */}
                                        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                                            <Form.Item label="E-mail">
                                                {getFieldDecorator('email', {
                                                    rules: [
                                                        {
                                                            type: 'email',
                                                            message: 'Văn bản không đúng định dạng email',
                                                        },
                                                        {
                                                            required: true,
                                                            message: 'Vui lòng nhập email của bạn vào ô văn bản',
                                                        },
                                                    ],
                                                })(<Input />)}
                                            </Form.Item>
                                            <Form.Item {...tailFormItemLayout} style={{ textAlign: 'right' }}>
                                                <Button type="primary" style={{ marginRight: '5px' }} htmlType="submit" disabled={this.state.disable}>
                                                    Gửi email
                                                </Button>
                                                <Button type="danger" onClick={this.onCancel}>
                                                    Hủy
                                                </Button>
                                            </Form.Item>
                                        </Form>
                                        {/* Form end */}
                                    </div>
                                    {/* Footer */}

                                </div>
                                {/* Form content box end */}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Form.create()(ForgotPasswordEmployee);