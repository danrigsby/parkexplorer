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
    // The park is spread as props.  Check it out: console.log(this.props)
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          "Page Formally Known as Home"
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
