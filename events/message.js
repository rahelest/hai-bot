const clean = require("../commands/clean");
const kick = require("../commands/kick");

module.exports = (client, message) => {
  if (message.content.startsWith("!kick")) {
    return kick(message);
  }
  if (message.content.startsWith("!clean")) {
    return clean(message);
  }
};
