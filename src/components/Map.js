import React, { Component } from 'react';
import MarkerClusterer from '../markerclusterer.js';

class Map extends Component {
	constructor(props){
		super(props);

		this.state = {
			markers: []
		}
	}

	componentDidUpdate(){
		const google = window.google;

		this.map = new google.maps.Map(this.refs.map, {
			center: this.props.center,
			zoom: this.props.zoom
		});

		this.createMarkers(this.props.markers)
	}

	createMarkers(users){
		const google = window.google;

		users.map(user => {
			this.marker = new google.maps.Marker({
				position: {
					lat: parseFloat(user.location.latitude),
					lng: parseFloat(user.location.longitude)
				},
				map: this.map,
			});
			this.state.markers.push(this.marker);
		})
		var markerCluster = new MarkerClusterer(this.map,
																						this.state.markers,
																						{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

	}

  render(){
		console.log(this.props.markers);
    return(
			<div className="mapContainer">
				<div id="map" ref="map"></div>
			</div>
    );

  }
};

export default Map;
