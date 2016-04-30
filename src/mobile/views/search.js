import React from 'react-native';
const {
  Component,
  StyleSheet,
  TouchableHighlight,
  Text,
  TouchableOpacity,
  View
} = React;
const MapView = require('react-native-maps');
import Firebase from 'firebase';
import Callout from '../components/callout';
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
      showMethLabs: false,
      data: [],
      methLabData: []
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
    RouteActions.park({title: this.state.selectedPark.name, park: this.state.selectedPark});
  },

  onRegionChange(position) {
    this.state.position.setValue(position);
  },

  toggleShowMethLab() {
    if (this.state.showMethLabs) {
      this.setState({methLabData: [], showMethLabs: !this.state.showMethLabs});
    } else {
      fetch('https://indypark.firebaseio.com/methlabs.json', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        response.json().then((json) => {
          console.log(json);
          this.setState({
            methLabData: json,
            showMethLabs: !this.state.showMethLabs
          });
        });
      }).catch(() => {
        this.setState({
          methdLabData: []
        });
      });
    }
  },

  methLabToggleButton() {
    return (
      <TouchableHighlight style={styles.button} underlayColor='#99d9f4' onPress={this.toggleShowMethLab}>
        <Text style={styles.buttonText}>{this.state.showMethLabs ? 'Hide' : 'Show'}{' Meth Labs'}</Text>
      </TouchableHighlight>
    );
  },

  renderMethLabs() {
    return this.state.methLabData.map((lab, index) => {
      if (!lab) { return undefined;}
      return (<MapView.Marker
        pinColor={'blue'}
        key={index}
        title={"Meth Lab!"}
        coordinate={{
                      latitude: lab.lat,
                      longitude:lab.long
                    }}
      >
      </MapView.Marker>)
      }
    );
  },

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.topPanel]}>
          {this.methLabToggleButton()}
        </View>
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
                    onSelect={() => {
                      if (this.state.selectedPark && this.state.selectedPark.index === index) {
                        this._onSelectPark();
                      } else {
                        this.setState({selectedPark: {id: index, ...park}});
                      }
                    }}
                    onDeselect={() => this.setState({selectedPark: null})}
                  >
                  </MapView.Marker>
                );
              }
              return undefined;
            })
          }{this.state.methLabData ? this.renderMethLabs() : ''}
        </MapView.Animated>
        {
          this.state.selectedPark
          ?
            <TouchableOpacity activeOpacity={0.9} style={[styles.bottomPanel, styles.details]} onPress={this._onSelectPark}>
              <Text style={{fontSize: 22, fontWeight: 'bold'}}>{this.state.selectedPark.name}</Text>
              <Text><Text style={styles.title}>Opened:</Text>{this.state.selectedPark.opened}</Text>
              <Text><Text style={styles.title}>Size:</Text>{this.state.selectedPark.size}</Text>
            </TouchableOpacity>
          :
            <View style={[styles.bottomPanel]}>
              <Text style={{flex: 1}}>Select a Park</Text>
            </View>
        }
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
    top: 50,
    left: 0,
    right: 0,
    bottom: 0
  },
  topPanel: {
    position: 'absolute',
    top: 5,
    left: 0,
    right: 0,
  },
  bottomPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'white',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderColor: '#cccccc',
    height: 40
  },
  details: {
    height: 100,
    padding: 15,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  title: {
    fontWeight: 'bold',
    paddingRight: 10
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
