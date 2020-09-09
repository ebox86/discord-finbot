import ServiceHandler from "../../requests/ServiceHandler";
import { CompanySvc } from '../CompanySvc';
import { Company } from '../../model/Company';

const svc = ServiceHandler.getInstance();

export class CompanySvcImpl implements CompanySvc {
    async getLogoData(symbol:string){
        try {
            let params = "/logo/" + symbol;
            const data = await svc.getData(params);
            if(data.error) throw new Error();
            return data.url;
        } catch (e) {
            throw new Error("not a valid symbol");
        }
    }

    async getCompanyData(symbol:string){
        try {
            let params = "/company/" + symbol;
            const data = await svc.getData(params);
            if(data.error) throw new Error();
            let c = new Company();
            c.symbol = data.symbol;
            c.companyName = data.companyName;
            c.industry = data.industry;
            c.exchange = data.exchange;
            c.website = data.website;
            c.description = data.description;
            c.ceo = data.ceo;
            c.sector = data.sector;
            c.employees = data.employees;
            return c;
        } catch (e) {
            throw new Error("not a valid symbol");
        }
    }
}
