export function saveMessage(message) {
  return {
    type: "SAVE_MESSAGE",
    message
  };
}

export function postMessage(message) {
  return dispatch => {
    dispatch(saveMessage(message));
  };
}
