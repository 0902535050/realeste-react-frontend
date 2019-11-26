import * as types from '../constants/searchEstate'

export const actSearchEstate = (estates) => {
    return {
        type: types.SEARCH_ESTATE,
        estates: estates
    }
}

export const actSearchAll = (estates) => {
    return {
        type: types.SEARCH_ALL,
        estates: estates
    }
}