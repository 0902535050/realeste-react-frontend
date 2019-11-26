import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Tag } from 'antd'
import moment from 'moment'

class InfoEstateOfAgent extends Component {

    render() {
        let { project } = this.props;
        let url = `/properties/${project._id}`
        let status = "Bán" 
        if(project.statusProject === 3){
            status = "Cho thuê"
        }

        return (
            <Link to={url}>
                <div>
                    <div className="property clearfix wow fadeInUp delay-03s" style={{ visibility: 'visible', animationName: 'fadeInUp' }}>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 col-pad">
                            {/* Property img */}
                            <div className="property-img">
                                <div className="property-tag button alt featured">{status}</div>
                                {/* <div className="property-tag button sale">For Sale</div>
                                <div className="property-price">$150,000</div> */}
                                <img style={{ height: '244px' }} src={project.url[0]} alt="fp-list" className="img-responsive hp-1" />
                                {/* <div className="property-overlay">
                                    
                                </div> */}
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12 property-content ">
                            {/* title */}
                            <h2 className="title" style={{ marginTop: '8px', fontSize: '17px' }}>
                                <a href="true">{project.name}</a>
                            </h2>
                            <p style={{
                                width: '100%',
                                overflow: 'hidden',
                                textOverflow: "ellipsis",
                                lineHeight: '16px',
                                WebkitLineClamp: '2',
                                display: 'webkit-box',
                                WebkitBoxOrient: 'vertical',
                                height: '32px'
                            }}>{project.info}</p>
                            {/* Property address */}
                            <h6 style={{ fontSize: '13px' }}>
                                <b>Địa chỉ:</b> {project.address}
                            </h6>
                            <h6 style={{ fontSize: '13px' }}>
                                <b>Diện tích:</b> {project.area}
                            </h6>

                            {/* Property footer */}
                            <div className="property-footer">
                                <span className="left">
                                    <a href="true"><i className="fa fa-user" />{project.fullname}</a>
                                </span>
                                <span className="right">
                                    <Tag style={{ fontSize: '13px' }} color='green'>
                                        <p style={{ fontSize: '13px', margin: 'auto', color: 'green', textAlign: 'center' }}><strong>Đăng ngày:</strong>{moment.unix(project.updateTime).format('DD/MM/YYYY')}</p></Tag>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        );
    }
}

export default InfoEstateOfAgent;