function reducer(state = { data: "", favorites: [], cityArr: [] }, action) {
  switch (action.type) {
    case "FETCH_DATA":
      return {
        ...state,
        data: action.payload,
      };
    case "ADD_TO_FAVORITES":
      return {
        ...state,
        favorites: [...state.favorites, action.cityElement, action.payload],
      };
    case "REMOVE_FROM_FAVORITES": {
      const newArray = { ...state };
      const index = newArray.favorites.indexOf(action.cityElement);
      newArray.favorites.splice(index, 2);
      return newArray;
    }
    default:
      return state;
  }
}

export default reducer;
