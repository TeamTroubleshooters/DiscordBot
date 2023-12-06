// Purpose: Main file of the bot

import { Client, GatewayIntentBits, Routes } from "discord.js";
import { config } from "dotenv";
import { REST } from "@discordjs/rest";

// import slash commands
import sayCommand from "./commands/say.js";
import pingCommand from "./commands/ping.js";

// load environment variables
config();

// create a new client of bot
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

// create a new rest client
const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);

// log when bot is ready
client.on("ready", (c) => console.log(`Logged in as ${c.user.tag}!`));

// log when a message is sent
client.on("messageCreate", (message) =>
  console.log(message.author.username, message.guild.name)
);

// handle slash commands
client.on("interactionCreate", async (interaction) => {
  // if not a command, return
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;
  // handle commands
  if (commandName === "ping") {
    const message = await interaction.reply({ content: "Pinging..." });
    await message.edit(`Pong! check **${client.ws.ping} ms**`);
  }
  if (commandName === "say") {
    const input = interaction.options.getString("input");
    await interaction.reply({ content: input });
  }
});

async function main() {
  // register slash commands
  const commands = [
    pingCommand,
    sayCommand,
    // more commands here
  ];
  try {
    console.log("Started refreshing application (/) commands.");

    // use this if you want to register commands globally

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands,
    });

    // use this if you want to register commands in a guild

    // await rest.put(
    //   Routes.applicationGuildCommands(
    //     process.env.CLIENT_ID,
    //     process.env.GUILD_ID
    //   ),
    //   {
    //     body: commands,
    //   }
    // );

    client.login(process.env.BOT_TOKEN); // login to discord
  } catch (error) {
    console.error(error);
  }
}

main();
