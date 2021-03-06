import {
    Discord,
    On,
    Description,
    Guard,
    ArgsOf,
    Client,
    Command,
    CommandMessage,
    CommandNotFound,
    Rules
  } from "@typeit/discord";
import * as Path from "path";
import { Prefix } from "./guards/Prefix";
import { ValidateTicker } from "./guards/ValidateTicker";
import { NotCommand } from "./guards/NotCommand";
  const prefix = process.env.PREFIX;
  @Discord(prefix, {
    import: [
      Path.join(__dirname, "commands", "*.ts")
    ]
  })
  @Description("Fin-bot: financial markets bot for discord")
  export abstract class AppDiscord {

    @On("ready")
    onReady(): void {
        Client.getCommands().forEach(element => {
          console.log("loaded: " + element.commandName);
        });
        console.log("ready 🚀");
    }

    // TODO: figure out what to do with this
    // @On("message")
    // @Guard(
    //   Prefix(prefix),
    //   NotCommand(),
    //   ValidateTicker()
    // )
    // onMessage(
    //   [message]: ArgsOf<"message">,
    //   client: Client
    //   ) {
    //   let c:string = message.content;
    //   message.channel.send('coming soon!');
    // }
  }
