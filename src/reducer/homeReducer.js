import * as types from '../actions/ActionTypes'
const defaultState = {
    selectCity: false,
    selectTime: false,
    listCitys: [],
    dataCity: [],
    citySelect: "",
    timeStar: "",
    timeEnd: "",
    indexSelect: -1,
    navigation: "",
    loading: true,
    showBooking: false
}
const homeReducer = (state = defaultState, action) => {
    switch (action.type) {
        case types.SELECT_CITY:
            return { ...state, selectCity: !state.selectCity };
        case types.SELECT_CITY_NAME:
            return { ...state, citySelect: action.citySelect, indexSelect: action.indexSelect };
        case types.SET_NAVIGATION:
            return { ...state, navigation: action.navigation };
        case types.SELECT_TIME:
            return { ...state, selectCity: !state.selectCity };
        case types.SET_LIST_CITYS:
            return { ...state, listCitys: action.listCitys, dataCity: action.listCitys, loading: false };
        case types.CHANGE_CITY:
            return { ...state, citySelect: action.citySelect }
        case types.SET_NAVIGATION_HOME:
            return { ...state, navigation: action.navigation };
        case types.LOADING_HOME:
            return { ...state, loading: action.loading };
        case types.SHOW_BOOKING:
            return { ...state, showBooking: action.showBooking };
        default:
            return state;
    }

};


export default homeReducer;