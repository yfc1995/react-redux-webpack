const pointStore = {
  num: 1
}

function PointR(state=pointStore, action) {
  switch(action.type) {
    case 'ADD':
      return {
        ...state,
        num: state.num + 1
      }
    default:
        return state;
  }
}

export default PointR;
