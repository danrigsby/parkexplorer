import React from 'react-native';
const {
  Component,
  StyleSheet,
  ListView,
  Text,
  TouchableHighlight,
  View
} = React;
const ListItem = require('../components/ListItem');
const Firebase = require('firebase');

class report extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    this.itemsRef = new Firebase("indypark.firebaseio.com/reports");
  }

  _renderItem(item) {
    return (
        <ListItem item={item} onPress={() => {}} />
    );
  }

  listenForItems(itemsRef) {
    itemsRef.orderByChild("date").on('value', (snap) => {
      var items = [];
      snap.forEach((child) => {
        items.push({
          user: child.val().user,
          crowd: child.val().crowd,
          equipmentCondition: child.val().equipmentCondition,
          overallExperience: child.val().overallExperience,
          date: child.val().date,
          _key: child.key()
        });
      });
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });
    });
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

  render() {
    return (
        <View style={styles.container}>
          <ListView
              dataSource={this.state.dataSource}
              renderRow={this._renderItem.bind(this)}
          />
        </View>
    );
  }
}

const styles = React.StyleSheet.create({
  container: {
    paddingTop:65,
    backgroundColor: '#f2f2f2',
    flex: 1,
  }
});

module.exports = report;
