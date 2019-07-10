# Link cleaner bot

Read this [article](https://medium.freecodecamp.org/how-to-create-a-discord-bot-under-15-minutes-fb2fd0083844) to fully understand what this is about.

Forked from [Bot example repo](https://github.com/thomlom/discord-bot-example).

Aim is to detect messages that only contain a 404 link and delete them.

## Getting started

1. Grab a token on [Discord's developer portal](https://discordapp.com/developers/applications)
2. Create a `.env` file and add a `BOT_TOKEN` environmental variable whose value is the token above.
3. Run `yarn install`
4. Run `yarn dev`

### Changing token

Generated at [Discord's developer portal](https://discordapp.com/developers/applications).
Update `BOT_TOKEN` field in `.env` file.