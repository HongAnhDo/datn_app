import MyService from '../service'

const PartnerApi = {
    getOptions: async (options) => {

        var partners = null;
        await MyService.getRequestData("/partners/get-by-options", options)
            .then(result => partners = result.data)
            .catch(err => console.log(err));

        return partners 
    }
}

export default PartnerApi;