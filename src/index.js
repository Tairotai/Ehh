var Commands = require('./modules/CommandList');
var GameServer = require('./GameServer');
var AsyncConsole = require('asyncconsole');

var showConsole = true;

console.log("[Game] Ogar - An open source Agar.io server implementation");

process.argv.forEach(function(val) {
    if (val == "--noconsole") {
        showConsole = false;
    } else if (val == "--help") {
        console.log("Proper Usage: node index.js");
        console.log("    --noconsole         Disables the console");
        console.log("    --help              Help menu.");
        console.log("");
    }
});

var gameServer;
startServer();

function startServer() {
    gameServer = new GameServer();
    
    // IMPORTANTE: Render nos da el puerto aquí
    gameServer.config.serverPort = process.env.PORT || 3000; 
    
    gameServer.start();

    gameServer.shutdownHandle = function() {
        process.exit(0);
    };
    gameServer.restartHandle = function(timeout) {
        gameServer.restartScheduled = new Date();
        gameServer.restartAt = new Date(Date.now() + timeout);
        gameServer.restartId = setTimeout(function() {
            gameServer.socketServer.close();
            gameServer.httpServer.close();
            gameServer.gameServer = null;
            if (global.gc) global.gc(); 
            process.stdout.write("\u001b[2J\u001b[0;0H"); 
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
