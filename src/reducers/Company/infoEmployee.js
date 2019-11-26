import * as types from '../../constants/Company/employee';
var initialState = {};
const infoEmployee = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_INFO_EMPLOYEE:
            state = action.employee;
            // console.log(state);
            return {...state};
        default: return {...state};
    }
};

export default infoEmployee;