const fetch = require('node-fetch');

module.exports = mainMessage => {
    // Get all messages
    mainMessage.channel.fetchMessages()
        .then(async messages => {
            const links = Array.from(messages.values()).filter(isLink);
            const pingResults = await Promise.all(links.map(isDeadLink));
            const deadLinks = zip(links, pingResults)
                .filter(([, result]) => result)
                .map(([link,]) => link);

            if (deadLinks.length) {
                const linkList = deadLinks
                    .map(({content}) => content)
                    .join("\n * ");
                mainMessage.reply("Here are some 404 links: \n * " + linkList);
            }
            else {
                mainMessage.reply("Did not find any 404 links.");
            }
        });
};

function isLink({content}) {
    return (/^https?:\/\/.+$/.test(content));
}

async function isDeadLink({content}) {
    const response = await fetch(content);
    const {status} = await response;
    return status === 404;
}

function zip(a, b) {
    return a.map(function (e, i) {
        return [e, b[i]];
    });
}
