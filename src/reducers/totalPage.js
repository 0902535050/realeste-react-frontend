import * as Types from '../constants/totalPage';

let initialState = 1;
const totalPage = (state = initialState, action) => {
    switch (action.type) {
        case Types.SAVE_TOTAL_PAGE:
            state = action.totalPage;
            return state;
        default: return state;
    }
}
export default totalPage;