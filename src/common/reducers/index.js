import {combineReducers} from 'redux';
import app from './app';
import routes from './routes';

export default combineReducers({
  app,
  routes
});
