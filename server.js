const http = require('http');
const express = require('express');
const RED = require('node-red');

const app = express();
const server = http.createServer(app);

const settings = {
    httpAdminRoot: "/admin",
    httpNodeRoot: "/ui",
    userDir: "./.nodered/",
    flowFile: "./.nodered/flows.json",
    editorTheme: {
        projects: {
            enabled: false
        }
    },
    functionGlobalContext: {
        CLAUDE_KEY : process.env.CLAUDE_KEY,
    } // This makes function nodes work
};

RED.init(server, settings);

app.use(settings.httpAdminRoot, RED.httpAdmin);
app.use(settings.httpNodeRoot, RED.httpNode);

server.listen(process.env.PORT || 1880, () => {
    console.log(`Server running on port ${process.env.PORT || 1880}`);
});

RED.start();
