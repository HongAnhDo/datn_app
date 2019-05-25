import MyService from '../service'

const SeatApi = {
    getAllSeat: async () => {
        var result = null;
      
        await MyService.getRequestData("/vehicles/seat")
            .then(res => result = res.data)
            .catch(err => console.log(err));
        return result;
    }
}
export default SeatApi

