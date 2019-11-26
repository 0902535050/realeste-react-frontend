/* eslint-disable */
import React, { Component } from 'react'
import Footer from '../components/Footer';
import MainHeader from '../components/MainHeader';
import SingleEstateGridView from '../components/Properties/SingleEstateGridView'
import ViewChangingButton from '../components/Properties/ViewChangingButton'
import Sidebar from '../components/Properties/Sidebar'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {GRID} from '../constants/ViewType'

class EstateListGridView extends Component {
  onRedirectHome = (e) => {
    e.preventDefault();
    this.props.history.push("/");
  }
  render() {
    let estates = this.props.estates;
    // console.log(estates);
    let estatesList = null;
    if (estates) {
      estatesList = estates.map((estate, index) => {
        return (
          <SingleEstateGridView key={index} estate={estate} />
        )
      });
    }
    return (
      <div>
        <MainHeader />
        {/* Sub banner start */}
        <div className="sub-banner overview-bgi">
          <div className="overlay">
            <div className="container">
              <div className="breadcrumb-area">
                <h1>Properties Grid</h1>
                <ul className="breadcrumbs">
                  <li><a href="true" onClick={this.onRedirectHome}>Home</a></li>
                  <li className="active">Properties Grid</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* Sub Banner end */}
        <div className="properties-section content-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-8 col-xs-12">
                {/* Option bar start */}
                <div className="option-bar">
                  <div className="row">
                    <div className="col-lg-6 col-md-5 col-sm-5 col-xs-2">
                      <h4>
                        <span className="heading-icon">
                          <i className="fa fa-th-large" />
                        </span>
                        <span className="hidden-xs">Properties Grid</span>
                      </h4>
                    </div>
                    <ViewChangingButton component={GRID} />
                  </div>
                </div>
                {/* Option bar end */}
                <div className="clearfix" />

                <div className="row">
                  {estatesList}
                </div>

                {/* Page navigation start */}
                <nav aria-label="Page navigation">
                  <ul className="pagination">
                    <li>
                      <a href="#" aria-label="Previous">
                        <span aria-hidden="true">«</span>
                      </a>
                    </li>
                    <li className="active"><a href="properties-grid-rightside.html">1 <span className="sr-only">(current)</span></a></li>
                    <li><a href="properties-grid-leftside.html">2</a></li>
                    <li><a href="properties-grid-fullwidth.html">3</a></li>
                    <li>
                      <a href="properties-grid-fullwidth.html" aria-label="Next">
                        <span aria-hidden="true">»</span>
                      </a>
                    </li>
                  </ul>
                </nav>
                {/* Page navigation end*/}
              </div>

              <Sidebar />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
	return {
		estates: state.estates
	}
}

export default connect(mapStateToProps)(withRouter(EstateListGridView));
