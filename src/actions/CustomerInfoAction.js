import * as types from './ActionTypes'

export const handleChangeFullName = (fullname, errFullName) => {
  return { type: types.CHANGE_FULLNAME, fullName: fullname, errFullName: errFullName }
}

export const handleChangPhone = (phone, errPhone) => {
  return { type: types.CHANGE_PHONE, phone: phone, errPhone: errPhone }
}
export const handleChangeEmail = (email, errEmail) => {
  return { type: types.CHANGE_EMAIL, email: email, errEmail: errEmail }
}

export const handleChangeNote = (note) => {
  return { type: types.CHANGE_NOTE, note: note }
}

export const handleBooking = (booking) =>{
  return {type: types.SET_BOOKING, booking: booking}
}
export const initCustomerInfo = (email, phone, fullName) =>{
  return {type: types.INIT_CUSTOMER_INFO, email: email, phone: phone, fullName: fullName}
}

export const handleFocusInput = (focusIndex) =>{
  return { type: types.HANDLE_FOCUS, focusIndex: focusIndex}
}