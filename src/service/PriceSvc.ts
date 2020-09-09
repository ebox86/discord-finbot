import { Price } from '../model/Price';

export interface PriceSvc {
    getPriceData: (symbol: string) => Promise<Price>;
}