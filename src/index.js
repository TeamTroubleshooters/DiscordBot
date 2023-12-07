// Purpose: Main file of the bot
const fs = require("fs");
const path = require("path");
const { Client, GatewayIntentBits, Routes, Collection } = require("discord.js");
const { config } = require("dotenv");
const { REST } = require("@discordjs/rest");

// load environment variables
config();

// create a new client of bot
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

// create a new rest client
const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);

const commands = [];

client.commands = new Collection();
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
      commands.push(command.data.toJSON());
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

// load events
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

async function main() {
  // register slash commands
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    // use this if you want to register commands globally

    const data = await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      {
        body: commands,
      }
    );

    // use this if you want to register commands in a guild

    // const data = await rest.put(
    //   Routes.applicationGuildCommands(
    //     process.env.CLIENT_ID,
    //     process.env.GUILD_ID
    //   ),
    //   {
    //     body: commands,
    //   }
    // );
    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    console.error(error);
  }
}
client.login(process.env.BOT_TOKEN); // login to discord

main();
