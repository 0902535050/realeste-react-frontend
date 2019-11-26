import * as Types from '../constants/ActionTypes';

var initialState = {
    
};
const currentEstate = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_CURRENT_PROJECT:
            state = action.currentEstate;
            // console.log(state, action);
            return {...state};
        default: return {...state};
    }

}
export default currentEstate;