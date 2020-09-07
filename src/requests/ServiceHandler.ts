import axios from 'axios';

//TODO: make singleton
export class ServiceHandler {
    private url: string;
    constructor() {
        this.url = process.env.API_URL;
    }

    private makeCall = async (url) => {
        let result;
        try {
         result = await axios.get(url)
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

    async getData(params:string) {
        //TODO: parse param strings and url encode automatically
        //var queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
        let fullUrl = this.url + '/' + params
        return await this.makeCall(fullUrl);
    }
}
