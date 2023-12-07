const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kicks a specified user")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Select the user to kick")
        .setRequired(true)
    ),
  async execute(interaction) {
    const userToKick = interaction.options.getUser("user");

    const message = await interaction.reply({
      content: "trying to kick user...",
      ephemeral: true,
    });

    // Check if the user has the necessary permissions to kick members
    if (!interaction.member.permissions.has("KICK_MEMBERS")) {
      return await message.edit({
        content: "Oops! You don't have permission to kick members.",
      });
    }
    console.log(userToKick);
    // Check if the target user can be kicked
    try {
      await interaction.guild.members.kick(userToKick.id);
      await message.edit(`Successfully kicked ${userToKick.tag}`);
    } catch (error) {
      console.error(error);
      await message.edit("There was an error kicking the user.");
    }
  },
};
