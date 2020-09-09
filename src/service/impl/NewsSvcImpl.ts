import ServiceHandler from "../../requests/ServiceHandler";
import { NewsSvc } from '../NewsSvc';
import { News } from '../../model/News';

const svc = ServiceHandler.getInstance();

export class NewsSvcImpl implements NewsSvc {
    async getNewsData(symbol:string, count:number=5){
        try {
            let params = "/company/" + symbol + "/news";
            const data = await svc.getData(params);
            if(data.length == 0) throw new Error();
            let newsArray = [];
            data.forEach(d => {
                let n = new News();
                n.datetime = d.datetime;
                n.headline = d.headline;
                n.source = d.source;
                n.url = d.url;
                n.summary = d.summary;
                n.related = d.related;
                n.image = d.image;
                n.hasPaywall = d.hasPaywall;
                newsArray.push(n);
            });
            return newsArray.slice(0, 5);
        } catch (e) {
            throw new Error("not a valid symbol");
        }
    }
}
