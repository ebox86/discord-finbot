import { Command, CommandMessage, Guard } from "@typeit/discord";
import { ValidateTicker } from "../guards/ValidateTicker";
import { Message } from "discord.js";

export abstract class Price {
    @Command()
    @Guard(
        ValidateTicker()
    )
    async price(command: CommandMessage) {
        let c = command.content.split(" ");
        if (c.length > 1) {
            command.channel.send("price command for ticker: " + c[1].toUpperCase());
        } else {
            command.channel.send("error: missing ticker for query. refer to `$help` for full command syntax");
        }
    }
}
