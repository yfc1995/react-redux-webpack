export const addAction = (payload) => {
  return {
    type: 'ADD',
    payload
  }
}

export const addActionAsync = (payload) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(addAction(payload))
    }, 2000)
  }
}
