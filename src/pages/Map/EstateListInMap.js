import React, { Component } from 'react';
import * as actions from '../../actions/request';
import { connect } from 'react-redux';
import InfoEstate from '../../components/Map/InfoEstate'
const Options = [
	{ value: '0', label: 'Thông thường' },
	{ value: '1', label: 'Giá thấp nhất' },
	{ value: '2', label: 'Giá cao nhất' },
	{ value: '3', label: 'Diện tích nhỏ nhất' },
	{ value: '4', label: 'Diện tích lớn nhất' }
];

class EstateListInMap extends Component {
	constructor(props) {
		super(props);
		this.state = {
			radius: '',
			error: '',
			option: Options[0].value,
			Estates: []
		};
	}
	handleOnChange = (e) => {
		let target = e.target;
		let name = target.name;
		let value = target.value;
		this.setState({
			[name]: value,
		});
	}
	componentDidMount() {
		this.setState({
			Estates: this.props.estates
		})
	}
	render() {
		let { option } = this.state;
		
		let estates = this.props.estates;
		let des = 'Mời bạn tìm vị trí khác'
		let listEstates = <h5 style={{marginLeft:'15px'}}>Không có bất động sản nào được tìm thấy</h5>;
		if (estates.length > 0) {
			if (option === '1') {
				estates = estates.sort((a, b) => (a.price - b.price))
			}
			else if(option === '2'){
				estates = estates.sort((a, b) => (b.price - a.price))
			}
			else if(option === '3') {
				estates = estates.sort((a, b) => (a.area - b.area))
			}
			else if(option === '4') {
				estates = estates.sort((a, b) => (b.area - a.area))
			}
			des = `Có ${estates.length} bất động sản được tìm thấy`
			listEstates = estates.map((estate, index) => {
				return (
					<InfoEstate
					style ={{paddingLeft:'3px'}}
						key={index}
						estate={estate}
					/>
				)
			}
			)
		}
		
		return (
			<div>
				<div className="col-xs-12 col-sm-12 col-md-5 col-md-pull-7 col-lg-3 col-lg-pull-9 map-content-sidebar" >
					<div className="title-area">
						<h2 className="pull-left">{des} </h2>

						<div className="clearfix" />
					</div>
					<div className="properties-map-search" style={{overflow: "scroll"}}>
						<div className="properties-map-search-content">
							<div className="row">
								{/* <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<div className="form-group">
										<input className="keyword"
											style={{
												minHeight: '40px',
												width: '95%',
												margin: '0px 3px 0px 10px',
												padding: '3px 5px 3px 5px ',
												border: '1px solid #e0e0e0',
												background: '#fff',
												borderRadius: '3px',
											}}
											placeholder="Nhập tên bất động sản" />
									</div>
								</div> */}
								<div className="col-lg-5 col-md-5 col-sm-12 col-xs-12" style={{ paddingRight: '5px' }}>
									<p style={{ marginLeft: '5px', marginTop: '3px', textAlign:'center', fontSize: '12px', fontWeight: 'bold' }}>Sắp xếp theo: </p>
								</div>
								<div className="col-lg-7 col-md-7 col-sm-12 col-xs-12" style={{ paddingLeft: '5px' }}>
									<div className="form-group" >
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

						<div className="map-content-separater" />
						<div className="clearfix" />
						<div className="title-area">
							<h2 className="pull-left">Danh sách tin đăng</h2>
							<br />
							<div className="clearfix" />
						</div>
						<div className="fetching-properties" style={{height:'85vh'}}>
							{listEstates}
						</div>
					</div>
				</div>

			</div>
		);
	}
}
const mapDispathToProp = (dispatch) => {
	return {
		actFetchEstatesRequest: (info) => dispatch(actions.actFetchEstatesRequest(info))
	}
}
const mapStateToProp = (state) => {
	return {
		estates: state.estates,
		location: state.location
	}
}
export default connect(mapStateToProp, mapDispathToProp)(EstateListInMap);