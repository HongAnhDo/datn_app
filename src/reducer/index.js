import { combineReducers } from 'redux';
import homeReducer from './homeReducer'
import { calendarReducer } from './calendarReducer';
import listVehiclesReducer from './listVehicleReducer';
import customerInfoReducer from './customerInfoReducer';
import detailVehicleReducer from './detailVehicleReducer';
import userReducer from './userReducer'
const reducer = combineReducers({
    home : homeReducer,
    calendar: calendarReducer,
    listVehicles: listVehiclesReducer,
    detail: detailVehicleReducer,
    customer: customerInfoReducer,
    user: userReducer

});

export default reducer;