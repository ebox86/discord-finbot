import { Command, CommandMessage, Guard } from "@typeit/discord";
import { ValidateTicker } from "../guards/ValidateTicker";
import { Message, MessageEmbed } from "discord.js";
import { PriceImpl } from "./impl/PriceImpl";

const priceData = new PriceImpl();

export abstract class PriceCmd {
    @Command()
    @Guard(
        ValidateTicker()
    )
    async price(command: CommandMessage) {
        const embed = new MessageEmbed();
        let c = command.content.split(" ");
        if (c.length > 1) {
            const symbol = c[1].toUpperCase();
            const data = await priceData.getPriceData(symbol);
            if (data.error){
                command.channel.send('thats not a company bro: ' + symbol);
            } else {
                const logo = await priceData.getLogoData(data.symbol);
                embed.setColor('#0099ff');
                embed.setTitle(data.symbol);
                embed.setDescription(data.company_name);
                embed.setThumbnail(logo.url);
                embed.addFields(
                    { name: 'Last Price', value: data.price },
                    { name: '\u200B', value: '\u200B' },
                    { name: 'Change', value: data.change, inline: true },
                    { name: 'Change %', value: data.change_percent * 100, inline: true },
                    { name: '52 week high', value: data.week_52_high, inline: true },
                )
                embed.setTimestamp();
                embed.setFooter(data.is_market_open ? 'US markets are open.' : 'US markets are closed.');
                               
                command.channel.send(embed);
            }
        } else {
            command.channel.send("error: missing ticker for query. refer to `$help` for full command syntax");
        }
    }
}
