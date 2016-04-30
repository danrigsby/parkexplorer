import React from 'react-native';
const {
  Component,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} = React;
const MapView = require('react-native-maps');

class report extends React.Component {
  render() {
    console.log(this.props.park);
    return (
      <View style={styles.container}>
        <MapView.Animated style={[styles.map]} zoomEnabled={true}
          initialRegion={{
            latitudeDelta: 0.0022,
            longitudeDelta: 0.0021,
            latitude: this.props.park.lat,
            longitude: this.props.park.long
          }}>
          <MapView.Marker
            coordinate={{
              latitude: parseFloat(this.props.park.lat),
              longitude: parseFloat(this.props.park.long)
            }}
          >
          </MapView.Marker>
        </MapView.Animated>
        <View style={styles.body}>
          <Text style={styles.text}><Text style={styles.title}>Opened:</Text>{this.props.park.opened}</Text>
          <Text style={styles.text}><Text style={styles.title}>Size:</Text>{this.props.park.size}</Text>
        </View>

      </View>
    );
  }
}

const styles = React.StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 60
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },

  title: {
    fontWeight: 'bold',
    paddingRight: 10
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300,
    borderBottomWidth: 1,
    borderColor: '#cccccc'
  },
  text: {
    fontSize: 18
  },
  body: {
    flex: 1, position: 'absolute',
    top: 300,
    left: 1,
    right: 0,
    padding: 15,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  }
});

module.exports = report;
