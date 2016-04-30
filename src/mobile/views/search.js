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
        longitudeDelta: 0.5421
      },
      isParkSelected: true
    };
  },

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({position: {longitude: position.longitude, latitude: position.latitude}});
      },
      (error) => {},
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({position: {longitude: position.longitude, latitude: position.latitude}});
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
            longitudeDelta: 0.5421
          }, (this.state.position || this.state.position))}>
          <MapView.Marker.Animated title='My Park' coordinate={{
            latitude: 39.78825,
            longitude: -86.4324
          }} />
          <MapView.Polygon fillColor='yellow' coordinates={[{
            latitude: 37.78825,
            longitude: -122.4324
          }, {
            latitude: 37.9825,
            longitude: -122.4324
          }, {
            latitude: 37.9825,
            longitude: -122.2324
          }]} />
        </MapView.Animated>
            <Text>Location: {JSON.stringify(this.state.position)}</Text>
        <View style={[styles.details, {height: this.state.isParkSelected ? 100 : 40}]}>
          {
            this.state.isParkSelected
            ?
              <TouchableHighlight onPress={this._onSelectPark}>
                <Text>My Park</Text>
              </TouchableHighlight>
            :
              <Text>Select a Park</Text>
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
