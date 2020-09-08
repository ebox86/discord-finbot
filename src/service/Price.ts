export interface Price {
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
    getPriceData: (symbol: string) => void;
}