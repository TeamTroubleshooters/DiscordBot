import { SlashCommandBuilder } from "@discordjs/builders";
const pingCommand = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with Pong!");

export default pingCommand.toJSON();
