import React, { Component } from 'react';
import { Link } from 'react-router-dom'
const h6Style = {
    // fontFamily: 'cursive',
    marginTop: '4px',
    marginBottom: '1px',
    lineHeight: 'unset',
    fontSize: '13.5px',
};
// const pStyle = {
//     fontFamily: 'cursive',
//     fontSize: '12px',
//     margin: '0',
//     textDecoration: 'none',
//     marginBlockStart: '1em',
//     marginBlockEnd: '1em',
//     marginInlineStart: '0px',
//     marginInlineEnd: '0px',
// }
class InfoEstate extends Component {

    render() {
        let { estate } = this.props;
        // console.log(estate)
        let url = `/properties/${estate._id}`
        let status = 'Bán'
        if(estate.statusProject === 3){
            status = "Thuê"
        }
        return (
            <Link to={url}>
                <div className="row">
                    <div className="property map-properties-list clearfix" style={{ padding: '0px 5px' }}>
                        <div style={{ margin: '2px 0px 4px 4px' }}>
                            <h6 style={{
                                // fontFamily: 'cursive',
                                marginTop: '2px',
                                marginBottom: '2px',
                                lineHeight: 'unset',
                                fontSize: '14px',
                                color: '#f60',
                                fontWeight: 'bold'
                            }}> {estate.name}</h6> {/* Property address */}
                        </div>

                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 col-pad property-img height" href="true">
                            {/* <a href="true" className="property-img height"> */}
                            <div className="property-tag button alt featured" style={{marginTop:'0px', left: '0px'}}>{status}</div>
                        {/* <div className="property-tag button sale">Sale</div>
                        <div className="property-price">$2505.11</div>  */}
                            <img src={estate.url[0] ? estate.url[0] : '/images/Home.png'} style={{ height: '110px' }} alt="properties" className="img-responsive img-inside-map" />
                            {/* </a>  */}
                        </div>
                        <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12 property-content ">
                            {/* title */}
                            {/* <h6 style={{
                                fontFamily: 'cursive',
                                marginTop: '5px',
                                marginBottom: '5px',
                                lineHeight: 'unset',
                                fontSize: '14px',
                                color: '#f60',
                                fontWeight: 'bold'
                            }}> {estate.name}</h6> Property address */}
                            <h6 style={h6Style}>
                                <b>Giá: </b> 
                                {estate.price >=1000 && estate.statusProject === 1 ? (estate.price/1000).toFixed(2) + 'tỷ VNĐ' : `${estate.price} ${estate.unit}`}
                            </h6>
                            <h6 style={h6Style}>
                                <b>Diện tích: </b> 
                                {estate.area} m2
                            </h6>
                            <h6 style={h6Style}>
                                <b>Địa chỉ: </b> 
                                {estate.address}
                            </h6>
                          
                        </div>
                        <div style={{
                            width: '100%',
                            borderBottom: '1px solid #ccc',
                            margin: '10px 0 0px 0px',
                            height: '1px',
                            float: 'left'
                        }}>
                        </div>
                    </div>
                </div>
            </Link>
        );
    }
}

export default InfoEstate;