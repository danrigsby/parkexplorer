import React from 'react-native';
const {
  Button,
  Component,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} = React;
var MapView = require('react-native-maps');
import {Router, Actions as RouteActions, Modal, Scene} from 'react-native-router-flux';

class home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={RouteActions.pop}><Text>Back</Text></TouchableHighlight>
      </View>
    );
  }
}

const styles = React.StyleSheet.create({
  container: {
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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});

module.exports = home;
