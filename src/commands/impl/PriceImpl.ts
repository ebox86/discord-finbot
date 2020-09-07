import { ServiceHandler } from "../../requests/ServiceHandler"

let svc = new ServiceHandler();

export class PriceImpl {

    async getPriceData(symbol:string){
        //let params = {"symbol": symbol}
        let params = "price/" + symbol;
        return await svc.getData(params);
    }

    async getLogoData(symbol:string){
        let params = "logo/" + symbol;
        return await svc.getData(params);
    }
}