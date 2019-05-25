import MyService from "../service";

// import MyService from "../../service";
const VehicleApi = {
    getFeaturedVehicles: async () =>{

        let result = await MyService.getRequestData("/vehicle-partner/get-featured-vehicles");
        return result
    },
    
    getVehicles: async (options) => {
        var vhc_bran_id = options["vhc_bran_id"];
        var vhc_seat_id = options["vhc_seat_id"];
        var vhc_tms_id = options["vhc_tms_id"];
        var vhc_type_id = options["vhc_type_id"];


        var request = {
            vhc_type_id: vhc_type_id,
            rental_date: options["rental_date"],
            return_date: options["return_date"],
            city_id: options["city_id"],
            // price_from: options["price_from"],
            // price_to: options["price_to"]
        };
        if (vhc_type_id == 1) {
            if (vhc_seat_id)
                request["vhc_seat_id"] = vhc_seat_id

        }
        if (vhc_bran_id)
            request["vhc_bran_id"] = vhc_bran_id
            
        if (vhc_tms_id)
            request["vhc_tms_id"] = vhc_tms_id


        return await MyService.getRequestData("/vehicle-partner/get-list-for-app", request);

    },
    getVehicleById: async (vhc_part_id) => {
        let result = await MyService.getRequestData("/vehicle-partner/get-detail-vehicle-partner", { "vhc_part_id": vhc_part_id });
       
        return result
    }
}

export default VehicleApi;