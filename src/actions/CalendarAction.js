import { SET_NAVIGATION, SELECT_TIME_CALENDAR, SELECT_DATE , LOADING_LIST, HANDLE_MODAL_TIME} from "./ActionTypes"

export const initNavigation = (navigation) => {
    return { type: SET_NAVIGATION, navigation }
}
export const selectTime = (index, name) => {
    return { type: SELECT_TIME_CALENDAR, index: index, name: name }
}
export const handleLoading = () => {
    return { type: LOADING_LIST }
}
export const handleModalTime = (visibleModal) => {
    return { type: HANDLE_MODAL_TIME , visibleModal: visibleModal}
}
export const selectDate = (startDate, untilDate, dateTimeDisplay, dateTimeShort, book_rent_date, book_retun_date) => {
    return {
        type: SELECT_DATE,
        startDate: startDate,
        untilDate: untilDate,
        dateTimeDisplay: dateTimeDisplay,
        dateTimeShort: dateTimeShort,
        book_rent_date: book_rent_date,
        book_retun_date: book_retun_date
    }
}

