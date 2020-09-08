import ServiceHandler from "../../requests/ServiceHandler";
import { Company } from '../Company';

const svc = ServiceHandler.getInstance();

export class CompanyImpl implements Company {
    symbol: string;
    companyName: string;
    industry: string;
    exchange: string;
    website: string;
    description: string;
    ceo: string;
    sector: string;
    employees: number;
    logo: string;

    async getLogoData(symbol:string){
        let params = "/logo/" + symbol;
        const data = await svc.getData(params);
        // TODO: improve this with try / catch
        if(data.error){
            throw new Error("not a valid symbol");
        } else {
            this.logo = data.url;
        }
    }

    async getCompanyData(symbol:string){
        let params = "/company/" + symbol;
        const data = await svc.getData(params);
        // TODO: improve this with try / catch
        if(data.error){
            throw new Error("not a valid symbol");
        } else {
            this.symbol = data.symbol;
            this.companyName = data.companyName;
            this.industry = data.industry;
            this.exchange = data.exchange;
            this.website = data.website;
            this.description = data.description;
            this.ceo = data.ceo;
            this.sector = data.sector;
            this.employees = data.employees;
        }
    }

}

