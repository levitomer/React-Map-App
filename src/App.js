/*global google*/
import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './components/Map';
import User from './components/User';

const countries = [
  {australia: {lat: -24.678030, lng: 133.817676}},
  {israel: {lat: 31.986950, lng: 34.953724}},
	{usa: {lat: 39.563760, lng: -101.505397}},
	{france: {lat: 46.583887, lng: 2.653750}},
	{japan: {lat: 36.350862, lng: 138.360520}},
];

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: 32.088094,
        lng: 34.787959,
      },
      zoom: 4,
      users: [],
    }
  }

  calcDistance(fromLat, fromLng, toLat, toLng) {
    return google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(fromLat, fromLng), new google.maps.LatLng(toLat, toLng));
  }

  componentDidMount() {
    fetch("https://glacial-escarpment-40412.herokuapp.com/users").then(function(response) {
      return response.json();
    }).then(data => {
      for (var i = 0; i < data.length; ++i) {
        data[i]['distance'] = this.calcDistance(parseFloat(data[i].location.latitude), parseFloat(data[i].location.longitude), this.state.center.lat, this.state.center.lng)

      }
      data.sort(function(currentUser, nextUser) {
        return (currentUser.distance - nextUser.distance);
      });
      this.setState({users: data});
    });
  }

  render() {

    return (<div className="App">
      <div className="users">
        <header>
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to Hexagram</h1>
          <button type='button' onClick={() => {
              this.setState({
                center: {
                  lat: -25.148409,
                  lng: 134.248957,
                },
              })
            }}>
            Australia
          </button>
          <button type='button' onClick={() => {
              this.setState({
                center: {
                  lat: 31.769220,
                  lng: 35.172783,
                },
              })
            }}>
            Israel
          </button>
          <button type='button' onClick={() => {
              this.setState({
                center: {
                  lat: 39.563760,
                  lng: -101.505397,
                },
              })
            }}>
            United States
          </button>
          <button type='button' onClick={() => {
              this.setState({
                center: {
                  lat: 46.583887,
                  lng: 2.653750,
                },
              })
            }}>
            France
          </button>
          <button type='button' onClick={() => {
              this.setState({
                center: {
                  lat: 36.350862,
                  lng: 138.360520,
                },
              })
            }}>
            Japan
          </button>
        </header>
        <div className="cards container">
          <div className="class-list row">
            {
              this.state.users.map(user => {
                return <User key={user.id} user={user}/>
              })
            }
          </div>
        </div>
      </div>
      <Map center={this.state.center} markers={this.state.users} zoom={this.state.zoom}/>
    </div>);
  }
}

export default App;
