import { CHANGE_DELIVERY, INIT_PRICE, CHANGE_PROMOTION, SELECT_DELIVERY_ADDRESS, CACULATE_DAY_NUM } from './ActionTypes';

export const handleChangeDelivery = (isDelivery) => {
    return { type: CHANGE_DELIVERY, isDelivery: isDelivery }
}
export const handleInitPrice = (dayNum, defaultPrice, extraFee, sumPrice, nameVehicle, arrOptions) => {
    return {
        type: INIT_PRICE,
        dayNum: dayNum,
        defaultPrice: defaultPrice,
        extraFee: extraFee,
        sumPrice: sumPrice,
        nameVehicle: nameVehicle,
        arrOptions: arrOptions
    }
}
export const handleChangePromotion = (promotionCode, promoMessage, promoValue, isLoading, sumPrice, promoPrice) => {
    return {
        type: CHANGE_PROMOTION,
        promotionCode: promotionCode,
        promoMessage: promoMessage,
        promoValue: promoValue,
        isLoading: isLoading,
        sumPrice: sumPrice,
        promoPrice: promoPrice
    }
}
export const handleLoad = (isLoading) => {
    return { type: LOAD_PROMO, isLoading: isLoading }
}
export const caculateDay = (dayNum) => {
    return { type: CACULATE_DAY_NUM, dayNum: dayNum }
}
export const selectAddressDelivery = (deliAddress, latlng, sumPrice, deliDistance, deliPrice) => {
    return {
        type: SELECT_DELIVERY_ADDRESS,
        deliAddress: deliAddress,
        latlng: latlng,
        sumPrice: sumPrice,
        deliDistance: deliDistance,
        deliPrice: deliPrice
    }
}