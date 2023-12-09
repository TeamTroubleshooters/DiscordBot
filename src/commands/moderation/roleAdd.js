const { SlashCommandBuilder } = require("discord.js");
const { PermissionsBitField } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addrole")
    .setDescription("Adds a role in the server.")
    .addStringOption((option) =>
      option
        .setName("role")
        .setDescription("The role to add.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const role = interaction.options.getString("role");

    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)
    ) {
      return await interaction.reply(
        "You do not have permission to use this command."
      );
    }

    try {
      const createdRole = await interaction.guild.roles.create({ name: role });
      await interaction.reply(`Successfully added ${createdRole}.`);
    } catch (error) {
      console.error(error);
      await interaction.reply("An error occurred while adding the role.");
    }
  },
};
