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
    <MaterialIcon name='my-location' size={28} />
  );
};
const SearchIcon = () => {
  return (
    <MaterialIcon name='search' size={28} />
  );
};
const ReportIcon = () => {
  return (
    <MaterialIcon name='add-alert' size={28} />
  );
};
const ActivityIcon = () => {
  return (
    <MaterialIcon name='view-list' size={28} />
  );
};

// Setup the redux store mappings
const Routes = () => {
  return (
    <Router>
      <Scene key='root' hideNavBar={true}>
        <Scene key='search' component={SearchView} hideNavBar={true} title='Parks' icon={SearchIcon} />
        <Scene key='park' tabs={true} hideNavBar={false} style={styles.tabBar} onLeft={() => RouteActions.pop()} leftTitle='Back'>
          <Scene key='parkHome' component={ParkHomeView} title='Park' icon={HomeIcon} onLeft={() => RouteActions.pop()} leftTitle='Back' />
          <Scene key='parkActivity' component={ParkActivityView} title='Activity' icon={ActivityIcon} onLeft={() => RouteActions.pop()} leftTitle='Back' />
          <Scene key='parkReport' component={ParkReportView} title='Report' icon={ReportIcon} onLeft={() => RouteActions.pop()} leftTitle='Back' />
        </Scene>
      </Scene>
    </Router>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#eeeeee',
    borderTopWidth: 1,
    borderColor: '#111'}
});

export default Routes;
