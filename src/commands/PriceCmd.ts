import { Command, CommandMessage, Guard } from "@typeit/discord";
import { ValidateTicker } from "../guards/ValidateTicker";
import { Message, MessageEmbed } from "discord.js";
import { PriceImpl } from "../service/impl/PriceImpl";
import { CompanyImpl } from '../service/impl/CompanyImpl';

export abstract class PriceCmd {
    @Command()
    @Guard(
        ValidateTicker()
    )
    async price(command: CommandMessage) {
        const embed = new MessageEmbed();
        let c = command.content.split(" ");
        const symbol = c[1];
        if (c.length > 1) {
            try {
                const price = new PriceImpl();
                const company = new CompanyImpl();
                await price.getPriceData(symbol);
                await company.getLogoData(price.symbol);
                embed.setColor(price.change > 0.0 ? '#32CD32' : '#FF0000');
                embed.setTitle(price.symbol);
                embed.setDescription(price.companyName);
                embed.setThumbnail(company.logo);
                embed.addFields(
                    { name: 'Price', value: '$' + price.price , inline: true},
                    { name: 'Change', value: '$' + price.change, inline: true },
                    { name: 'Change %', value: (price.changePercent * 100).toFixed(1) + '%', inline: true },
                    // { name: 'EH Price', value: '$' + data.extended_market_price , inline: true},
                    // { name: 'EH Change', value: '$' + data.extended_market_change, inline: true },
                    // { name: 'EH Change %', value: (data.extended_market_change_percent * 100).toFixed(1) + '%', inline: true },
                    { name: 'PE Ratio', value: price.peRatio , inline: true},
                    { name: 'Volume', value: price.volume, inline: true },
                    { name: 'Avg. Volume', value: price.averageVolume, inline: true },
                    { name: '52 week high', value: '$' + price.week52High, inline: true },
                    { name: '52 week low', value: '$' + price.week52Low, inline: true },
                )
                embed.setTimestamp();
                embed.setFooter(price.isMarketOpen ? 'US markets are open.' : 'US markets are closed.', 
                                price.isMarketOpen ? 'https://i.imgur.com/3rv3zeV.png' : 'https://i.imgur.com/gWoTh0g.png');
                            
                command.channel.send(embed);
            } catch (e){
            if (e instanceof Error){
                command.channel.send('thats not a company bro: ' + symbol);
            }
        }
        } else {
            command.channel.send("error: missing ticker for query. refer to `$help` for full command syntax");
        }
    }
}
