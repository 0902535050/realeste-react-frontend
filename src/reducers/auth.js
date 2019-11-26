import * as types from '../constants/auth'

var initialState = ''
const auth = (state = initialState, action) => {
    // var index = -1;
    // var { id, estate } = action;
    switch (action.type) {
        case types.CHECK_AUTH:
            state = action.isAuth;
            // console.log(state)
            return state;
      
        default: return state;
    }
};

export default auth;