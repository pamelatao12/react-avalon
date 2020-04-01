import React, { useState } from "react";
import styles from "./styles.module.scss";
import Button from "./button";
import Bets from "./bets";
import BetInput from "./betInput";

const PokerActions = () => {
  //placeholder states
  const [isMyTurn, setIsMyTurn] = useState(true);
  const [position, setPosition] = useState(1);
  const [startGame, setStartGame] = useState(true);
  const [gameState, setGameState] = useState("voteMission");
  /* gameState options: startGame, pickPlayers, voteMission, goOnMission,
  ladyOfTheLake, assassinate */

  return (
    <div className={styles.pokerActionsContainer}>
      <div className={styles.pokerActions}>
        <div className={styles.betBtns}>
          <Button
            action="Start Game"
            isMyTurn={isMyTurn}
            setIsMyTurn={setIsMyTurn}
            stage="startGame"
            gameState={gameState}
          />
          <Button
            action="Pick"
            stage="pickPlayers"
            isMyTurn={isMyTurn}
            setIsMyTurn={setIsMyTurn}
          />
          <Button
            action="Approve"
            isMyTurn={isMyTurn}
            setIsMyTurn={setIsMyTurn}
            stage="voteMission"
            gameState={gameState}
          />
          <Button
            action="Reject"
            isMyTurn={isMyTurn}
            setIsMyTurn={setIsMyTurn}
            stage="voteMission"
            gameState={gameState}
          />
          <Button
            action="Succeed Mission"
            isMyTurn={isMyTurn}
            setIsMyTurn={setIsMyTurn}
            stage="goOnMission"
            gameState={gameState}
          />
          <Button
            action="Fail Mission"
            isMyTurn={isMyTurn}
            setIsMyTurn={setIsMyTurn}
            stage="goOnMission"
            gameState={gameState}
          />
          <Button
            action="Lady of the Lake"
            isMyTurn={isMyTurn}
            setIsMyTurn={setIsMyTurn}
            stage="ladyOfTheLake"
            gameState={gameState}
          />
        </div>
      </div>
    </div>
  );
};

export default PokerActions;
