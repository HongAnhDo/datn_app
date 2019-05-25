import MyService from "../service";

const BookingApi = {
    getBookings: async () => {

        var bookings = null;
        await MyService.getRequestData("/booking")
            .then(data => bookings = data)
            .catch(err => console.log(err))
        return bookings;
    },
    createBooking: async (options) => {
        console.log(options)
        var booking = null;

        await MyService.postRequestData("/booking", options)
            .then(result => {
                booking = result;
            })
            .catch(err => console.log(err));

        console.log(booking)
        return booking

    },
    getDeliPrice: async (options) => {
        var deliPrice = null;
        await MyService.getRequestData("/booking/deli-price", options)
            .then(result => {
                console.log(result);
                deliPrice = result.data
            })
            .catch(err => console.log(err))
        return deliPrice

    },
    getPromotion: async (options) => {
        // options = {
        //     promotionCode: ""
        // }
        console.log(options, "/////")
        var promotion = null;
        await MyService.getRequestData("/booking/promotion", options)
            .then(result => {
                console.log(result);
                promotion = result
            })
            .catch(err => console.log(err))
        return promotion
    },
    getDetailPriceBooking: async (options) => {
        console.log(options)
        var detailPrice = null;
        await MyService.getRequestData("/booking/detail-price", options)
            .then(result => {
                console.log(result);
                detailPrice = result.data
            })
            .catch(err => console.log(err))
        return detailPrice
    },
    getBookingByCode: async (code) => {
        var booking = null;
        await MyService.getRequestData("/booking/get-detail-booking/" + code)
            .then(result => {
                console.log(result);
                booking = result.data
            })
            .catch(err => console.log(err))
        return booking
    },
    getBookingsByToken: async (token, status, vhcTypeId) => {
        var url = "/booking/get-by-token";
        var booking = null;
        await MyService.getRequestData(url, { status: status, vhcTypeId: vhcTypeId }, token)
            .then(result => {
                console.log(result);
                booking = result.data
            })
            .catch(err => console.log(err))
        return booking
    },
    postSendMail: async (options) => {
        console.log("options", options)
        if (!options || (!options.cstm_emai) || (!options.subject) || (!options.content)) {
            alert("Thông tin chưa đủ")
            return null;
        }
        var result = null;
        await MyService.postRequestData("/booking/send-email", options)
            .then(data => result = data)
            .catch(err => console.log(err));
        return result
    },

    postSendMailRequirement: async (options) => {
        console.log("options", options)
        if (!options || (!options.subject) || (!options.content)) {
            alert("Thông tin chưa đủ")
            return null;
        }
        var result = null;
        await MyService.postRequestData("/booking/send-requirement", options)
            .then(data => result = data)
            .catch(err => console.log(err));
        return result
    },
    postExportGGSheet: async (booking) => {
        if (!booking || (!booking.book_code)) {
            return {message:"Đã có lỗi xảy ra"};
        }
        var result = null;
        await MyService.postRequestData("/export/export-ggsheet", { booking: booking })
            .then(data => result = data)
            .catch(err => console.log(err));
        return result;
    }

}

function cleanOptions(obj) {
    console.log(obj.cstm_deli_addr_lat)
    var propNames = Object.getOwnPropertyNames(obj);
    for (var i = 0; i < propNames.length; i++) {
        var propName = propNames[i];
        console.log(propName + "-" + obj[propName])
        if (obj[propName] === null || obj[propName] === undefined || obj[propName] === NaN || obj[propName] == "NaN") {
            console.log(propName)
            delete obj[propName];
        }
    }
}

export default BookingApi;