import * as types from "../../constants/Map/Map";

//Lấy list Estates xung quanh 1 location nhất định
var initialState = {};
const estatesOnMap = (state = initialState, action) => {
  // var index = -1;
  // var { id, estate } = action;
  switch (action.type) {
    case types.GET_LIST_ESTATES_AROUND_CURRENT_LOCATION_FAILURE: {
      state = {
        type: types.GET_LIST_ESTATES_AROUND_CURRENT_LOCATION_FAILURE,
        error: action.error
      };
      return [...state];
    }
    case types.GET_LIST_ESTATES_AROUND_CURRENT_LOCATION_SUCCESS: {
      state = {
        type: types.GET_LIST_ESTATES_AROUND_CURRENT_LOCATION_SUCCESS,
        result: action.estates
      };
      return [...state];
    }
    default:
      return [...state];
  }
};

export default estatesOnMap;
