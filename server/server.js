const express = require('express');
const app = express();
const server = require('http').createServer(app); // Create a new HTTP server
const io = require('socket.io')(server, {cors: {origin: '*'}}); // Create a new Socket.IO server and attach it to the HTTP server

const Players = require('./classes/Players.js')
const Rooms = require('./classes/Rooms.js')
const Maps = require('./classes/Maps.js')



const lobbies = [];
const players = [];



// Handle Socket.IO connections
io.on('connection', (socket) => {
    console.log('A new client connected');

    // create new room
    const roomId = '123'
    const mapId = 'MAP_01'

    // get map data
    const mapData = Maps.getMapDataById(mapId)
    const newRoomData = {
        roomId: roomId,
        round: 1,
        difficulty: 1,
        mapData: mapData,
    }
    Rooms.createRoom(newRoomData)

    // add player to room
    const newPlayerData = {
        socketId: socket.id,
        roomId: roomId,
        health: 100,
        money: 0,
        coords: {x: 0, y: 0, z: 0}
    }
    Players.addPlayer(newPlayerData)

    // // create new player
    // Players.addPlayer(newPlayerData)


    // join room
    socket.join(roomId)
    socket.roomId = roomId

    // Handle disconnections
    socket.on('disconnect', () => {
        console.log('A client disconnected');

        // remove player
        Players.removePlayer(socket.id)

        // count players left in room
        const countPlayersInRoom = Players.countPlayersInRoom(socket.roomId)
        console.log(countPlayersInRoom)

        // delete room if no players left in it
        if (countPlayersInRoom == 0) {
            // delete room
            Rooms.deleteRoom(socket.roomId)
        }
    });
});







setInterval(() => {
    // update rooms
    for (const roomData of Rooms.getRooms()) {
        const roomID = roomData.roomId
        // get room players
        const roomPlayers = Players.getPlayersInRoom(roomID)

        // put room players into data
        const newRoomData = {
            ...roomData,
            players: roomPlayers
        }
        io.to(roomID).emit('updateRoomData', roomData)
    }
}, 1000)




server.listen(8003, () => {
    console.log('Server listening on port 8003');
});