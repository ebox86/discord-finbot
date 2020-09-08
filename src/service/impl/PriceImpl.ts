import ServiceHandler from "../../requests/ServiceHandler";
import { Price } from '../Price';

const svc = ServiceHandler.getInstance();

export class PriceImpl implements Price {
    symbol: string;
    price: number;
    companyName: string;
    open: number;
    low: number;
    high: number;
    close: number;
    latestUpdate: number;
    volume: number;
    averageVolume: number;
    change: number;
    changePercent: number;
    extendedMarketPrice: number;
    extendedMarketChange: number;
    extendedMarketChangePercent: number;
    extendedMarketTime: number;
    prevClose: number;
    marketCap: number;
    week52High: number;
    week52Low: number;
    ytdChange: number;
    peRatio: number;
    isMarketOpen: boolean;

    async getPriceData(symbol:string){
        let params = "/price/" + symbol;
        const data = await svc.getData(params);
        // TODO: improve this with try / catch
        if(data.error){
            throw new Error("not a valid symbol");
        } else {
            this.symbol = data.symbol;
            this.price = data.price;
            this.companyName = data.company_name;
            this.open = data.open;
            this.close = data.close;
            this.high = data.high;
            this.low = data.low;
            this.latestUpdate = data.latest_update;
            this.volume = data.volume;
            this.averageVolume = data.average_volume;
            this.change = data.change;
            this.changePercent = data.change_percent;
            this.extendedMarketPrice = data.extended_market_price;
            this.extendedMarketChange = data.extended_market_change;
            this.extendedMarketChangePercent = data.extended_market_change_percent;
            this.extendedMarketTime = data.extended_market_time;
            this.prevClose = data.previous_close;
            this.marketCap = data.market_cap;
            this.week52High = data.week_52_high;
            this.week52Low = data.week_52_low;
            this.ytdChange = data.ytd_change;
            this.peRatio = data.pe_ratio;
            this.isMarketOpen = data.is_market_open;
        }
    }
}
