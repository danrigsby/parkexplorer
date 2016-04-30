import keyMirror from '../../common/utils/keyMirror';

export const keys = keyMirror({
  APP_INITIALIZED: null,
  NETWORK_ACTIVITY: null
});

export function initialize(platform, store) {
  return {
    type: keys.APP_INITIALIZED
  };
}
