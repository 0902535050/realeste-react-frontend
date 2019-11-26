import React, { Component } from 'react';
import Company from '../../components/Contact/Company'
import MainHeader from '../../components/MainHeader'
import * as actions from '../../actions/Contact/requestContact';
import { connect } from 'react-redux';
import { Pagination } from 'antd'

const Options = [
    { value: '0', label: 'Sắp xếp theo' },
    { value: '1', label: 'Đã tham gia lâu' },
    { value: '2', label: 'Mới tham gia' },
]
const pageSize = 10
class ListCompaies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            current: 1,
            option: Options[0].value,
        }
        this.props.reqGetListCompanies(this.props.match.params.page);

    }
    onChange = page => {
        
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
    onRedirectHome = (e) => {
        e.preventDefault();
        this.props.history.push('/');
    }
    componentDidMount() {
        if(localStorage.getItem('company')){
            this.props.history.push('/company/profile-admin')
        }
        else{
            this.props.reqGetListCompanies(this.props.match.params.page);
        }
    }
    render() {
        let { option } = this.state;
        let { companies } = this.props;
        let current = this.state.current
        let total = this.props.totalPage
        
        let listCompanies = <h5 style={{ marginLeft: '15px' }}>Hiện không có công ty nào</h5>;
        if (companies.length > 0) {
            if (option === '1') {
                companies = companies.sort((a, b) => (a.createTime - b.createTime))
            }
            else if (option === '2') {
                companies = companies.sort((a, b) => (b.createTime - a.createTime))
            }
            listCompanies = companies.map((company, index) => {
                return (
                    <Company
                        key={index}
                        company={company}
                    />
                )
            }
            )
        }
        return (
            <div>
                <MainHeader />
                {/* Agent section start */}
                <div className="sub-banner overview-bgi">
                    <div className="overlay">
                        <div className="container">
                            <div className="breadcrumb-area">
                                <h1>Danh sách công ty</h1>
                                <ul className="breadcrumbs">
                                    <li><a href="true" onClick={this.onRedirectHome}>Trang chủ</a></li>
                                    <li className="active">Danh sách công ty</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="agent-section content-area" style={{ backgroundColor: '#ebebeb' }}>
                    <div className="container">
                        {/* option bar start */}
                        <div className="option-bar">
                            <div className="row">
                                <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                                    <h4>
                                        <span className="heading-icon">
                                            <i className="fa fa-th-list" />
                                        </span>
                                        <span className="hidden-xs">Danh sách công ty</span>
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
                        {/* option bar end */}
                        <div class="clearfix"></div>
                        <div className="row">
                            {listCompanies}
                        </div>
                        <div>
                        <div style={{ textAlign: 'center' }}>
                                        <Pagination 
                                        current={current} 
                                        pageSize={pageSize} 
                                        onChange={this.onChange} 
                                        total={total} />

                                    </div>
                            
                        </div>
                    </div>
                </div>
                {/* Agent section end */}
            </div>
        );
    }
}

const mapDispathToProp = (dispatch) => {
    return {
        reqGetListCompanies: (page) => dispatch(actions.reqGetListCompanies(page))
    }
}
const mapStateToProp = (state) => {
    return {
        companies: state.companies,
        totalPage: state.totalPage
    }
}

export default connect(mapStateToProp, mapDispathToProp)(ListCompaies);