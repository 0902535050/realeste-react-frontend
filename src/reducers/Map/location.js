import * as Types from '../../constants/ActionTypes';
//Lấy list Estates xung quanh 1 location nhất định
var initialState = {
    lat: '10.792502',
    long: '106.6137603',
};
const location = (state = initialState, action) => {
    // var index = -1;
    // var { id, estate } = action;
    switch (action.type) {
        case Types.CHANGE_LOCATION:
            state = action.location;
            // return {...state};
        case Types.GET_LIST_ESTATE_FROM_FORM_SEARCH:
            state = action.estates;
            // return {...state};
        default: return {...state};
    }
};

export default location;