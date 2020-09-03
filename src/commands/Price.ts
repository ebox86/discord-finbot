import { Command, CommandMessage, Guard } from "@typeit/discord";
import { ValidateTicker } from "../guards/ValidateTicker";
import { Message } from "discord.js";

export abstract class Price {
    @Command()
    @Guard(
        ValidateTicker
    )
    async price(command: CommandMessage) {
        let c = command.content.split(" ");
        console.log(c);
        if (c.length > 1) {
            command.reply("price command for ticker: " + c[1].toUpperCase);
        } else {
            command.reply("please provide a ticker! Type `$help` for a list of commands.");
        }
    }
}
