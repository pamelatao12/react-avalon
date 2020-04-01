import React, { useState } from "react";
import styles from "pages/play/components/table/player.module.css";
import Card from "pages/play/components/table/card";
import classNames from "classnames";

const Player = ({
  name,
  pic,
  position,
  vote,
  character,
  isGoingOnMission,
  myTurnToPickMission,
  showCharacter,
  showVotes
}) => {
  // const style = cardSet[0][0] === "" ? { visibility: "hidden" } : {};

  return (
    <div className={styles["playerProfile" + position]}>
      {/*<div
        className={classNames(
          isDealer
            ? styles.dealerChip
            : isSmallBlind
            ? styles.sBChip
            : isBigBlind
            ? styles.bBChip
            : styles.noChip,
          isDealer || isSmallBlind || isBigBlind
            ? styles["hasChip" + position]
            : styles.noChip
        )}
      >
        {isDealer ? "D" : isSmallBlind ? "SB" : isBigBlind ? "BB" : ""}
      </div> */}
      <div
        className={classNames(
          styles["playerBet" + position],
          vote === ""
            ? styles.noVote
            : showVotes
            ? styles["playerVotes" + vote]
            : styles.hideVote
        )}
      >
        {vote}
      </div>

      <div className={styles["playerCards" + position]}>{isGoingOnMission}</div>
      <div
        className={
          myTurnToPickMission
            ? styles.playerDetailsWrapperOnTurn
            : styles.playerDetailsWrapper
        }
      >
        <img className={styles.circleCrop} src={pic} alt="user" />
        <div className={styles.playerCharacterWrapper}>
          <div className={styles.playerDetails}>{name}</div>
          <div
            className={classNames(
              showCharacter ? styles.hideCharacter : styles.playerCharacter,
              character === "Resistance" ||
                character === "Merlin" ||
                character === "Percival"
                ? styles.goodCharacter
                : styles.evilCharacter
            )}
          >
            {character}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
