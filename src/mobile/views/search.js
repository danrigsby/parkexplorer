import React from 'react-native';
const {
  Component,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} = React;
var MapView = require('react-native-maps');
import {Router, Actions as RouteActions, Modal, Scene} from 'react-native-router-flux';

const search = React.createClass({
  getInitialState() {
    return {
      position: {
        latitude: 39.78825,
        longitude: -86.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.1421
      },
      isParkSelected: true
    };
  },

  componentDidMount() {
    fetch('https://indypark.firebaseio.com/parks.json', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      response.json().then((json) => {
        this.setState({data: json});
      });
    });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (position && position.latitude) {
          this.setState({position: {longitude: position.longitude, latitude: position.latitude}});
        }
      },
      (error) => {},
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition(
      (position) => {
        if (position && position.latitude) {
          this.setState({position: {longitude: position.longitude, latitude: position.latitude}});
        }
      }
    );
  },

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  },

  _onSelectPark() {
    RouteActions.park();
  },

  onRegionChange(position) {
    this.state.position.setValue(position);
  },

  render() {
    return (
      <View style={styles.container}>
        <MapView.Animated style={[styles.map]} zoomEnabled={true}
          initialRegion={Object.assign({
            latitudeDelta: 0.0922,
            longitudeDelta: 0.2421
          }, (this.state.position || this.state.position))}>
          {
            this.state.data && Array.isArray(this.state.data)
            ? this.state.data.map((park, index) => {
              if (park) {
                return (
                  <MapView.Marker key={index}
                    title={park.name}
                    coordinate={{
                      latitude: parseFloat(park.lat),
                      longitude: parseFloat(park.long)
                    }} />
                );
              }
              return undefined;
            })
            : undefined
          }
        </MapView.Animated>
        <View style={[styles.details, {height: this.state.isParkSelected ? 100 : 40}]}>
          {
            this.state.isParkSelected
            ?
              <TouchableHighlight onPress={this._onSelectPark}>
                <Text>My Park</Text>
              </TouchableHighlight>
            :
              <Text style={{flex: 1}}>Select a Park</Text>
          }
        </View>
      </View>
    );
  }
});

const styles = React.StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  details: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderColor: '#cccccc'
  }
});

module.exports = search;
