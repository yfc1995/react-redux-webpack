const animateState = {
  speed: 45.0,
  direction: true
};

export default function AnimateR(state = animateState, action) {
  switch (action.type) {
    case 'CHANGESPEEDP':
      return {
        ...state,
        speed: (state.speed += 5)
      };
    case 'CHANGESPEEDL':
      return {
        ...state,
        speed: (state.speed -= 5)
      };
    case 'DIRECTION':
      return {
        ...state,
        direction: !state.direction
      };
    default:
      return state
  }
};
