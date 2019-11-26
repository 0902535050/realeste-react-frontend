import * as types from '../../constants/Contact/Company';
var initialState = {};
const infoCompany = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_INFO_COMPANY:
            state = action.company;
            // console.log(state);
            return {...state};
        default: return {...state};
    }
};

export default infoCompany;