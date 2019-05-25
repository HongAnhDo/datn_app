import * as types from './ActionTypes'

export const selectCity = () => {
  return { type: types.SELECT_CITY }
}

export const changeCity = (citySelect, indexSelect) => {
  return { type: types.CHANGE_CITY, citySelect: citySelect, indexSelect: indexSelect }
}
export const selectTime = () => {
  return { type: types.SELECT_TIME }
}

export const setListCitys = (listCitys) => {
  return { type: types.SET_LIST_CITYS, listCitys }
}
export const setKeyHome =(keyHome) =>{
  return { type: types.SET_KEY_HOME, keyHome: keyHome}
}
export const handleShowBooking= (showBooking) =>{
  return { type: types.SHOW_BOOKING, showBooking: showBooking}

}
export const handleLoading =(loading) =>{
  return {type: types.LOADING_HOME, loading: loading}
}