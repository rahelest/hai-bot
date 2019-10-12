const fetch = require("node-fetch");
const parser = require("node-html-parser");

module.exports = async mainMessage => {

  mainMessage.delete();

  const date = new Date().toDateString();

  const response = await fetch("https://www.lhv.ee/index/index.cfm?l3=et&id=10182");
  const html = await response.text();

  const parsed = parser.parse(html);
  const table = parsed.querySelector(".data");
  const rows = table.querySelector("tbody");
  const teamRows = rows.childNodes.filter((row) => {
    return row.toString().includes("Elon's Musk");
  });


  const stringNodes = teamRows.map((row) => {
    return row.structuredText.replace(/\n/g, " ");
  });


  const data = stringNodes.join("\n");

  mainMessage.reply(`Börsihai edetabel ${date}: \n${data}`);
};