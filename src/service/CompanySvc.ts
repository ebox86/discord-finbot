import { Company } from '../model/Company';

export interface CompanySvc {
    getCompanyData?: (symbol:string) => Promise<Company>;
    getLogoData?: (symbol:string) => Promise<string>;
}