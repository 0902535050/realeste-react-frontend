/* eslint-disable */
import React, { Component } from 'react'
import SingleEstateListView from '../components/Properties/SingleEstateListView'
import MainHeader from '../components/MainHeader'
import Footer from '../components/Footer'
import ViewChangingButton from '../components/Properties/ViewChangingButton'
import Sidebar from '../components/Properties/Sidebar'
import { LIST } from '../constants/ViewType'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from '../actions/request';
import AddressData from '../countries-flat.json'
import { message, Spin } from 'antd';
import { LIST_ESTATES } from '../constants/Navbar'
import { Pagination } from 'antd'

const pageSize = 5
const Options = [
    { value: '0', label: 'Thông thường' },
    { value: '1', label: 'Giá thấp nhất' },
    { value: '2', label: 'Giá cao nhất' },
    { value: '3', label: 'Diện tích nhỏ nhất' },
    { value: '4', label: 'Diện tích lớn nhất' }
];
const optionStyle = {
    fontSize: '12px',
    overflow: "scroll",
    height: '40px'
}
const Deal = [
    { value: '1', label: 'Bất động sản bán' },
    { value: '3', label: 'Bất động sản cho thuê' }];
const Types = [
    { value: '0', label: 'Loại bất động sản' },
    { value: '1', label: 'Căn hộ/Chung cư' },
    { value: '2', label: 'Nhà ở' },
    { value: '3', label: 'Đất' },
    { value: '4', label: 'Văn phòng/mặt bằng kinh doanh' }
];
const Area = [
    { value: '0', label: 'Diện tích' },
    { value: '30-50', label: '30 - 50 m2' },
    { value: '50-70', label: '50 - 70 m2' },
    { value: '70-110', label: '70 - 110 m2' },
    { value: '150-200', label: '150 - 200 m2' },
    { value: '200-250', label: '200 - 250 m2' },
    { value: '250-300', label: '250 - 300 m2' },
    { value: '300-500', label: '300 - 500 m2' },
    { value: '500-10000', label: '> 500 m2' },

];
const Price = {
    1: [
        { value: '0', label: 'Chọn giá' },
        { value: '1-500', label: '< 500 triệu' },
        { value: '500-1000', label: '500 triệu - 1 tỷ' },
        { value: '1000-2000', label: '1 - 2 tỷ' },
        { value: '2000-3000', label: '2 - 3 tỷ' },
        { value: '3000-5000', label: '3 - 5 tỷ' },
        { value: '5000-7000', label: '5 - 7 tỷ' },
        { value: '7000-10000', label: '7 - 10 tỷ' },
        { value: '10000-20000', label: '10 - 20 tỷ' },
        { value: '20000-30000', label: '20 - 30 tỷ' },
        { value: '30000-999999', label: '>30 tỷ' }

    ],
    3: [
        { value: '0', label: 'Chọn giá' },
        { value: '1-3', label: '< 3 triệu/tháng' },
        { value: '3-5', label: '3-5 triệu' },
        { value: '5-10', label: '5-10 triệu' },
        { value: '10-20', label: '10-20 triệu' },
        { value: '20-50', label: '20-50 triệu' },
        { value: '50-1000', label: '>50 triệu' }
    ],
};
class EstateListListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: Types[0].value,
            deal: Deal[0].value,
            price: Price[Deal[0].value][0].value,
            prices: Price[Deal[0].value],
            area: Area[0].value,
            loading: false,
            option: Options[0].value,
            placeDisable: false,
            city: '',
            ward: '',
            province: '',
            current: 1,
            strAddress: '',
            clicked: false
        }
    }
    //=== onchange cho pagination
    onChange = page => {
        // console.log(page);
        this.setState({
            current: page,
        });
    };
    //===============
    handleDealChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        const result = Deal.find(deal => deal.value === value);
        this.setState({
            [name]: value,
            prices: Price[result.value],
            price: Price[result.value][0].value,
        });

    }
    handleOnChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value,
        });
    }
    onHandleChangeAddress = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value,
        });
    }
    onDisablePlaceSelection = (e) => {
        console.log(e.target.value)
        if(e.target.value){
            this.setState({
                placeDisable: true
            })
        }
        else if(!e.target.value){
            this.setState({
                placeDisable: false
            })
        }
    }
    //===============

    //===============
    parseProvinceData = (AddressData) => {
        var result = []
        AddressData.map((data => {
            if (data.country === 'Vietnam' && result.indexOf(data.state) === -1) {
                result.push(data.state)
            }
        }))
        return result.sort()
    }

    parseCityData = (AddressData, stateValue) => {
        var result = []
        AddressData.map(data => {
            if (data.country === 'Vietnam' && data.state === stateValue && result.indexOf(data.city) === -1) {
                result.push(data.city)
            }
        })
        return result.sort()
    }

    parseWardData = (AddressData, stateValue, cityValue) => {
        var result = []
        AddressData.map(data => {
            if (data.country === 'Vietnam' && data.state === stateValue && data.city === cityValue && result.indexOf(data.ward) === -1) {
                result.push(data.ward)
            }
        })
        return result.sort()
    }
    //===============
    onHandleSubmit = async (e) => {
        e.preventDefault();
        if (this.state.address === '' && this.state.area === '0' && this.state.price === '0' && this.state.type === '0' && !document.getElementById('searching').value)
            return message.warning('Bạn chưa còn gì để tìm kiếm cả!')
        else if (document.getElementById('searching').value) {
            await this.setState({
                loading: true,
                clicked: true,
            })
            let address = ''
            if (this.state.ward !== '' && this.state.city !== '') {
                address = `${this.state.ward}, ${this.state.city}, ${this.state.province}`
            }
            else if (this.state.ward === '' && this.state.city !== '') {
                address = `${this.state.city}, ${this.state.province}`
            }
            else if (this.state.ward === '' && this.state.city === '') {
                address = `${this.state.province}`
            }
            const data = {
                type: this.state.type,
                statusProject: this.state.deal,
                area: this.state.area,
                price: this.state.price,
                address: document.getElementById('searching').value
            }
            console.log(data)
            this.setState({
                strAddress: document.getElementById('searching').value
            })
            await this.props.actSearchAll(data)
            await this.setState({ loading: false })
        }
        // if(this.state.province === '' && !document.getElementById('searching').value)
        //     message.warning('Bạn chưa chọn gì để tìm kiếm cả!')
        // console.log(document.getElementById('searching'))
        // if (document.getElementById('searching').value) {
        //     const data = {
        //         type: this.state.type,
        //         statusProject: this.state.deal,
        //         area: this.state.area,
        //         price: this.state.price,
        //         address: 
        //     }
        // }
        else if (!document.getElementById('searching').value) {
            await this.setState({
                loading: true,
                clicked: true,
            })
            let address = ''
            if (this.state.ward !== '' && this.state.city !== '') {
                address = `${this.state.ward}, ${this.state.city}, ${this.state.province}`
            }
            else if (this.state.ward === '' && this.state.city !== '') {
                address = `${this.state.city}, ${this.state.province}`
            }
            else if (this.state.ward === '' && this.state.city === '') {
                address = `${this.state.province}`
            }
            const data = {
                statusProject: this.state.deal,
                type: this.state.type,
                area: this.state.area,
                price: this.state.price,
                address: address
            }
            console.log(data)
            this.setState({
                strAddress: address
            })
            await this.props.actSearchEstate(data)
            await this.setState({ loading: false })
            // console.log()
        }
        this.setState({ loading: false })
    }
    onRedirectHome = (e) => {
        e.preventDefault();
        this.props.history.push("/");
    }
    componentDidMount() {
        if (localStorage.getItem('company')) {
            this.props.history.push('/company/profile-admin')
        }
    }
    render() {
        let { option } = this.state;
        let total = 1
        let list = []
        let current = this.state.current
        let offset = (current - 1) * pageSize;
        let des = 'Mời bạn tìm kiếm theo địa điểm cụ thể'
        let noti = 'Hiện không có bài đăng'
        let { type, deal, prices, price, area, city, ward, province, loading, strAddress, clicked, placeDisable } = this.state;
        let estates = this.props.estates
        // console.log(estates)
        var provinceList = this.parseProvinceData(AddressData)
        var cityList = this.parseCityData(AddressData, province)
        var wardList = this.parseWardData(AddressData, province, city)

        // let estates = this.props.estates;
        // console.log(estates);
        let estatesList = null;
        if (estates.length > 0) {
            if (option === '1') {
                estates = estates.sort((a, b) => (a.price - b.price))
            }
            else if (option === '2') {
                estates = estates.sort((a, b) => (b.price - a.price))
            }
            else if (option === '3') {
                estates = estates.sort((a, b) => (a.area - b.area))
            }
            else if (option === '4') {
                estates = estates.sort((a, b) => (b.area - a.area))
            }
            noti = `Có ${estates.length} bài đăng ở ${strAddress}`
            total = estates.length
            list = estates.slice(offset, current * pageSize)
            estatesList = list.map((estate, index) => {
                return (
                    <SingleEstateListView key={index} estate={estate} />
                )
            });
        }
        else if (estates.length === 0 && clicked === true) {
            noti = `Hiện không có bài đăng ở ${strAddress}`
        }
        return (
            <div>
                <MainHeader component={LIST_ESTATES} />
                {/* Sub banner start */}
                <div className="sub-banner overview-bgi">
                    <div className="overlay">
                        <div className="container">
                            <div className="breadcrumb-area">
                                <h1>Danh sách Bất động sản</h1>
                                <ul className="breadcrumbs">
                                    <li><a href="true" onClick={this.onRedirectHome}>Trang chủ</a></li>
                                    <li className="active">Danh sách bất động sản</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Sub Banner end */}

                {/* Properties section body start */}
                <div className="properties-section property-big content-area" style={{ backgroundColor: '#ebebeb', marginTop: '-30px' }}>
                    <div className="container">
                        <div className="properties-map-search" style={{ backgroundColor: 'rgb(244, 244, 242)' }}>
                            <div className="properties-map-search-content" style={{ paddingTop: '15px' }}>
                                <form onSubmit={this.onHandleSubmit}>
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <input
                                                id="searching"
                                                placeholder="Bạn cần tìm gì?"
                                                type="text"
                                                onChange={this.onDisablePlaceSelection}
                                                style={{ width: '100%', height: '34px', border: '1px solid #D0D3D4', fontSize: '12px', boxShadow: "0 2px 2px rgba(0,0,0,0.10), 0 2px 2px rgba(0,0,0,0.1)", borderRadius: "5px", padding: "20px", marginBottom: "20px" }}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12" >
                                                <div className="form-group" >
                                                    <select className="form-control"
                                                        name="deal"
                                                        value={deal}
                                                        onChange={this.handleDealChange}
                                                        id="sel1"
                                                        style={optionStyle}
                                                    >
                                                        {Deal.map((deal, index) => <option key={index} value={deal.value}>{deal.label}</option>)}

                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12" >
                                                <div className="form-group" >
                                                    <select className="form-control"
                                                        name="type"
                                                        value={type}
                                                        onChange={this.handleOnChange}
                                                        id="sel2"
                                                        style={optionStyle}
                                                    >
                                                        {Types.map((type, index) => <option key={index} value={type.value}>{type.label}</option>)}

                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12" >
                                                <div className="form-group" >
                                                    <select className="form-control"
                                                        name="province"
                                                        id="province"
                                                        value={province}
                                                        required
                                                        onChange={this.onHandleChangeAddress}
                                                        style={optionStyle}
                                                        disabled={placeDisable}
                                                    >
                                                        <option style={{ display: "none" }}>---Chọn tỉnh/thành phố---</option>
                                                        {provinceList.map((single, index) => <option key={index} value={single}>{single}</option>)}

                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12" >
                                                <div className="form-group">
                                                    <select className="form-control"
                                                        name="city"
                                                        id="city"
                                                        onChange={this.onHandleChangeAddress}
                                                        style={optionStyle}
                                                        value={city}
                                                        disabled={placeDisable}
                                                    >
                                                        <option style={{ display: "none" }}>---Chọn quận/huyện---</option>
                                                        {cityList.map((single, indexx) => <option key={indexx} value={single}>{single}</option>)}
                                                        {/* {this.parseCityData(AddressData, document.getElementById('city').value)} */}

                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12" >
                                                <div className="form-group">
                                                    <select className="form-control"
                                                        name="ward"
                                                        id="ward"
                                                        onChange={this.onHandleChangeAddress}
                                                        style={optionStyle}
                                                        value={ward}
                                                        disabled={placeDisable}
                                                    >
                                                        <option style={{ display: "none" }}>---Chọn xã/phường---</option>
                                                        {wardList.map((single, indexx) => <option key={indexx} value={single}>{single}</option>)}

                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                                <div className="form-group" >
                                                    <select className="form-control"
                                                        name="area"
                                                        value={area}
                                                        onChange={this.handleOnChange}
                                                        id="area"
                                                        style={optionStyle} >
                                                        {Area.map((area, index) => <option key={index} value={area.value}>{area.label}</option>)}

                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12" >
                                                <div className="form-group" >
                                                    <select className="form-control"
                                                        name="price"
                                                        value={price}
                                                        onChange={this.handleOnChange}
                                                        id="sel3"
                                                        style={optionStyle} >
                                                        {prices.map((price, index) => <option key={index} value={price.value}>{price.label}</option>)}

                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12" >
                                                {/* <div className="form-group" > */}
                                                <button
                                                    type="submit" 
                                                    className="btn btn-primary"
                                                    style={{ width: '100%', height: '40px' }}
                                                    disabled={loading}
                                                >
                                                    {loading && (
                                                        <i
                                                            className="fa fa-refresh fa-spin"
                                                            style={{ marginRight: "5px" }}
                                                        />
                                                    )}
                                                    {loading && <span>Đang tìm...</span>}
                                                    {!loading && <span>Tìm kiếm</span>}
                                                </button>
                                                {/* </div> */}
                                            </div>

                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-lg-12">
                                {/* Option bar start */}
                                <div className="option-bar">
                                    <div className="row">
                                        <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                                            <h4>
                                                <span className="heading-icon">
                                                    <i className="fa fa-th-list" />
                                                </span>
                                                <span className="hidden-xs">Danh sách bất động sản</span>
                                            </h4>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12 col-pad">
                                            <div className="form-group" style={{ margin: '7px 5px 7px 5px' }} >
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
                                        {/* <ViewChangingButton component={LIST} /> */}
                                    </div>
                                </div>
                                {/* Option bar end */}
                                <h4 style={{ marginTop: '-20px' }}>{clicked === false ? des : noti}</h4>
                                <div className="clearfix" />
                                {/* Property start */}
                                {loading === true ? <Spin /> : estatesList}
                                {/* {estatesList} */}
                                {/* Property end */}
                                {/* Page navigation start */}
                                {estatesList !== null ? <Pagination current={this.state.current} pageSize={pageSize} onChange={this.onChange} total={total} style={{ float: "right" }} /> : null}

                                {/* Page navigation end*/}
                            </div>
                            {/* <Sidebar /> */}
                        </div>
                    </div>
                </div>
                {/* Properties section body end */}
                <Footer />
            </div>
        )
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
// 		actGetEstatesList: () => dispatch(actions.actGetEstatesList())
// 	}
// }
const mapDispathToProp = (dispatch) => {
    return {
        actSearchEstate: (data) => dispatch(actions.reqSearchEstate(data)),
        actSearchAll: (data) => dispatch(actions.searchAllRequest(data))
    }
}
const mapStateToProp = (state) => {
    return {
        estates: state.searchEstate,
        loading: state.loading
    }
}
export default connect(mapStateToProp, mapDispathToProp)(withRouter(EstateListListView));
