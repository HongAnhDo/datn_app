import * as types from './ActionTypes'

export const changeUserName = (userName) => {
    return { type: types.CHANGE_USERNAME_LOGIN, userName: userName }
}

export const changePassword = (password) => {
    return { type: types.CHANGE_PASSWORD_LOGIN, password: password }
}