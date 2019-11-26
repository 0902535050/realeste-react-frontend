import * as Types from '../constants/loading';

var initialState = true;
const loading = (state = initialState, action) => {
    switch (action.type) {
        case Types.LOADING:
            state = action.loading;
            // console.log(state);
            return state;
        default: return state;
    }

}
export default loading;