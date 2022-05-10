export function rootReducer(state, action) {
  if (action.type === "array") {
    return state;
  } else if (action.type === "add") {
    let obj = {
      id: state.length + 1,
      name: name.value,
    };
    state.push(obj);
    return state;
  }
  return state;
}
