import * as types from '../actions/ActionTypes'
const defaultState = {
    index: 0,
    listCars: [],
    listMotorbikes: [],
    routes: [
        { key: 'first', title: 'Ô tô' },
        { key: 'second', title: 'Xe máy' },
    ],
    fetchCars: false,
    fetchMotorbikes: false,
    refModal: "",
    selectSort: -1,
    vehicle: "",
    loading: false,
    listCarsNone: false,
    listMotorbikesNone: false,
    headerFilterVisiable: "",
    openModalFilter: false,
    tmsCar: {
        "vhc_tms_name": "Tất cả",
        "vhc_tms_id": 0
    },
    tmsMotor: "",
    seatCar: "",
    priceCar: [400000, 3000000],
    priceMotor: [50000, 500000],
    brandCar: "",
    brandMotor: ""

}
const listVehiclesReducer = (state = defaultState, action) => {
    switch (action.type) {
        case types.CHANGE_TAB:
            return { ...state, index: action.index };
        case types.CHANGE_LIST_CARS:
            return { ...state, listCars: action.listCars, fetchCars: !state.fetchCars };
        case types.CHANGE_LIST_MOTORBIKES:
            return { ...state, listMotorbikes: action.listMotorbikes, fetchMotorbikes: !state.fetchMotorbikes };
        case types.FETCH_START:
            return { ...state, isStart: true }
        case types.FETCH_SUCCESS:
            return { ...state, isStart: false }
        case types.INIT_MODAL:
            return { ...state, refModal: action.ref }
        case types.SORT_VEHICLE:
            return { ...state, selectSort: action.selectSort }
        case types.SELECT_VEHICLE:
            return { ...state, vehicle: action.vehicle }
        case types.LOAD_DETAIL:
            return { ...state, loading: action.loading }
        case types.FINiSH_LOAD_CAR:
            return { ...state, listCarsNone: action.listCarsNone }
        case types.FINiSH_LOAD_MOTORBIKE:
            return { ...state, listCarsNone: action.listMotorbikesNone }
        case types.SCROLL_FILTER:
            return { ...state, headerFilterVisiable: action.headerFilterVisiable }
        case types.OPEN_FILTER:
            return { ...state, openModalFilter: action.openModalFilter }
        case types.CHANGE_FILTER_CAR:
            return { ...state, brandCar: action.brandCar, seatCar: action.seatCar, priceCar: action.priceCar, tmsCar: action.tmsCar }
        default:
            return state;
    }

};


export default listVehiclesReducer;