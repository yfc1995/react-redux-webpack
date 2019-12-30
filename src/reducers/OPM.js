const opmState = {
  opm: [-1.0, 1.0, -1.0, 1.0, 0.0, 1.0]
}
export default function OPMRender(state=opmState, actions) {
  switch(actions.type) {
    case 'CHANGE':
      return {
        ...state,
        ...actions.payload
      }
    default:
      return state
  }
}
