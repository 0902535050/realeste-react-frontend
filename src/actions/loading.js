import * as types from './../constants/loading';
export const actLoading = (data) => {
    return {
        type: types.LOADING,
        loading: data,
    }
}