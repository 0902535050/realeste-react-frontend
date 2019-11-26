import * as types from '../constants/auth'
export const actCheckAuth = (isAuth) => {
    return{
        type: types.CHECK_AUTH,
        isAuth: isAuth,
    }
}