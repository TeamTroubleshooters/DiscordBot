const { SlashCommandBuilder } = require("discord.js");
const { PermissionsBitField } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("purge")
    .setDescription("Deletes a specified number of messages.")
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("The number of messages to delete.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const amount = interaction.options.getInteger("amount");

    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.ManageMessages
      )
    ) {
      return await interaction.reply({
        content: "You do not have permission to use this command.",
        ephemeral: true,
      });
    }

    if (amount <= 0 || amount > 100) {
      return await interaction.reply({
        content:
          "Please specify a number between 1 and 100 for the amount of messages to delete.",
        ephemeral: true,
      });
    }

    try {
      const messages = await interaction.channel.bulkDelete(amount, true);
      await interaction.reply({
        content: `Deleted ${messages.size} message(s).`,
        ephemeral: true,
      });
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "An error occurred while trying to delete messages.",
        ephemeral: true,
      });
    }
  },
};
