import * as Types from '../../constants/Transaction/waiting'

var initialState = {};

const waiting = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_REQUEST_LIST:
            // console.log(action, state)
            state = action.waiting[0]
            // console.log(state)
            return {...state}
        case Types.ADD_WAITING_REQUEST:
            // console.log(action, state)
            return {...state}
        case Types.DELETE_WAITING_REQUEST:
            // console.log(action, state)
            return {...state}
    
        default: return { ...state };
    }

}
export default waiting;