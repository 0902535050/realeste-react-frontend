import React from 'react';
import { Card, Button, } from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom'
const h6Style = {
    fontFamily: 'cursive',
    marginTop: '4px',
    marginBottom: '1px',
    lineHeight: 'unset',
    fontSize: '13.5px',
};
const EstateMapCard = (props) => {
    const { est } = props;
    const url = `/properties/${est._id}`;

    return (
        <Card style={{ width: '40rem' }}>
            <div className="row">
                <div className="property map-properties-list clearfix">
                    {/* <Card.Title>{est.name}</Card.Title> */}
                    <div style={{ margin: '2px 0px 4px 4px' }}>
                        <h6 style={{
                            fontFamily: 'cursive',
                            marginTop: '2px',
                            marginBottom: '2px',
                            lineHeight: 'unset',
                            fontSize: '14px',
                            color: '#f60',
                            fontWeight: 'bold'
                        }}> {est.name}</h6> {/* Property address */}
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 col-pad property-img height">
                        {/* <Card.Img variant="top" src="/img/properties/properties-1.jpg" style={{ height: '110px', width: '100%' }} /> */}
                        <img src={est.url[0]} style={{ height: '110px' }} alt="properties" className="img-responsive img-inside-map" />
                    </div>
                    <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12 property-content ">
                        <h6 style={h6Style}>
                            <b>Giá: </b> {est.price > 1000 && est.statusProject === 1 ? (est.price / 1000).toFixed(2) + ' Tỉ' : est.price + ' ' + est.unit}
                        </h6>
                        <h6 style={h6Style}>
                            <b>Diện tích: </b> {est.area} m2
                            </h6>
                        <h6 style={h6Style}>
                            <b>Địa chỉ: </b> {est.address}
                        </h6>
                        <Link to={url}>
                            <Button variant="primary">Xem chi tiết</Button>
                        </Link>
                        {/* <Card.Body>
                            
                            <Card.Text>
                                <p><b style={{ fontWeight: 'bolder' }}>Địa chỉ: </b>{est.address}</p>
                            </Card.Text>
                            <Card.Text>
                                <p><b>Diện tích: </b>{est.area} m2</p>
                            </Card.Text>
                            <Card.Text>
                                <p><b>Giá: </b>{est.price / 1000} tỷ</p>
                            </Card.Text>
                            <Link to={url} target="_blank">
                                <Button variant="primary">Xem chi tiết</Button>
                            </Link>
                        </Card.Body> */}
                    </div>
                </div>

            </div>


        </Card>
    );
};

export default withRouter(EstateMapCard);