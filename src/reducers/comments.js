import * as Types from '../constants/ActionTypes';
import {EDIT_COMMENT, DELETE_COMMENT} from '../constants/Comment'

var initialState = [];

const comments = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_ALL_COMMENT:
            state = action.comments;
            // console.log(state);
            return [...state];
        case Types.POST_COMMENT:
            var comments = action.comments
            state.push({content: comments.content, 
                        createTime: comments.createTime, 
                        projectid: comments.projectid, 
                        star: comments.star, 
                        updateTime: comments.updateTime, 
                        user: action.user,
                        _id: comments._id })
            // console.log(state, action)
            return [ ...state ]
        case EDIT_COMMENT:
            // console.log(action)
            var index = state.findIndex(comment => {return comment._id === action.comment._id})
            state[index] = action.data
            // console.log(state)
            return [...state]
        case DELETE_COMMENT:
            // console.log(action)
            index = state.findIndex(comment => {return comment._id === action.data._id})
            state.splice(index, 1);
            return [...state]
        default: return [...state];
    }

}
export default comments;