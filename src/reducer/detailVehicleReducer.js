import * as types from '../actions/ActionTypes'
const defaultState = {
    isDelivery: false,
    promotionCode: "",
    promoMessage: "",
    promoValue: 0,
    promoPrice: 0,
    sumPrice: 0,
    isLoading: false,
    deliAddress: "",
    dayNum: 0,
    defaultPrice: 0,
    extraFee: 0,
    deliPrice: 0,
    deliDistance: 0,
    latlng: "",
    isCheck: false,
    selectedIndex: -1,
    nameVehicle: "",
    arrOptions: []
}
const detailVehicleReducer = (state = defaultState, action) => {
    switch (action.type) {
        case types.CHANGE_DELIVERY:
            return {
                ...state, isDelivery: action.isDelivery, isCheck: true,
                selectedIndex: action.isDelivery ? 1 : 0
            };

        case types.INIT_PRICE:
            return {
                ...state,
                dayNum: action.dayNum,
                defaultPrice: action.defaultPrice,
                extraFee: action.extraFee,
                sumPrice: action.sumPrice,
                nameVehicle: action.nameVehicle,
                arrOptions: action.arrOptions

            }
        case types.CHANGE_PROMOTION:
            return {
                ...state,
                promotionCode: action.promotionCode,
                promoMessage: action.promoMessage,
                promoValue: action.promoValue,
                isLoading: action.isLoading,
                sumPrice: action.sumPrice,
                promoPrice: action.promoPrice
            }
        case types.LOAD_PROMO:
            return { ...state, isLoading: action.isLoading }
        case types.SELECT_DELIVERY_ADDRESS:
            return {
                ...state,
                deliAddress: action.deliAddress,
                latlng: action.latlng,
                sumPrice: action.sumPrice,
                deliDistance: action.deliDistance,
                deliPrice: action.deliPrice
            }
        case types.CACULATE_DAY_NUM:
            return { ...state, dayNum: action.dayNum }

        default:
            return state;
    }

};


export default detailVehicleReducer;