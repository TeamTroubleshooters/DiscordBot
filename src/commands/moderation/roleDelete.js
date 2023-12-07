const { SlashCommandBuilder } = require("discord.js");
const { PermissionsBitField } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("deleterole")
    .setDescription("Deletes a role from the server.")
    .addRoleOption((option) =>
      option
        .setName("role")
        .setDescription("The role to delete.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const role = interaction.options.getRole("role");

    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)
    ) {
      return await interaction.reply(
        "You do not have permission to use this command."
      );
    }

    if (!role.editable) {
      return await interaction.reply("I cannot delete this role.");
    }

    try {
      await role.delete();
      await interaction.reply(`Successfully deleted role "${role.name}".`);
    } catch (error) {
      console.error(error);
      await interaction.reply("An error occurred while deleting the role.");
    }
  },
};
