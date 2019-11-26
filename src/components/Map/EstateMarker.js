import React, { Component } from 'react';
import { Marker, InfoWindow } from "react-google-maps";
import houseIcon from '../../marker/pin.png';
import EstateMapCard from './EstateMapCard'
class EstateMarker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            activeMarker: this.props.activeMarker,
        }
    }
    toggleOpen = () => {
        this.setState({ isOpen: !this.state.isOpen }, () => {
            if (!this.state.isOpen) {
                this.setState({ activeMarker: false }, () => {
                    this.props.closeMarkers(null)
                })
            } else {
                this.props.closeMarkers(this.props.uid)
            }
        }
        )
    }
    // componentWillReceiveProps(nextProps) {
    //     this.setState({ activeMarker: nextProps.activeMarker })
    // }
    
    static getDerivedStateFromProps(props, state) {
        if (props.activeMarker !== state.activeMarker) {
            return {
                activeMarker: props.activeMarker
            };
        }
        return null;
    }
    render() {
        return (
            <Marker onClick={this.toggleOpen}
                icon={houseIcon}
                position={this.props.location}
                zIndex={4}
            >
                {this.state.isOpen && this.state.activeMarker ?
                    <InfoWindow maxWidth={800} defaultPosition={this.props.location} onCloseClick={this.props.onToggleOpen}>
                        <EstateMapCard  est={this.props.estate} />
                    </InfoWindow> : null
                }
            </Marker>
            // {/* <Marker position={{lat: 10.792502, lng: 106.6137603  }} /> */}
        );
    }
}

export default EstateMarker;