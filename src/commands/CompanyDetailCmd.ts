import { Command, CommandInfos, CommandMessage } from "@typeit/discord";
import { MessageEmbed } from "discord.js";
import { CompanyImpl } from '../service/impl/CompanyImpl';

export abstract class CompanyDetailCmd {
    @Command()
    async detail(command: CommandMessage) {
        const embed = new MessageEmbed();
        let c = command.content.split(" ");
        const symbol = c[1];
        if (c.length > 1) {
            try {
                const company = new CompanyImpl();
                await company.getCompanyData(symbol);
                await company.getLogoData(company.symbol);
                embed.setTitle(company.companyName);
                embed.setDescription(company.description);
                embed.setThumbnail(company.logo);
                embed.addFields(
                    { name: 'Sector', value: company.sector, inline: true},
                    { name: 'CEO', value: company.ceo, inline: true },
                    { name: 'Employees', value: company.employees, inline: true },
                    { name: 'Website', value: company.website, inline: true }
                )
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
