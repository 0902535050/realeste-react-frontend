import * as types from '../../constants/Company/userCompany';

var initialState = [];
const employees = (state = initialState, action) => {
    // var index = -1;
    // var { id, estate } = action;
    switch (action.type) {
        case types.SAVE_LIST_EMPLOYEES:
            state = action.employees;
            // console.log(state)
            return [...state];
       
        default: return [...state];
    }
};

export default employees;