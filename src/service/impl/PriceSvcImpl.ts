import ServiceHandler from "../../requests/ServiceHandler";
import { Price } from '../../model/Price';
import { PriceSvc } from '../PriceSvc' 

const svc = ServiceHandler.getInstance();

export class PriceSvcImpl implements PriceSvc {
    async getPriceData(symbol:string){
        try {
            let params = "/price/" + symbol;
            const data = await svc.getData(params);
            if(data.error) throw new Error();
            let p = new Price();
            p.symbol = data.symbol;
            p.price = data.price;
            p.companyName = data.company_name;
            p.open = data.open;
            p.close = data.close;
            p.high = data.high;
            p.low = data.low;
            p.latestUpdate = data.latest_update;
            p.volume = data.volume;
            p.averageVolume = data.average_volume;
            p.change = data.change;
            p.changePercent = data.change_percent;
            p.extendedMarketPrice = data.extended_market_price;
            p.extendedMarketChange = data.extended_market_change;
            p.extendedMarketChangePercent = data.extended_market_change_percent;
            p.extendedMarketTime = data.extended_market_time;
            p.prevClose = data.previous_close;
            p.marketCap = data.market_cap;
            p.week52High = data.week_52_high;
            p.week52Low = data.week_52_low;
            p.ytdChange = data.ytd_change;
            p.peRatio = data.pe_ratio;
            p.isMarketOpen = data.is_market_open;
            return p;
        } catch (e) {
            throw new Error("not a valid symbol");
        }
    }
}
