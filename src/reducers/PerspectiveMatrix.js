import { perspectiveAction } from '../actions/Perspective';
const perspectiveMatrixState = {
  look: [0, 0, 5, 0, 0, -1, 0, 1, 0],
  perspective: [30, 1, 1, 100]
};

export default function perspectiveR(state = perspectiveMatrixState, actions) {
  if (!actions.payload) {
    return state;
  }
  switch (actions.type) {
    case perspectiveAction.changeEyeForPerspective:
      return {
        ...state,
        look: actions.payload
      };
    case perspectiveAction.changePerspective:
      return {
        ...state,
        perspective: actions.payload
      };
    default:
      return state;
  }
}
