import * as types from '../constants/totalPage'

export const actSaveTotalPage = (totalPage) => {
    return {
        type: types.SAVE_TOTAL_PAGE,
        totalPage: totalPage
    }
}