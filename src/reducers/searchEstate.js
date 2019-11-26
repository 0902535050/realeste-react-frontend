import * as Types from '../constants/searchEstate';

//Lấy list Estates xung quanh 1 location nhất định
var initialState = [];
const searchEstate = (state = initialState, action) => {
    switch (action.type) {
        case Types.SEARCH_ESTATE:
            state = action.estates;
            // console.log(state)
            return [...state];
        case Types.SEARCH_ALL:
            state = action.estates
            return [...state]
        default: return [...state];
    }
};

export default searchEstate;