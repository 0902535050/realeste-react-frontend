import * as Types from '../constants/ActionTypes';

var initialState = [];
const news = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_NEWS_BY_TYPE:
            state = action.news;
            // console.log(state);
            return [...state];
        default: return [...state];
    }

}
export default news;