var Commands = require('./modules/CommandList');
var GameServer = require('./GameServer');
var AsyncConsole = require('asyncconsole');
var showConsole = true;

process.argv.forEach(function(val) {
    if (val == "--noconsole") showConsole = false;
});

var gameServer;
startServer();

function startServer() {
    gameServer = new GameServer();
    gameServer.config.serverPort = process.env.PORT || 3000; 
    gameServer.start();

    gameServer.shutdownHandle = function() {
        process.exit(0);
    };
    gameServer.restartHandle = function(timeout) {
        setTimeout(function() {
            gameServer.socketServer.close();
            gameServer.httpServer.close();
            startServer();
        }, timeout);
    };
}

if (showConsole) {
    setTimeout(function() {
        var input = new AsyncConsole('> ', function(command) {
            parseCommands(command);
        });
    }, 200);
}

function parseCommands(str) {
    gameServer.log.onCommand(str);
    if (str === '') return;
    var split = str.split(" ");
    var first = split[0].toLowerCase();
    gameServer.pluginHandler.executeCommand(first, split);
}
