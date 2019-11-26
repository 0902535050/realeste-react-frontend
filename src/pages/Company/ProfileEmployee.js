import React, { Component } from 'react';
import HeaderCompany from '../../components/Company/HeaderCompany';
import * as actions from '../../actions/Company/requestCompany';
import { message, Button, Modal, Form, Input, Select, Tag, Spin, Pagination } from 'antd'
import { adminService } from '../../actions/Company/admin.service'
import { connect } from 'react-redux';
// import moment from 'moment'
import { withRouter } from 'react-router-dom'
import * as actionAuth from '../../actions/auth'
import SingleEstate from '../../components/Employee Estate/SingleEstate';

const { Option } = Select;
const confirm = Modal.confirm;
const pageSize = 5
const Options = [
    { value: '0', label: 'Sắp xếp theo' },
    { value: '1', label: 'Bất động sản bán' },
    { value: '2', label: 'Bất động sản cho thuê' },

];

class ProfileEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            visible1: false,
            visible2: false,
            lock: false,
            disable: false,
            current: 1,
            option: Options[0].value,
        }
    }
    onChange = page => {
        // console.log(page);
        this.setState({
            current: page,
        });
    };
    handleOnChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value,
        });
    }
    onCheckAuthEdit = async () => {
        await this.props.reqGetInfoEmployee(this.props.match.params.id, this.props.match.params.page)
        let auth = this.props.auth;
        if (auth === false) {
            // message.error('Bạn đã hết phiên đăng nhập. Vui lòng đăng nhập lại')
            this.props.history.push('/company/login')
        }
        else if (auth === true) {
            this.showModal()
        }
    }
    onCheckAuthPermission = async () => {
        await this.props.reqGetInfoEmployee(this.props.match.params.id, this.props.match.params.page)
        let auth = this.props.auth;
        if (auth === false) {
            // message.error('Bạn đã hết phiên đăng nhập. Vui lòng đăng nhập lại')
            this.props.history.push('/company/login')
        }
        else if (auth === true) {
            this.showConfirmChangePermission()
        }
    }
    onCheckDel = async () => {
        await this.props.reqGetInfoEmployee(this.props.match.params.id, this.props.match.params.page)
        let auth = this.props.auth;
        if (auth === false) {
            // message.error('Bạn đã hết phiên đăng nhập. Vui lòng đăng nhập lại')
            this.props.history.push('/company/login')
        }
        else if (auth === true) {
            this.showConFirmDeleteEmployee()
        }
    }
    showConFirmDeleteEmployee = () => {
        confirm({
            title: 'Bạn có chắc chắc muốn xóa nhân viên này?',
            onOk: () => {
                this.setState({
                    disable: true
                })
                let data = {
                    id: this.props.match.params.id
                }
                // console.log(data)
                message.loading('Đang xử lý yêu cầu, vui lòng chờ trong giây lát', 2)
                    .then(() => {
                        adminService.deleteEmployee(data)
                            .then(res => {
                                if (res.status === 200) {
                                    message.success('Xóa nhân viên thành công');
                                }
                                this.props.history.push('/company/list-employees')
                            })
                            .catch(err => {
                                if (err) {
                                    if (err.data.status === 401) {
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
                // console.log(this.state.disable)
            },
            onCancel() {
                // console.log('Cancel');
            },
        });
    }
    showConfirmChangePermission = () => {
        let changePermission = !this.props.info.permission;

        // console.log(changeLock)
        if (changePermission === true) {
            confirm({
                title: 'Bạn có chắc chắn muốn cho phép nhân viên này đăng bài mà không cần kiểm duyệt?',
                onOk: () => {
                    this.setState({
                        disable: true
                    })
                    let data = {
                        permission: changePermission,
                        id: this.props.match.params.id
                    }
                    // console.log(data)
                    message.loading('Đang xử lý yêu cầu, vui lòng chờ trong giây lát', 2.5)
                        .then(() => {
                            adminService.changePermissionEmployee(data)
                                .then(res => {
                                    if (res.status === 200) {
                                        message.success('Thay đổi trạng thái thành công');
                                    }
                                    this.setState({
                                        disable: false
                                    })
                                    // req.push('/company/profile-admin')
                                    this.props.reqGetInfoEmployee(this.props.match.params.id, this.props.match.params.page)
                                })
                                .catch(err => {
                                    if (err) {
                                        if (err.data.status === 401) {
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
                    // console.log(this.state.disable)
                },
                onCancel() {
                    // console.log('Cancel');
                },
            });
        }
        else {
            confirm({
                title: 'Bạn có chắc chắn muốn kiểm duyệt mỗi khi nhân viên này đăng bài?',
                onOk: () => {
                    this.setState({
                        disable: true
                    })
                    let data = {
                        permission: changePermission,
                        id: this.props.match.params.id
                    }
                    // console.log(data)
                    message.loading('Đang xử lý yêu cầu, vui lòng chờ trong giây lát', 2.5)
                        .then(() => {
                            adminService.changePermissionEmployee(data)
                                .then(res => {
                                    if (res.status === 200) {
                                        message.success('Thay đổi trạng thái thành công');
                                    }
                                    this.setState({
                                        disable: false
                                    })
                                    this.props.reqGetInfoEmployee(this.props.match.params.id, this.props.match.params.page);
                                    // req.push('/company/profile-admin')
                                })
                                .catch(err => {
                                    if (err) {
                                        if (err.data.status === 401) {
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
                    // console.log(this.state.disable)

                },
                onCancel() {
                    // console.log('Cancel');
                },
            });
        }
    }
    showModal = () => {
        this.setState({
            visible1: true,
        });
    };
    handleOk = e => {
        // console.log(e);
        this.setState({
            visible1: false,
        });
    };

    handleCancel = e => {
        // console.log(e);
        this.setState({
            visible1: false,
        });
    };
    handleOk2 = e => {
        e.preventDefault();
        let data = {
            lock: !this.props.info.lock
        }
        // console.log(data)
    }
    onCheckAuthConfirm = async () => {
        await this.props.reqGetInfoEmployee(this.props.match.params.id, this.props.match.params.page)
        let auth = this.props.auth;
        if (auth === false) {
            // message.error('Bạn đã hết phiên đăng nhập. Vui lòng đăng nhập lại')
            this.props.history.push('/company/login')
        }
        else if (auth === true) {
            this.showConfirm()
        }
    }
    showConfirm = () => {
        let changeLock = !this.props.info.lock;

        // console.log(changeLock)
        if (changeLock === true) {
            confirm({
                title: 'Bạn có chắc chắn muốn khóa nhân viên này?',
                onOk: () => {
                    this.setState({
                        disable: true
                    })
                    let data = {
                        lock: changeLock,
                        id: this.props.match.params.id
                    }
                    // console.log(data)
                    message.loading('Đang xử lý yêu cầu, vui lòng chờ trong giây lát', 2.5)
                        .then(() => {
                            adminService.changeLockEmployee(data)
                                .then(res => {
                                    if (res.status === 200) {
                                        message.success('Đã khóa tài khoản nhân viên');
                                    }
                                    this.setState({
                                        disable: false
                                    })
                                    // req.push('/company/profile-admin')
                                    this.props.reqGetInfoEmployee(this.props.match.params.id, this.props.match.params.page)
                                })
                                .catch(err => {
                                    if (err) {
                                        if (err.data.status === 401) {
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
                    // console.log('Ok');
                    // console.log(this.state.disable)
                },
                onCancel() {
                    // console.log('Cancel');
                },
            });
        }
        else {
            confirm({
                title: 'Bạn có chắc chắn muốn mở taì khoản nhân viên này?',
                onOk: () => {
                    this.setState({
                        disable: true
                    })
                    let data = {
                        lock: changeLock,
                        id: this.props.match.params.id
                    }
                    // console.log(data)
                    message.loading('Đang xử lý yêu cầu, vui lòng chờ trong giây lát', 2.5)
                        .then(() => {
                            adminService.changeLockEmployee(data)
                                .then(res => {
                                    if (res.status === 200) {
                                        message.success('Đã mở tài khoản nhân viên');
                                    }
                                    this.setState({
                                        disable: false
                                    })
                                    this.props.reqGetInfoEmployee(this.props.match.params.id, this.props.match.params.page);
                                    // req.push('/company/profile-admin')
                                })
                                .catch(err => {
                                    if (err) {
                                        if (err.data.status === 401) {
                                            localStorage.removeItem('company')
                                            message.error('Bạn đã hết phiên đăng nhập. Vui lòng đăng nhập lại!')
                                            this.props.history.push('/company/login')
                                        }
                                        else {
                                            message.error('Lỗi. Phiền bạn vui lòng kiểm tra lại!')
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
                    // console.log(this.state.disable)

                },
                onCancel() {
                    // console.log('Cancel');
                },
            });
        }

    }
    componentDidMount() {
        // console.log(this.props.match.params.id)
        this.props.reqGetInfoEmployee(this.props.match.params.id, this.props.match.params.page);

    }
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
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values, callback) => {
            if (!err) {
                if (values.fullname === this.props.info.fullname && `${values.prefix} ${values.phone}` === this.props.info.phone) {
                    message.warning("Bạn chưa thay đổi thông tin")
                }
                else {
                    this.setState({
                        disable: true,
                        visible1: false,
                    })
                    let account = {
                        id: this.props.match.params.id,
                        email: values.email,
                        fullname: values.fullname,
                        identify: this.props.info.identify,
                        address: this.props.info.address,
                        phone: `${values.prefix} ${values.phone}`,
                        totalProject: this.props.info.totalProject,
                        statusAccount: this.props.info.statusAccount,
                        avatar: this.props.info.avatar,
                        description: this.props.info.description,

                    }
                    // console.log(account);
                    message.loading('Đang thêm tài khoản, vui lòng chờ trong giây lát', 2.5)
                        .then(() => {
                            adminService.editEmployee(account)
                                .then(res => {
                                    if (res.status === 200) {
                                        message.success('Sửa tài khoản thành công');
                                    }
                                    this.setState({
                                        disable: false,
                                    })
                                    this.props.reqGetInfoEmployee(this.props.match.params.id, this.props.match.params.page)

                                })
                                .catch(err => {
                                    if (err.data.status === 401) {
                                        localStorage.removeItem('company')
                                        message.error('Bạn đã hết phiên đăng nhập. Vui lòng đăng nhập lại')
                                        this.props.history.push('/company/login')
                                    }
                                    else {
                                        message.error('Lỗi. Phiền bạn vui lòng kiểm tra lại')
                                        this.setState({
                                            disable: false,
                                        })
                                    }

                                })
                        });
                }
            }
            else {
                this.setState({
                    disable: false,
                })
            }
        });
    };
    render() {
        let auth = this.props.auth;
        if (auth === false) {
            message.error('Bạn đã hết phiên đăng nhập. Vui lòng đăng nhập lại')
            this.props.history.push('/company/login')
        }
        else if (auth === true) {
            let { info, projects } = this.props;
            let phoneTmp = ''
            if (info !== {}) {
                phoneTmp = `${info.phone}`
                // let str = "42 3"
                let n = phoneTmp.search(" ")
                if (n !== -1) {
                    phoneTmp = phoneTmp.slice(n + 1)
                }
                else {
                    phoneTmp = info.phone
                }
            }
            else {
                phoneTmp = ''
            }
            let { option } = this.state;
            let total = 1
            let list = []
            let current = this.state.current
            let offset = (current - 1) * pageSize;
            // console.log(phoneTmp)
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
            let listProjects = ''
            let des = 'Hiện chưa có bài đăng'
            if (projects.length > 0) {
                if (option === '1') {
                    projects = projects.filter(project => project.statusProject === 1);
                }
                else if (option === '2') {
                    projects = projects.filter(project => project.statusProject === 3)
                }
                list = projects.slice(offset, current * pageSize)
                des = `Có ${projects.length} bài đăng`
                listProjects = list.map((project, index) => {
                    return (
                        <SingleEstate
                            key={index}
                            estateListOfUser={project}
                        />
                    )
                }
                )
            }

            let mobile = 'Đang cập nhật'
            if (info.phone !== '') {
                mobile = info.phone
            }
            let address = 'Đang cập nhật'

            if (info.address !== '') {
                address = info.address
            }
            let statusButton = 'Mở tài khoản'
            let btn =
                <Button
                    type="primary"
                    style={{ margin: '5px 0 5px 0' }}
                    disabled={this.state.disable}
                    onClick={this.onCheckAuthEdit}
                >
                    Chỉnh sửa tài khoản
            </Button>

            let btnDel =
                <Button
                    type="default"
                    style={{ margin: '5px 0 5px 0', width: '157px' }}
                    disabled={this.state.disable}
                    onClick={this.onCheckDel}
                >
                    Xóa nhân viên
            </Button>
            let verify = <Tag style={{ fontSize: '13px' }} color='red'>Chưa kích hoạt</Tag>
            if (info.verify === true) {
                verify = <Tag style={{ fontSize: '13px' }} color='geekblue'>Đã kích hoạt</Tag>
                btn =
                    <Button
                        type="primary"
                        style={{ margin: '5px 0 5px 0' }}
                        disabled
                    >
                        Chỉnh sửa tài khoản
                </Button>
                btnDel =
                    <Button
                        type="default"
                        style={{ margin: '5px 0 5px 0', width: '157px' }}
                        disabled
                    >
                        Xóa nhân viên
            </Button>
            }
            let lock = <Tag style={{ fontSize: '13px' }} color='red'>Tài khoản bị khóa</Tag>
            if (info.lock === false) {
                lock = <Tag style={{ fontSize: '13px' }} color='green'>Tài khoản được phép sử dụng</Tag>
                statusButton = 'Khóa tài khoản'
            }
            let btnPer =
                <Button
                    type="default"
                    style={{ margin: '5px 0 5px 0', width: '157px', height: '52px', backgroundColor: '#9a973b' }}
                    disabled={this.state.disable}
                    onClick={this.onCheckAuthPermission}
                >
                    <p style={{ whiteSpace: ' pre-line', color: 'white' }}>
                        Phải kiểm duyệt bài đăng
                    </p>
                </Button>
            if (info.permission === false) {
                btnPer =
                    <Button
                        type="default"
                        style={{ margin: '5px 0 5px 0', width: '157px', height: '52px', backgroundColor: '#7d6f7c' }}
                        disabled={this.state.disable}
                        onClick={this.onCheckAuthPermission}
                    >
                        <p style={{ whiteSpace: ' pre-line', color: 'white' }}>
                            Cho phép đăng
                        bài không cần duyệt
                        </p>
                    </Button>
            }
            return (
                <div>
                    <HeaderCompany />
                    {/* Sub banner start */}
                    <div className="sub-banner overview-bgi" >
                        <div className="overlay">
                            <div className="container">
                                <div className="breadcrumb-area">
                                    <h1>Thông tin nhân viên</h1>
                                    <ul className="breadcrumbs">
                                        <li><a href="index.html">Trang chủ</a></li>
                                        <li className="active">Thông tin nhân viên</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Sub Banner end */}
                    <div className="agent-section content-area" style={{ backgroundColor: '#ebebeb' }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="row">
                                        {/* Agent detail start */}
                                        <div className="agent-detail clearfix" style={{ height: '280px'}}>
                                            {/* <div className="row"> */}
                                            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 agent-theme">
                                                <img src={info.avatar} style={{ height: '280px', width: '290px' }} alt="agent-1" className="img-responsive" />
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 agent-content">
                                                <h3>
                                                    {info.fullname}
                                                </h3>

                                                <ul className="address-list">

                                                    <li>
                                                        <span>
                                                            <i className="fa fa-envelope" />Email:
                                                </span>
                                                        {info.email}
                                                    </li>

                                                    <li>
                                                        <span>
                                                            <i className="fa fa-mobile" />Điện thoại:
                                                </span>
                                                        {mobile}
                                                    </li>
                                                    <li>
                                                        <span>
                                                            <i className="fa fa-map-marker" />Địa chỉ:
                                                </span>
                                                        {address}
                                                    </li>
                                                    <li>
                                                        <span>
                                                            <i className="fa fa-tag"></i>Trạng thái:
                                                </span>
                                                        {verify}
                                                    </li>
                                                    <li>
                                                        <span>
                                                            <i className="fa fa-tag"></i>Tình trạng:
                                                </span>
                                                        {lock}
                                                    </li>
                                                </ul>


                                            </div>
                                            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 "
                                                style={{
                                                    height: '280px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                <div>
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <div>
                                                            {btnPer}
                                                        </div>
                                                        <div>
                                                            {btn}
                                                        </div>
                                                        <div>
                                                            {btnDel}
                                                        </div>
                                                        <Modal
                                                            title="Basic Modal"
                                                            visible={this.state.visible1}
                                                            onCancel={this.handleCancel}
                                                            onOk={this.handleOk}
                                                            okButtonProps={{ disabled: false }}
                                                            cancelButtonProps={{ disabled: false }}
                                                            footer={[
                                                                <Button key="back" onClick={this.handleCancel}>
                                                                    Hủy
                                                                </Button>,
                                                                <Button key="submit" type="primary" onClick={this.handleSubmit}>
                                                                    Chỉnh sửa
                                                                </Button>,
                                                            ]}
                                                        >
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
                                                                        initialValue: info.fullname,
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
                                                                        initialValue: info.email,

                                                                    })(<Input disabled style={{ marginRight: '30px' }} />)}
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
                                                                        initialValue: phoneTmp,

                                                                    })(<Input
                                                                        addonBefore={prefixSelector}
                                                                        //onChange={this.onChange} 
                                                                        style={{ marginRight: '30px' }}
                                                                        placeholder="Nhập 9 chữ số sau số 0"
                                                                        maxLength={9} />)}
                                                                </Form.Item>
                                                            </Form>
                                                        </Modal>
                                                    </div>
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                                                    >
                                                        <div >
                                                            <Button style={{ width: '157px', margin: '5px 0 5px 0' }} type="danger" onClick={this.onCheckAuthConfirm} disabled={this.state.disable}>
                                                                {statusButton}
                                                            </Button>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            {/* </div> */}
                                        </div>
                                        <div className="recently-properties">
                                            {/* Main title */}

                                            {/* Option bar start */}
                                            <div className="option-bar">
                                                <div className="row">
                                                    <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                                                        <h4>
                                                            <span className="heading-icon">
                                                                <i className="fa fa-th-list" />
                                                            </span>
                                                            <span className="hidden-xs">Danh sách bài đăng</span>
                                                        </h4>
                                                    </div>
                                                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12" style={{ padding: '7px 5px 7px 30px' }}>
                                                        <div className="form-group" style={{ marginRight: '20px' }}  >
                                                            <select className="form-control"
                                                                name="option"
                                                                value={option}
                                                                onChange={this.handleOnChange}
                                                                id="opt"
                                                                style={{ fontSize: '12px' }}
                                                            >
                                                                {Options.map((option, index) => <option key={index} value={option.value}>{option.label}</option>)}

                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Option bar end */}
                                            <div className="clearfix" />
                                            <div className="main-title-2">
                                                <h4><span>{des}</span> </h4>
                                            </div>
                                            <div className="row">
                                                {listProjects}
                                            </div>
                                            <div style={{ textAlign: 'center' }}>
                                                <Pagination current={this.state.current} pageSize={pageSize} onChange={this.onChange} total={total} />

                                            </div>
                                        </div>
                                    </div>
                                    {/* Agent detail end */}

                                    {/* Recently properties start */}

                                    {/* Partners block end */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Agent section end */}
                </div >
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
        reqGetInfoEmployee: (id, page) => dispatch(actions.reqGetInfoEmployee(id, page)),
        actCheckAuth: (isAuth) => dispatch(actionAuth.actCheckAuth(isAuth))

    }
}
const mapStateToProp = (state) => {
    return {
        info: state.infoEmployee,
        projects: state.projectsOfEmployee,
        auth: state.auth,
    }
}
export default connect(mapStateToProp, mapDispathToProp)(withRouter(Form.create()(ProfileEmployee)));