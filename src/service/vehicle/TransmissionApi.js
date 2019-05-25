import MyService from '../service'

const TransmissionApi = {
    getAllTransmisssion: async (typeId) => {
        var result = null;
      
        await MyService.getRequestData("/vehicles/transmission", { vhc_type_id: typeId })
            .then(res => result = res.data)
            .catch(err => console.log(err));
        return result;
    }
}
export default TransmissionApi

