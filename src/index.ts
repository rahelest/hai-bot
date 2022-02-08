import {Client, GatewayIntentBits, Interaction} from 'discord.js';
// import deployCommands from './deploy-commands';
import dotenv from 'dotenv';
import hai from "./commands/hai";

dotenv.config();

// Run this when commands change
// deployCommands();
runClient();

function runClient() {
  const client = new Client({ intents: [GatewayIntentBits.Guilds] });

  client.on('ready', () => {
    console.log(`Logged in as ${client?.user?.tag}!`);
  });

  client.on('interactionCreate', async (interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'hai') {
      await hai(interaction);
    }
  });

  client.login(process.env.DISCORD_BOT_TOKEN);
}
