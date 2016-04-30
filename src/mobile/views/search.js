import React from 'react-native';
const {
  Component,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} = React;
const MapView = require('react-native-maps');
import {Router, Actions as RouteActions, Modal, Scene} from 'react-native-router-flux';

const search = React.createClass({
  getInitialState() {
    return {
      position: {
        latitude: 39.763921,
        longitude: -86.157282,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05
      },
      selectedPark: undefined,
      data: []
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
    }).catch(() => {
      this.setState({data: [{
        name: 'park 1',
        lat: 39.78925,
        long: -86.4324
      }, {
        name: 'park 2',
        lat: 39.78725,
        long: -86.4324
      }]
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
    RouteActions.park({park: this.state.selectedPark});
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
            this.state.data.map((park, index) => {
              if (park) {
                return (
                  <MapView.Marker
                    key={index}
                    title={park.name}
                    coordinate={{
                      latitude: parseFloat(park.lat),
                      longitude: parseFloat(park.long)
                    }}
                    onSelect={() => this.setState({selectedPark: {id: index, ...park}})}
                    onDeselect={() => this.setState({selectedPark: null})}
                  />
                );
              }
              return undefined;
            })
          }
        </MapView.Animated>
        <View style={[styles.details, {height: this.state.selectedPark ? 100 : 40}]}>
          {
            this.state.selectedPark
            ?
              <TouchableHighlight style={styles.button} onPress={this._onSelectPark}>
                <Text style={styles.buttonText}>{this.state.selectedPark.name}</Text>
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
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

module.exports = search;
