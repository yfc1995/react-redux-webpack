const LookAtMatrixState = {
  lookat:[0, 0, 0, 0, 0, -1, 0, 1, 0]
}

export default function LookAtMatrixR(state = LookAtMatrixState, action) {
  console.log(action)
  switch (action.type) {
    case 'CHANGEEYE':
      return {
        ...state,
        ...action.payload.param
      }
    default:
      return state
  }
}
