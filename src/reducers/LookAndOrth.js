import { LOOKANDORTHACTION } from '../actions/LookAndOrth';
const lookAndOrthState = {
  eye: [0, 0, 0, 0, 0, -1, 0, 1, 0],
  opm: [-1.0, 1.0, -1.0, 1.0, 0.0, 1.0]
};
export default function LookAndOrthR(state = lookAndOrthState, actions) {
  if (!actions.payload) {
    return state
  }
  switch (actions.type) {
    case LOOKANDORTHACTION.changeEyeForLookAndOrth:
      return {
        ...state,
        eye: actions.payload
      };
    case LOOKANDORTHACTION.changeOrthForLookAndOrth:
      return {
        ...state,
        opm: actions.payload
      };
    default:
      return state;
  }
}
