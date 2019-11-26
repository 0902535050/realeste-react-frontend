import * as types from '../../constants/Company/employee';

var initialState = [];
const listProjectsOfEmployee = (state = initialState, action) => {
    var index = -1
    switch (action.type) {
        case types.GET_LIST_PROJECT_OF_EMPLOYEE:
            state = action.projects;
            // console.log(state)
            return [...state];
        case types.EDIT_EMPLOYEE_PROJECT:
            // console.log(state, action)
            return [...state]
        case types.DELETE_EMPLOYEE_PROJECT:
            // console.log(state, action)
            index = state.findIndex(project => { return project._id === action.data.id })
            state.splice(index, 1)
            return [...state]
        default: return [...state];
    }
};

export default listProjectsOfEmployee;