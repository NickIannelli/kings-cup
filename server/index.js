"use strict";
exports.__esModule = true;
var http_1 = require("http");
var express_1 = require("express");
var cors_1 = require("cors");
var colyseus_1 = require("colyseus");
var monitor_1 = require("@colyseus/monitor");
var room_1 = require("./KingsCup/room");
// import socialRoutes from "@colyseus/social/express"
var port = Number(process.env.PORT || 2567);
var app = express_1["default"]();
app.use(cors_1["default"]());
app.use(express_1["default"].json());
var server = http_1["default"].createServer(app);
var gameServer = new colyseus_1.Server({
    server: server
});
// register your room handlers
gameServer.define('kings_cup', room_1.KingsCupRoom);
/**
 * Register @colyseus/social routes
 *
 * - uncomment if you want to use default authentication (https://docs.colyseus.io/authentication/)
 * - also uncomment the import statement
 */
// app.use("/", socialRoutes);
// register colyseus monitor AFTER registering your room handlers
app.use('/colyseus', monitor_1.monitor(gameServer));
gameServer.listen(port);
console.log("Listening on ws://localhost:" + port);
