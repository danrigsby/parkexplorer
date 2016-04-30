import keyMirror from '../../common/utils/keyMirror';

export const keys = keyMirror({
  PARK_CHANGED: null
});

export function changePark(park) {
  return {
    type: keys.PARK_CHANGED
  };
}
