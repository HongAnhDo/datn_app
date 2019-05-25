import * as types from '../actions/ActionTypes'
const defaultState = {
    userName: "",
    password: ""
}
const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case types.CHANGE_USERNAME_LOGIN:
            return { ...state, userName: action.userName };
        default:
            return state

    }

};


export default userReducer;