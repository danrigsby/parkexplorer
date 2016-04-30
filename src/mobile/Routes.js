import React from 'react-native';
const {
  Navigator,
  Platform,
  Text,
  StyleSheet
} = React;
import {Router, Actions as RouteActions, Modal, Scene} from 'react-native-router-flux';

import SearchView from './views/search';
import ParkHomeView from './views/parkHome';
import ParkReportView from './views/parkReport';
import ParkActivityView from './views/parkActivity';
const MaterialIcon = require('react-native-vector-icons/MaterialIcons');
const FontAwesomeIcon = require('react-native-vector-icons/FontAwesome');

const HomeIcon = () => {
  return (
    <MaterialIcon name='info' size={28} />
  );
};
const SearchIcon = () => {
  return (
    <MaterialIcon name='search' size={28} />
  );
};
const ReportIcon = () => {
  return (
    <MaterialIcon name='rss-feed' size={28} />
  );
};
const ActivityIcon = () => {
  return (
    <MaterialIcon name='comment' size={28} />
  );
};

const backUp = {
  onLeft: () => RouteActions.pop(),
  leftTitle: 'Back'
};

// Setup the redux store mappings
const Routes = () => {
  return (
    <Router>
      <Scene key='root' hideNavBar={true}>
        <Scene key='search' component={SearchView} hideNavBar={true} title='Parks' icon={SearchIcon} />
        <Scene key='park' tabs={true} hideNavBar={false} style={styles.tabBar} {...backUp}>
          <Scene key='parkHome' component={ParkHomeView} title='Park' icon={HomeIcon} {...backUp} />
          <Scene key='parkReport' component={ParkReportView} title='Report' icon={ReportIcon} {...backUp} />
          <Scene key='parkActivity' component={ParkActivityView} title='Activity' icon={ActivityIcon} {...backUp} />
        </Scene>
      </Scene>
    </Router>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#eeeeee',
    borderTopWidth: 1,
    borderColor: '#cccccc'}
});

export default Routes;
