const { SlashCommandBuilder } = require("discord.js");
const { PermissionsBitField } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("removetimeout")
    .setDescription("Removes the timeout for a member.")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The member to remove the timeout from.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const target = interaction.options.getMember("target");

    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.ModerateMembers
      )
    ) {
      return await interaction.reply({
        content: "You do not have permission to use this command.",
        ephemeral: true,
      });
    }

    if (!target.moderatable) {
      return await interaction.reply({
        content: "I cannot remove the timeout for this user.",
        ephemeral: true,
      });
    }

    try {
      await target.timeout(1); // Passing 0 duration removes the timeout
      await interaction.reply({
        content: `${target.user.tag}'s timeout has been removed.`,
        ephemeral: true,
      });
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "An error occurred while removing the timeout for the user.",
        ephemeral: true,
      });
    }
  },
};
