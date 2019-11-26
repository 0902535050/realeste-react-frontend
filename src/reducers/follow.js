import { GET_FOLLOWING_LIST, FOLLOW_PROJECT, UNFOLLOW_PROJECT } from '../constants/Follow'

var initialState = []

const follow = (state = initialState, action) => {
    var index = -1
    var index2 = -1
    var temp = {}
    switch (action.type) {
        case GET_FOLLOWING_LIST:
            state = action.follow
            // console.log(action, state)
            return [...state]
        case FOLLOW_PROJECT:
            // console.log(action, state)
            temp = action.follow
            temp.project = action.project
            state.push(temp)
            return [...state]
        case UNFOLLOW_PROJECT:
            // console.log(action, state)
            index = state.findIndex(follow => { return follow.project._id === action.data.projectid })
            index2 = state.findIndex(follow => { return follow.project === null })
            state.splice(index, 1);
            if (index2 !== -1) state.splice(index2, 1)
            // state = action.follow
            // console.log(state)
            return [...state]
        default: return [...state];
    }

}
export default follow;