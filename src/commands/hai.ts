import fetch from 'node-fetch';
import { htmlToRows } from '../helpers/htmlToRows';
import { formatTable } from '../helpers/formatTable';
import { ChatInputCommandInteraction } from 'discord.js';

export default async function (interaction: ChatInputCommandInteraction) {
  const date = new Date();
  const p = (n: number) => String(n).padStart(2, '0');
  const dateString = `${p(date.getDate())}.${p(date.getMonth() + 1)}.${p(
    date.getFullYear()
  )}`;

  const url = 'https://www.lhv.ee/index/index.cfm?l3=et&id=10182&nocache=1';
  const response = await fetch(url);
  const html = await response.text();

  if (!html) {
    interaction.reply('Failed to fetch');
  }

  const terms = ['(Peeps)'];

  try {
    const { tableHead, tableBody } = htmlToRows(html, (row: any) => {
      return terms.some((term) => row.toString().includes(term));
    });

    const title = `Börsihai edetabel ${dateString} 07:00 — <https://www.lhv.ee/et/hai#edetabel>\n\n`;
    const result =
      title + '```\n' + formatTable(tableHead, tableBody) + '\n```';

    interaction.reply(result);
  } catch (error: any) {
    interaction.reply('Failed to parse');
  }
}
