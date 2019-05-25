import { SET_NAVIGATION, SELECT_TIME_CALENDAR, SELECT_DATE, LOADING_LIST,HANDLE_MODAL_TIME } from "../actions/ActionTypes"
import { Animated } from 'react-native'

const list = [
    "06:00 AM", "06:30 AM", "07:00 AM", "07:30 AM", "08:00 AM", "08:30 AM", "09:00 AM",
    "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 AM", "12:30 AM",
    "01:00 PM", "1:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
    "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM",
    "09:00 PM", "09:30 PM", "10:00 PM"
]
const now = new Date()
const minDate = (now.getFullYear() + "" + now.getMonth() + "" + now.getDate())
const maxDate = (now.getFullYear() ) + "" + (now.getMonth() + 4) + "" + now.getDate();
const defaulfState = {
    navigation: "",
    timeStart: 4,
    timeEnd: 27,
    startDate: null,
    untilDate: null,
    minDate: minDate,
    maxDate: maxDate,
    itemList: list,
    book_rent_date: '',
    book_retun_date: '',
    book_rent_date_format: "",
    book_retun_date_format: "",
    dateTimeShort: null,
    dateTimeDisplay: null,
    animation: new Animated.Value(0),
    loading: false,
    visibleModal: false
}

export const calendarReducer = (state = defaulfState, action) => {
    switch (action.type) {
        case SET_NAVIGATION:
            return { ...state, navigation: action.navigation };
        case SELECT_DATE:
            return {
                ...state, startDate: action.startDate,
                untilDate: action.untilDate,
                dateTimeDisplay: action.dateTimeDisplay,
                dateTimeShort: action.dateTimeShort,
                book_rent_date: action.book_rent_date,
                book_retun_date: action.book_retun_date,
            }
        case SELECT_TIME_CALENDAR:
            return { ...state, [action.name]: action.index };
        case LOADING_LIST:
            return { ...state, loading: !state.loading };
        case HANDLE_MODAL_TIME:
            return { ...state, visibleModal: action.visibleModal };
        default:
            return state;
    }
}