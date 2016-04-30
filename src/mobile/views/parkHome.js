import React from 'react-native';
const {
  Component,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} = React;
const MapView = require('react-native-maps');
const MaterialIcon = require('react-native-vector-icons/MaterialIcons');

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
          <View style={{padding: 15, paddingLeft: 30, paddingRight: 30, flex: 1, width: 380, backgroundColor:'#2196F3'}}>
            <Text style={{fontSize: 22, fontWeight: 'bold', color: 'white', flex: 1}}>{this.props.park.name}</Text>
            <View style={{flex: 1, flexDirection:'row', paddingTop: 10, justifyContent: 'space-between'}}>
              <View style={{alignItems: 'center'}}>
                <MaterialIcon style={{color: 'white'}} name='favorite' size={32} />
                <Text style={{fontSize: 16, paddingTop: 10, color: 'white'}}>Save</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <MaterialIcon style={{color: 'white'}} name='add-location' size={32} />
                <Text style={{fontSize: 16, paddingTop: 10, color: 'white'}}>Directions</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <MaterialIcon style={{color: 'white'}} name='phone' size={32} />
                <Text style={{fontSize: 16, paddingTop: 10, color: 'white'}}>Call</Text>
              </View>
            </View>

          </View>
          <View style={{padding: 15}}>
          <Text style={styles.text}><Text style={styles.title}>Opened:</Text>{this.props.park.opened}</Text>
          <Text style={styles.text}><Text style={styles.title}>Size:</Text>{this.props.park.size}</Text>
          </View>
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
    paddingRight: 20
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 250,
    borderBottomWidth: 1,
    borderColor: '#cccccc'
  },
  text: {
    fontSize: 18
  },
  body: {
    flex: 1,
    position: 'absolute',
    top: 250,
    left: 0,
    right: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  }
});

module.exports = report;
