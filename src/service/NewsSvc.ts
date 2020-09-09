import { News } from '../model/News';

export interface NewsSvc {
    getNewsData?: (symbol:string) => Promise<News[]>;
}