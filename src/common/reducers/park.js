import {keys} from '../actions/park';

const initialState = {
  selectedPark: {}
};

export default function app(state = initialState, action) {
  switch (action.type) {
  case keys.PARK_CHANGED:
    return Object.assign({}, action.data);
  default:
    return state;
  }
}
