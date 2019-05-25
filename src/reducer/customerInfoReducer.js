import * as types from '../actions/ActionTypes';
const defaultState = {
    fullName: "",
    errFullName: "",
    email: "",
    errEmail: "",
    phone: "",
    errPhone: "",
    paymentId: "",
    note: "",
    booking: "",
    focusIndex: 0
}
const customerInfoReducer = (state = defaultState, action) => {
    switch (action.type) {
        case types.CHANGE_FULLNAME:
            return { ...state, fullName: action.fullName, errFullName: action.errFullName };
        case types.CHANGE_EMAIL:
            return { ...state, email: action.email, errEmail: action.errEmail };
        case types.CHANGE_PHONE:
            return { ...state, phone: action.phone, errPhone: action.errPhone };
        case types.CHANGE_NOTE:
            return { ...state, note: action.note };
        case types.SET_BOOKING:
            return { ...state, booking: action.booking };
        case types.HANDLE_FOCUS:
            return {...state, focusIndex: action.focusIndex}
        case types.INIT_CUSTOMER_INFO:
            return { ...state, email: action.email, phone: action.phone, fullName: action.fullName };
        default:
            return state;
    }

};


export default customerInfoReducer;