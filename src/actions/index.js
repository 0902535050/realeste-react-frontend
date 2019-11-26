import * as Types from './../constants/ActionTypes';
import { SAVE_FOLLOW_PROJECTID, GET_FOLLOWING_LIST, UNFOLLOW_PROJECT, FOLLOW_PROJECT } from './../constants/Follow'
import { EDIT_USER_INFO, GET_USER_INFO, EDIT_USER_PROJECT } from '../constants/Profile'
import {EDIT_COMMENT, DELETE_COMMENT} from '../constants/Comment'

//==================== Estates ==================== 
export const actFetchEstates = (estates) => {
    return {
        type: Types.FETCH_ESTATES_AROUND_CURRENT_LOCATION,
        estates: estates
    }
}
export const actGetEstate = (info) => {
    return {
        type: Types.GET_INFO_ESTATE,
        info: info
    }
}
export const actGetListEstateFromFromSearch = (estates) => {
    return {
        type: Types.GET_LIST_ESTATE_FROM_FORM_SEARCH,
        estates: estates
    }
}

export const actSaveCurrentEstate = (currentEstate) => {
    return {
        type: Types.GET_CURRENT_PROJECT,
        currentEstate: currentEstate
    }
}

export const actSaveInfoUser = (user) => {
    return {
        type: Types.SAVE_INFO_USER,
        user: user
    }
}

export const actGetNewsByType = (news) => {
    return {
        type: Types.GET_NEWS_BY_TYPE,
        news: news
    }
}

export const actGetNewsById = (newsDetail) => {
    return {
        type: Types.GET_NEWS_BY_ID,
        newsDetail: newsDetail
    }
}

export const actSaveLocationInfo = (address) => {
    return {
        type: Types.SAVE_LOCATION_INFO,
        address: address
    }
}

export const actGetComments = (comments) => {
    return {
        type: Types.GET_ALL_COMMENT,
        comments: comments
    }
}

export const actGetEstateListOfUser = (estatesListOfUser) => {
    return {
        type: Types.GET_ESTATE_LIST_OF_USER,
        estatesListOfUser: estatesListOfUser
    }
}

export const actSaveFollowProject = (follow) => {
    return {
        type: SAVE_FOLLOW_PROJECTID,
        follow: follow
    }
}

export const actGetFollowingList = (follow) => {
    return {
        type: GET_FOLLOWING_LIST,
        follow: follow
    }
}

export const actUnfollowProject = (follow, data) => {
    return {
        type: UNFOLLOW_PROJECT,
        follow: follow,
        data: data
    }
}

export const actFollowProject = (follow, project) => {
    return {
        type: FOLLOW_PROJECT,
        follow: follow,
        project: project,
    }
}

export const actPostComment = (comments, user) => {
    return {
        type: Types.POST_COMMENT,
        comments: comments,
        user: user
    }
}

export const actDeleteProject = (estatesListOfUser, data) => {
    return {
        type: Types.DELETE_PROJECT,
        estatesListOfUser: estatesListOfUser,
        data: data
    }
}

export const actEditUserInfo = (user) => {
    return {
        type: EDIT_USER_INFO,
        user: user,
    }
}

export const actGetUserInfo = (user) => {
    return {
        type: GET_USER_INFO,
        user: user
    }
}

export const actEditComment = (comment, data) => {
    return {
        type: EDIT_COMMENT,
        comment: comment,
        data: data
    }
}

export const actDeleteComment = (comment, data) => {
    return {
        type: DELETE_COMMENT,
        comment: comment,
        data: data
    }
}

export const actEditUserProject = (data, estatesListOfUser) => {
    return {
        type: EDIT_USER_PROJECT,
        data: data,
        estatesListOfUser: estatesListOfUser
    }
}
