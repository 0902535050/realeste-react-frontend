import React, { Component } from 'react'
import moment from 'moment'
import { Link, withRouter } from 'react-router-dom'

class SingleHintProperty extends Component {
    render() {
        const { info } = this.props
        // console.log(this.props)
        return (
            <div className="media">
                <div className="media-left">
                    <img className="media-object" src={info.url[0]} alt="small-properties-1" style={{ width: "90px", height: "63px" }} />
                </div>
                <div className="media-body">
                    <Link to={`/properties/${info._id}`}>
                        <h3 className="media-heading" style={{color: "#1B419A"}}>
                            {info.name}
                        </h3>
                    </Link>

                    <p>{moment.unix(info.updateTime).format('DD/MM/YYYY')}</p>
                    <div className="price">
                        {info.price >= 1000 && info.statusProject === 1 ? `${info.price / 1000} tỷ VNĐ` : info.price + ' ' + info.unit}
                    </div>
                </div>
            </div>

        )
    }
}

export default withRouter(SingleHintProperty)
