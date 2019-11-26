import React, { Component } from 'react';

// const Option = Select.Option;
const provinceData = [{ value: 'hochiminh', label: 'Hồ Chí Minh' }, { value: 'hanoi', label: 'Hà Nội' }];
const districtData = {
    hochiminh: ['Quận 1', 'Quận 2', 'Tân Phú'],
    hanoi: ['Hoàn Kiếm', 'Ba Đình', 'Đống Đa'],
};

class test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: provinceData[0].label,
            cities: districtData[provinceData[0].value],
            secondCity: districtData[provinceData[0].value][0]
        }
    }
    handleProvinceChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        const result = provinceData.find(city => city.label === value);
        console.log(result);
        this.setState({
            [name]: value,
            cities: districtData[result.value],
            secondCity: districtData[result.value][0],
        });

    }
    handleSecondCityChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value,
        });

    }

    render() {
        console.log(this.state.city);
        console.log(this.state.cities);
        console.log(this.state.secondCity);
        let { cities } = this.state;
        return (
            <div>
                {/* <Select
                    defaultValue={provinceData[0].label}
                    style={{ width: 120 }}
                    onChange={this.handleProvinceChange}
                >
                    {provinceData.map(province => <Option key={province}>{province}</Option>)}
                </Select> */}
                <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
                        <div className="form-group">
                            <label for="sel1">Select list:</label>
                            <select className="form-control"
                                name="city"
                                value={this.state.city}
                                onChange={this.handleProvinceChange}
                                id="sel1">
                                {provinceData.map((province, index) => <option key={index} value={province.label}>{province.label}</option>)}
                                
                            </select>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
                        <div className="form-group">
                            <label for="sel1">Select list:</label>
                            <select className="form-control"
                                name="secondCity"
                                value={this.state.secondCity}
                                onChange={this.handleSecondCityChange}
                                id="sel2">
                                {cities.map((city, index) => <option key={index} value={city}>{city}</option>)}
                                
                            </select>
                        </div>
                    </div>
                    {/* <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
                        <div className="form-group">
                            <label>
                                Quận (huyện)
                                                        </label>
                            <Select
                                //defaulValue={Types[0].label}
                                value={this.state.secondCity}
                                onChange={this.handleTypeChange}
                                options={cityData}
                                placeholder="Select type of estate"
                                //isClearable
                                name="type"
                                className="Type"
                            />
                        </div>
                    </div> */}
                </div>
            </div>
        );
    }
}

export default test;