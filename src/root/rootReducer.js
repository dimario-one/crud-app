export function rootReducer(state, action) {
  if (action.type === "array") {
    return state;
  } else if (action.type === "add") {
    state = action.arr;
    return state;
  } else if (action.type === "edit") {
  } else if (action.type === "delete") {
    state = action.arr;
    return state;
  }
  return state;
}
