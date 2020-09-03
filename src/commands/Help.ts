import { Command, CommandInfos, CommandMessage } from "@typeit/discord";
import { MessageEmbed } from "discord.js";

export abstract class Help {
    @Command()
    async help(command: CommandMessage) {

        const embed = new MessageEmbed();
        embed.setTitle(`${command.client.user.username} Help: `);
        embed.addField("`$price <ticker>` or `$<ticker>`", "displays the price of a security at current market value");
        command.channel.send(embed);
    }
}
