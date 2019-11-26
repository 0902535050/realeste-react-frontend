import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {GRID, LIST} from '../../constants/ViewType'

export class ViewChangingButton extends Component {
    onChangeListView = (e) => {
        e.preventDefault();
        this.props.history.push("/estatelistview");
    }
    onChangeGridView = (e) => {
        e.preventDefault();
        this.props.history.push("/estategridview");
    }
    render() {
        return (
            <div>
                <div className="col-lg-6 col-md-7 col-sm-7 col-xs-10 cod-pad">
                    <div className="sorting-options">
                        <select className="sorting">
                            <option>New To Old</option>
                            <option>Old To New</option>
                            <option>Properties (High To Low)</option>
                            <option>Properties (Low To High)</option>
                        </select>

                        <a href="true" onClick={this.onChangeListView} className={this.props.component === LIST ? "change-view-btn active-view-btn" : "change-view-btn"}><i className="fa fa-th-list" /></a>
                        <a href="true" onClick={this.onChangeGridView} className={this.props.component === GRID ? "change-view-btn active-view-btn" : "change-view-btn"}><i className="fa fa-th-large" /></a>
                    </div>
                </div>
            </div>
        )
    }
}
export default (withRouter(ViewChangingButton));
