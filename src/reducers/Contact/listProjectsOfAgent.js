import * as types from '../../constants/Contact/Agent';

var initialState = [];
const listProjectsOfAgent = (state = initialState, action) => {
    
    switch (action.type) {
        case types.GET_LIST_PROJECT_OF_AGENT:
            state = action.projects;
            // console.log(state)
            return [...state];
        
        default: return [...state];
    }
};

export default listProjectsOfAgent;