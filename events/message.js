const clean = require("../commands/clean");
const kick = require("../commands/kick");
const postLeaderBoard = require("../commands/postLeaderBoard");

module.exports = (client, message) => {
  if (message.content.startsWith("!kick")) {
    return kick(message);
  }

  if (message.content === "!clean") {
    return clean(message);
  }

  if (message.content === "!hai") {
    return postLeaderBoard(message);
  }
};
