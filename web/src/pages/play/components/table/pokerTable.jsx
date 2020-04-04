import React, { useState, useContext } from "react";
import styles from "pages/play/components/table/pokerTable.module.css";
import TableCards from "pages/play/components/table/tableCards";
import Player from "pages/play/components/table/player";
import classNames from "classnames";
import _ from "lodash";
// import { addPlayerToPositionOnTable } from "pages/play/components/socket_context/emit";
import SocketContext from "pages/play/components/socket_context/socketContext";

const PokerTable = ({ data }) => {
  const [winner, setWinner] = useState("Resistance");
  const [numPlayers, setNumPlayers] = useState(9);
  const [showVotes, setShowVotes] = useState(false);
  const [showCharacter, setShowCharacter] = useState(true);

  const [gameState, setGameState] = useState("startGame");
  const [missionDetails, setMissionDetails] = useState([
    [2, 3, 2, 3, 3] /* for 5 players */,
    [2, 3, 4, 3, 4] /* for 6 players */,
    [2, 3, 3, 4, 4] /* for 7 players */,
    [3, 4, 4, 5, 5] /* for 8, 9, 10 players */,
    [3, 4, 4, 5, 5] /* for 8, 9, 10 players */,
    [3, 4, 4, 5, 5] /* for 8, 9, 10 players */
  ]);
  /*
  const [players, setPlayers] = useState([
    {
      name: "Pamela",
      pic: "./yay.jpg",
      position: 1,
      vote: "Approve",
      character: "Resistance",
      isGoingOnMission: true,
      myTurnToPickMission: false,
      isLadyOfTheLake: true,
      showCharacter: true
    },
    {
      name: "David",
      pic: "./yay2.jpg",
      position: 2,
      vote: "Approve",
      character: "Resistance",
      isGoingOnMission: true,
      myTurnToPickMission: false,
      isLadyOfTheLake: false,
      showCharacter: true
    },
    {
      name: "Christine",
      pic: "./yay3.jpg",
      position: 3,
      vote: "Approve",
      character: "Resistance",
      isGoingOnMission: true,
      myTurnToPickMission: true,
      isLadyOfTheLake: false,
      showCharacter: true
    },
    {
      name: "Eric",
      pic: "./yay4.jpg",
      position: 4,
      vote: "Approve",
      character: "Morgana",
      isGoingOnMission: false,
      myTurnToPickMission: false,
      isLadyOfTheLake: false,
      showCharacter: true
    },
    {
      name: "Angela",
      pic: "./yay5.jpg",
      position: 5,
      vote: "Reject",
      character: "Resistance",
      isGoingOnMission: false,
      myTurnToPickMission: false,
      isLadyOfTheLake: false,
      showCharacter: true
    },
    {
      name: "Renee",
      pic: "./yay6.jpg",
      position: 6,
      vote: "Approve",
      character: "Resistance",
      isGoingOnMission: false,
      myTurnToPickMission: false,
      isLadyOfTheLake: false,
      showCharacter: true
    },
    {
      name: "P2",
      pic: "./yay7.jpg",
      position: 7,
      vote: "Approve",
      character: "Resistance",
      isGoingOnMission: false,
      myTurnToPickMission: false,
      isLadyOfTheLake: false,
      showCharacter: true
    },
    {
      name: "P3",
      pic: "./yay8.jpg",
      position: 8,
      vote: "Approve",
      character: "Resistance",
      isGoingOnMission: false,
      myTurnToPickMission: false,
      isLadyOfTheLake: false,
      showCharacter: true
    },
    {
      name: "Jenny",
      pic: "./yay9.jpg",
      position: 9,
      vote: "Approve",
      character: "Assassin",
      isGoingOnMission: false,
      myTurnToPickMission: false,
      isLadyOfTheLake: false,
      showCharacter: true
    }
  ]);
  */

  const tableAmount = 50.25;
  // how to get total table amount?

  console.log("data");

  console.log(data);
  console.log("data.playerData");
  console.log(data.playerData);
  const drawPlayers = _.times(9).map(i => {
    console.log("i am in drawPlayers");
    console.log(i);
    if (data.playerData[i] === undefined || data.playerData[i].name === "") {
      return (
        <Player
          name=""
          pic={`./yay${i + 1}.jpg`}
          position={i}
          vote="Approve"
          character=""
          isGoingOnMission={false}
          myTurnToPickMission={false}
          showCharacter={false}
          showVotes={false}
          key={i}
        />
      );
    } else {
      return (
        <Player
          name={data.playerData[i].name}
          pic={`./yay${i + 1}.jpg`}
          position={data.playerData[i].position}
          vote={data.playerData[i].vote}
          character={data.playerData[i].character}
          isGoingOnMission={data.playerData[i].isGoingOnMission}
          myTurnToPickMission={data.playerData[i].myTurnToPickMission}
          showCharacter={showCharacter}
          showVotes={showVotes}
          key={i}
        />
      );
    }
  });

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.players}>{drawPlayers}</div>
      <div className={styles.table}>
        <TableCards
          missionDetails={missionDetails[numPlayers - 5]}
          gameState={gameState}
        />
        <div
          className={classNames(
            winner === "" ? styles.hideWinner : styles.tableAmount
          )}
        >
          {winner} wins!
        </div>
      </div>
    </div>
  );
};

export default PokerTable;
