import * as Types from '../constants/ActionTypes';

var initialState = {};
const newsDetail = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_NEWS_BY_ID:
            state = action.newsDetail;
            console.log(action);
            return {...state};
        default: return {...state};
    }

}
export default newsDetail;