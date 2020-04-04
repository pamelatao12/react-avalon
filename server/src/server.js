// Configure this current directory as the root path for imports.
require("app-module-path/register");

import express from "express";
import http from "http";
import socketIo from "socket.io";
import router from "modules/router";
import { PORT } from "config";
import _ from "lodash";

// Set up app with our own router.
const app = express();
app.use(router);
// Prettify JSON responses.
app.set("json spaces", 2);

const server = http.createServer(app);
const io = socketIo(server);

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// type Person = {
//   name: "",
//   position: numPlayers,
//   pic: "./yay.jpg",
//   vote: "Approve",
//   character: "Resistance",
//   isGoingOnMission: true,
//   myTurnToPickMission: false,
//   isLadyOfTheLake: true,
//   showCharacter: true
// };
/*
playerDetails = {
  0 {
    person: Person
  }
];
*/

const getPlayerDetails = () => {
  // in some function
  const result = {};
  playerIds.forEach(obj => {
    result[obj.position] = obj.person;
  });
  return result;
};

let playerIds = [];
let numPlayers = 0;
let gameDetails = {
  gameDetails: "",
  numPlayers: numPlayers
};

// playerIds:
// [
//   {
//     socketId: dskjf
//     name: "david",
//     age: "12"
//   },
//   "pamelaId": {
//     name: "pamela",
//     age: "5"
//   },
// ]
//
// Object.values(playerIds)
//
// [
//   {name:david...}, {name:pamela...}
// ]

// result =
//
// {
//   0: {Person}
//   1: {Person}
// }

// {
//   "davidId": {
//     name: "david",
//     age: "unknown"
//   },
//   "pamelaId": {
//     name: "pamela",
//     age: "unknown"
//   },
// }

// This sends out data to each connected player with customized data (your age is
// returned, but others are set to "unknown").
//
// Action is a param just so on frontend we can see who did what.
const sendOutData = action => {
  // First deep copy it so we don't actually modify socketIds. If this was
  // reading from a database, it would be okay to modify.
  const filteredplayerIds = _.cloneDeep(playerIds);
  /*
  // Go through each and set age to unknown.
  Object.keys(filteredplayerIds).forEach(
    key => (filteredplayerIds[key].position = 0)
  );
*/
  // Loop through keys in socketIds.
  Object.keys(filteredplayerIds).forEach(socketId => {
    const data = {
      id: socketId,
      dataForClient: filteredplayerIds,
      action: action
    };

    // Send this data out to the single socketId (acts like a private channel).
    io.to(socketId).emit("FromAPI", getPlayerDetails());
  });
};

const addPlayer = data => {
  for (let i = 0; i < playerIds.length; i++) {
    if (playerIds[i].person.name == "") {
      playerIds[i].person.name = data.name;
      break;
    }
  }

  io.to("game").emit("FromAPI", {
    gameDetails: gameDetails,
    playerData: getPlayerDetails()
  });
};

const handleButtonClick = action => {
  if (action === "Start Game") {
    // todo
    assignRoles();
    fillInMissions();
    advanceGameState();
    makePlayerPickMission();

    io.to("game").emit("FromAPI", {
      gameDetails: gameDetails,
      playerData: getPlayerDetails()
    });
  }
};

io.on("connection", socket => {
  console.log("New client connected");
  socket.join("game");

  // Get name from client.

  // Add them to our mapping.
  playerIds.push({
    socketId: socket.id,
    position: numPlayers,
    person: {
      name: "",
      position: numPlayers,
      pic: "./yay.jpg",
      vote: "Approve",
      character: "Resistance",
      isGoingOnMission: true,
      myTurnToPickMission: false,
      showVotes: false,
      showCharacter: false
    }
  });

  gameDetails.gameState = "startGame";
  console.log(gameDetails);

  io.to("game").emit("FromAPI", {
    gameDetails: gameDetails,
    playerData: getPlayerDetails()
  });
  numPlayers++;

  // Send out data since someone joined.
  // sendOutData(`${socket.id} joined`);

  socket.on("addNewPlayer", data => {
    addPlayer(data);
  });

  socket.on("buttonClicked", action => {
    handleButtonClick(action);
  });

  // Handler for when someone calls "changeAge" action.
  socket.on("changeAge", data => {
    // // Update storage (imagine changing database).
    // socketIds[socket.id].age = data.age;

    // const OBJ = myfunction(...);

    // Now tell everyone the new state of the world.
    sendOutData(`${playerIds[socket.id].name} changed their age`);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    // Remove user from this socket.
    delete playerIds[socket.id];
  });

  // Add new user to game
  var addedUser = false;

  /*
  // when the client emits 'new message', this listens and executes
  socket.on("new message", function(data) {
    // we tell the client to execute 'new message'
    socket.broadcast.emit("new message", {
      username: socket.username,
      message: data
    });
  });
*/

  /*
  // when the client emits 'add user', this listens and executes
  socket.on("add user", username => {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    ++numPlayers;
    socket.position = numPlayers;
    addedUser = true;
    socket.emit("login", {
      numUsers: numUsers
    });

    console.log("new user joined: " + socket.username);
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit("user joined", {
      username: socket.username,
      position: socket.position,
      numPlayers: numPlayers
    });
  });
  */

  /*
  // when the client emits 'typing', we broadcast it to others
  socket.on("typing", function() {
    socket.broadcast.emit("typing", {
      username: socket.username
    });
  });
*/

  /*
  // when the client emits 'stop typing', we broadcast it to others
  socket.on("stop typing", function() {
    socket.broadcast.emit("stop typing", {
      username: socket.username
    });
  });
  */

  /*
  // when the user disconnects.. perform this
  socket.on("disconnect", function() {
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit("user left", {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
  */

  /*
  //when the client requests to start a Game
  socket.on("startGame", () => {
    var gameId = (Math.random() + 1).toString(36).slice(2, 18);
    console.log("Game Created by " + socket.username + " w/ " + gameId);
    gameCollection.gameList.gameId = gameId;
    /*gameCollection.gameList.gameId.open = true;
    gameCollection.totalGameCount++;
*/
  /*
    io.emit("gameStarted", {
      username: socket.username,
      gameId: gameId,
      numPlayers: numPlayers
    });

  });*/
});
