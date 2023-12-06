import { SlashCommandBuilder } from "@discordjs/builders";

const insultCommand = new SlashCommandBuilder()
  .setName("insult")
  .setDescription("Replies with an insult!")
  .addUserOption((option) =>
    option
      .setName("user")
      .setDescription("The user to insult")
      .setRequired(true)
  );

export default insultCommand.toJSON();
