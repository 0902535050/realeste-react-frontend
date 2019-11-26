import React, { Component } from 'react';
import MainHeader from '../../components/MainHeader';
import EstateMapContainer from './EstateMapContainer';
import EstateListInMap from './EstateListInMap';
import Footer from '../../components/Footer';
class HomeMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            estates: [],
            lat: '10.792502',
            long: '106.6137603',
            currentLatLng: {
                lat: '',
                lng: ''
            },
            location: "",
        }
    }
    componentDidMount(){
        if(localStorage.getItem('company')){
            this.props.history.push('/company/profile-admin')
        }
    }
    render() {
        return (
            <div>
                <MainHeader />
                <div className="map-content content-area container-fluid" >
                    <div className="col-xs-12 col-sm-12 col-md-7 col-md-push-5 col-lg-9 col-lg-push-3 ">
                        <div className="row">
                            <EstateMapContainer />
                        </div>
                    </div>
                    <EstateListInMap />
                </div>
                <Footer/>
            </div>
        );
    }
}

export default HomeMap;