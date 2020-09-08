export interface Company {
    symbol: string;
    companyName?: string;
    industry?: string;
    exchange?: string;
    website?: string;
    description?: string;
    ceo?: string;
    sector?: string;
    employees?: number;
    logo?: string;
    getCompanyData?: (symbol:string) => void;
    getLogoData?: (symbol:string) => void;
}