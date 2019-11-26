import * as types from '../../constants/Contact/Company';

var initialState = [];
const companies = (state = initialState, action) => {
    // var index = -1;
    // var { id, estate } = action;
    switch (action.type) {
        case types.GET_LIST_COMPANIES:
            state = action.companies;
            // console.log(state)
            return [...state];
       
        default: return [...state];
    }
};

export default companies;