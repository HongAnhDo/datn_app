import MyService from '../service'

const BandApi = {
    getBrandByType: async (typeId) => {
        var result = null;
      
        await MyService.getRequestData("/vehicles/brand/get-brand-vehicle-by-type", { vhc_type_id: typeId })
            .then(res => result = res.data)
            .catch(err => console.log(err));
        return result;
    }
}
export default BandApi

