import {keys} from '../actions/app';

const initialState = {
  environment: 'test',
  platform: ''
};

export default function app(state = initialState, action) {
  switch (action.type) {
  case keys.APP_INITIALIZED:
    return Object.assign({}, action.data);
  default:
    return state;
  }
}
