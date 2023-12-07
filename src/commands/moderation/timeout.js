const { SlashCommandBuilder } = require("discord.js");
const { PermissionsBitField } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Times out a member for a specified duration.")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The member to timeout.")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("duration")
        .setDescription("The duration of the timeout")
        .setRequired(true)
        .addChoices(
          {
            name: "1 Minute",
            value: 1,
          },
          {
            name: "30 minutes",
            value: 30,
          },
          {
            name: "1 Hour",
            value: 60,
          },
          {
            name: "1 day",
            value: 1440,
          },
          {
            name: "1 Week",
            value: 10080,
          }
        )
    )

    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Reason for timing out the member.")
        .setRequired(false)
    ),
  async execute(interaction) {
    const target = interaction.options.getMember("target");
    const duration = interaction.options.getInteger("duration");
    const reason =
      interaction.options.getString("reason") || "No reason provided.";

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
        content: "I cannot timeout this user.",
        ephemeral: true,
      });
    }

    try {
      await target.timeout(duration * 60 * 1000, reason); // Convert minutes to milliseconds
      await interaction.reply({
        content: `${target.user.tag} has been timed out for ${duration} minutes. Reason: ${reason}`,
        ephemeral: true,
      });
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "An error occurred while timing out the user.",
        ephemeral: true,
      });
    }
  },
};
