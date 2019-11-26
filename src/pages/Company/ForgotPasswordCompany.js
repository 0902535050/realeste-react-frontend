import React, { Component } from 'react';
import { message, Form, Input, Button } from 'antd';
import { adminService } from '../../actions/Company/admin.service'
import MainHeader from '../../components/MainHeader';
import Footer from '../../components/Footer';

class ForgotPasswordCompany extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            confirmDirty: false,
            autoCompleteResult: [],
            disable: false
        };

    }
    componentDidMount() {
        if (localStorage.getItem('company')) {
            this.props.history.push('/company/profile-admin')
        }
        this.setState({
            disable: false,
        })
    }
    handleOnChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value,
        });
    }
    onCancel = (e) => {
        e.preventDefault();
        this.props.history.push('/company/login')
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
                        adminService.resetPasswordCompany(data)
                            .then(res => {
                                if (res.status === 200) {
                                    message.success('Mật khẩu đã được gửi tới email của bạn');
                                }
                                this.props.history.push('/company/login')
                            })
                            .catch(err => {
                                if(err){
                                    if(err.data.status === 404){
                                        message.error('Tài khoản của bạn chưa xác thực hoặc bị khóa')
                                    }
                                    else{
                                        message.error('Lỗi. Phiền bạn kiểm tra lại')
                                    }
                                }
                                else{
                                    message.error('Lỗi. Phiền bạn kiểm tra lại đường truyền')
                                }
                                
                                this.setState({
                                    disable: false,
                                })
                            })
                    });
            }
            else{
                this.setState({
                    disable: false,
                })
            }
        });
    };

    render() {
        // console.log('aa')
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
                <MainHeader/>
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
                                            <h6>(*Đây là trang cho tài khoản công ty)</h6>
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
                                                <Button type="danger" disabled={this.state.disable} onClick={this.onCancel}>
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
                <Footer/>
            </div>
        );
    }
}

export default Form.create()(ForgotPasswordCompany);