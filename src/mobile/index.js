import React from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import { connect, Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from '../common/reducers';
import * as appActions from '../common/actions/app';
import Routes from './Routes';
import appConfig from './config';
import { Router } from 'react-native-router-flux';

const app = () => {
  const env = 'prod';

  // Create data store from reducers and add middleware
  const options = [];
  /* eslint requirejs/no-conditional-require: 0 */
  /* eslint global-require: 0 */
  options.push(applyMiddleware(require('redux-logger')(), thunk));
  if (env !== 'prod') {
    options.push(require('remote-redux-devtools')());
  }
  const enhancer = compose(...options);
  const store = createStore(reducers, {}, enhancer);

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('../common/reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  // Dispatch initialization to the redux store
  store.dispatch(appActions.initialize('', store));

  const RouterWithRedux = connect()(Router);

  const Root = () => {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  };

  React.AppRegistry.registerComponent('parkexplorer', () => Root);
};

module.exports = app;
