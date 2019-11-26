import * as types from '../../constants/Contact/Agent';
var initialState = {};
const infoAgent = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_INFO_AGENT:
            state = action.agent;
            // console.log(state);
            return {...state};
        default: return {...state};
    }
};

export default infoAgent;