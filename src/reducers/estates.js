import * as Types from '../constants/ActionTypes';
import * as map from '../constants/Map/Map'
//Lấy list Estates xung quanh 1 location nhất định
var initialState = [];
const estates = (state = initialState, action) => {
    // var index = -1;
    // var { id, estate } = action;
    switch (action.type) {
        case Types.FETCH_ESTATES_AROUND_CURRENT_LOCATION:
            state = action.estates;
            // console.log(state)
            return [...state];
        case map.SEARCH_MAP:
            state = action.estates;
            return [...state];
        case Types.GET_LIST_ESTATE_FROM_FORM_SEARCH:
            state = action.estates;
            // console.log(state);
            return [...state];
        default: return [...state];
    }
};

export default estates;