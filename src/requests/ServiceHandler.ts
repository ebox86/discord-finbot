class ServiceHandler {
    private static instance: ServiceHandler;
    private axios;

    private constructor() {
        this.axios = require('axios').create({
            baseURL: process.env.API_URL
          });
    }

    public static getInstance(): ServiceHandler {
        if(!ServiceHandler.instance) {
            ServiceHandler.instance = new ServiceHandler();
        }

        return ServiceHandler.instance;
    }

    private makeCall = async (url) => {
        let result;
        try {
         result = await this.axios.get(url)
         .then((res) => {
             return res.data;
         }).catch((err) => {
             console.log(err)
         })
        } catch(e) {
            console.log(e)
        }
        return result;
    };

    public async getData(params:string) {
        //TODO: parse param strings and url encode automatically
        //var queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
        let url = params
        return await this.makeCall(url);
    }
}
export default ServiceHandler;