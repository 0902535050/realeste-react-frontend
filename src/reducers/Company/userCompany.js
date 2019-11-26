import * as Types from '../../constants/Company/userCompany'

var initialState = {};
const userCompany = (state = initialState, action) => {
    switch (action.type) {
        case Types.SAVE_INFO_USER_COMPANY:
            state = action.userCompany;
            // console.log(state);
            return {...state};
        default: return {...state};
    }
}
export default userCompany;