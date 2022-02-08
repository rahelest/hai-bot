import { REST, Routes } from 'discord.js';

export default async function deployCommands() {
  if (!process.env.DISCORD_BOT_TOKEN) {
    throw new Error('DISCORD_BOT_TOKEN missing');
  }
  const commands = [
   {
      name: 'hai',
      description: 'Prints Börsihai table',
    },
  ];

  const rest = new REST({ version: '10' }).setToken(
    process.env.DISCORD_BOT_TOKEN as string
  );

  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID as string,
        process.env.GUILD_ID as string
      ),
      { body: commands }
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
}
