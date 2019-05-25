import * as types from "./ActionTypes"

export const changeListCars = (listCars) =>{
    return {type: types.CHANGE_LIST_CARS, listCars: listCars};
}
export const changeListMotorbikes= (listMotorbikes) =>{
    return {type: types.CHANGE_LIST_MOTORBIKES, listMotorbikes: listMotorbikes};
}
export const changeTab = (index) =>{
    return {type: types.CHANGE_TAB, index: index};
}
export const fetchCars = () =>{
    return {type: types.FETCH_CARS};
}
export const fetchMotorbikes = () =>{
    return {type: types.FETCH_MOTORBIKES};
}
export const initModal = (ref) =>{
    return {type: types.INIT_MODAL, ref: ref};
}
export const sortVehicle = (selectSort) =>{
    return {type: types.SORT_VEHICLE, selectSort: selectSort}
}
export const selectVehicle = (vehicle) =>{
    return {type: types.SELECT_VEHICLE, vehicle: vehicle}
}
export const handleLoading = (loading) =>{
    return {type: types.LOAD_DETAIL, loading: loading}
}
export const handleFinishLoadCar = (listCarsNone) =>{
    return {type: types.FINiSH_LOAD_CAR, listCarsNone: listCarsNone}
}
export const handleFinishLoadMotobike = (listMotorbikesNone) =>{
    return {type: types.FINiSH_LOAD_MOTORBIKE, listMotorbikesNone: listMotorbikesNone}
}
export const handleScrollFilter = (headerFilterVisiable) =>{
    return {type: types.SCROLL_FILTER, headerFilterVisiable: headerFilterVisiable}
}
export const handleOpenFilter = (openModalFilter) =>{
    return {type: types.OPEN_FILTER, openModalFilter: openModalFilter}
}
export const handleChangeFilterCar = (tmsCar, barndCar, seatCar, priceCar) =>{
    return {type: types.OPEN_FILTER, tmsCar: tmsCar, barndCar:barndCar, seatCar:seatCar, priceCar:priceCar}
}



