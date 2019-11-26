import * as Types from '../constants/ActionTypes';
import { EDIT_USER_INFO, GET_USER_INFO } from '../constants/Profile'

var initialState = {};
const user = (state = initialState, action) => {
    switch (action.type) {
        case Types.SAVE_INFO_USER:
            state = action.user;
            // console.log(state);
            return { ...state };
        case EDIT_USER_INFO:
            // console.log(state, action)
            return { ...state }
        case GET_USER_INFO:
            state = action.user.user
            // console.log(action, state)
            return { ...state }
        default: return { ...state };
    }
}
export default user;