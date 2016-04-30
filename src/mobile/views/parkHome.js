import React from 'react-native';
const {
  Component,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} = React;

class report extends React.Component {
  render() {
    console.log(this.props.park);
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {this.props.park.name}
        </Text>
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
  }
});

module.exports = report;
