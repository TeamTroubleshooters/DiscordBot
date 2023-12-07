const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Bans a specified user")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Select the user to ban")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Provide a reason for the ban")
        .setRequired(false)
    )
    .addIntegerOption((option) =>
      option
        .setName("duration")
        .setDescription("Set a duration for the ban in days")
        .setRequired(false)
    ),

  async execute(interaction) {
    const userToBan = interaction.options.getUser("user");
    const reason =
      interaction.options.getString("reason") || "No reason provided";
    const duration = interaction.options.getInteger("duration");

    const message = await interaction.reply({
      content: "Trying to ban user...",
      ephemeral: true,
    });

    // Check if the user has the necessary permissions to ban members
    if (!interaction.member.permissions.has("BAN_MEMBERS")) {
      return await message.edit({
        content: "Oops! You don't have permission to ban members.",
      });
    }

    // Get the member object of the target user
    const targetMember = interaction.guild.members.cache.get(userToBan.id);

    // Check if the target user can be banned
    if (!targetMember) {
      return await message.edit({
        content: "The specified user is not a member of this server.",
      });
    }

    if (!targetMember.bannable) {
      return await message.edit({
        content: "I cannot ban this user.",
      });
    }

    // Attempt to ban the user with optional reason and duration
    try {
      await interaction.guild.members.ban(userToBan.id, {
        reason: `${reason} | Banned by ${interaction.user.tag}`,
        days: duration || 0,
      });
      await message.edit(`Successfully banned ${userToBan.tag}`);
    } catch (error) {
      console.error(error);
      await message.edit("There was an error banning the user.");
    }
  },
};
