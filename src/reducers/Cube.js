import CubeAction from '../actions/CubeAction';
const cubeState = {
  look: [3, 3, 5, 0, 0, 1, 0, 1, 0]
}
export default function CubeR(state = cubeState, actions) {
  switch(actions.type) {
    case CubeAction.changeEyeForCube:
      return {
        ...state,
        look: actions.payload
      }
    default:
      return state
  }
}
