const initialState = {
  payload: []
};

export default function commentsReducer(state = initialState, action) {
  switch (action.type) {
    case "SAVE_MESSAGE":
      return {
        ...state,
        payload: [...state.payload, action.message]
      };

    default:
      return state;
  }
}
