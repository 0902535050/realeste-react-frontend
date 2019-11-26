import * as Types from './../constants/ActionTypes';
var initialState = {};
const estateInfo = (state = initialState, action) => {
    // var index = -1;
    // var { id, estate } = action;
    switch (action.type) {
        case Types.GET_INFO_ESTATE:
            state = action.info;
            // console.log(state);
            return {...state};
        default: return {...state};
    }
};

export default estateInfo;