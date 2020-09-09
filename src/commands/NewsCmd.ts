import { Command, CommandInfos, CommandMessage } from "@typeit/discord";
import { MessageEmbed } from "discord.js";
import { NewsSvcImpl } from '../service/impl/NewsSvcImpl';
import { CompanySvcImpl } from '../service/impl/CompanySvcImpl';
import { ConvertUnixTimestamp } from '../utility/CommandHelpers';

export abstract class NewsCmd {
    @Command()
    async news(command: CommandMessage) {
        const embed = new MessageEmbed();
        let c = command.content.split(" ");
        const symbol = c[1];
        const newsSvc = new NewsSvcImpl();
        const companySvc = new CompanySvcImpl();
        if (c.length > 1) {
            try {
                const newsArticles = await newsSvc.getNewsData(symbol);
                const logo = await companySvc.getLogoData(symbol);
                embed.setTitle(`${symbol.toUpperCase()} Latest News`);
                embed.setThumbnail(logo);
                newsArticles.forEach(article => {
                    let paywall = article.hasPaywall ? '[🔒]' : ''
                    embed.addField(article.headline,`${ConvertUnixTimestamp(article.datetime)} [${article.source}]${paywall} [Link](${article.url})`);
                });
                command.channel.send(embed);
            } catch (e){
                if (e instanceof Error){
                    command.channel.send('thats not a company or no details available: ' + symbol);
                }
            }
        } else {
            command.channel.send("error: missing ticker for query. refer to `$help` for full command syntax");
        }
    }
}
