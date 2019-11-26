import * as types from '../../constants/Contact/Agent';

var initialState = [];
const agents = (state = initialState, action) => {
    // var index = -1;
    // var { id, estate } = action;
    switch (action.type) {
        case types.GET_LIST_AGENTS:
            state = action.agents;
            // console.log(state)
            return [...state];
       
        default: return [...state];
    }
};

export default agents;