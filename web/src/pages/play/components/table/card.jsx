import React from "react";
import classNames from "classnames";
import styles from "pages/play/components/table/card.module.css";

const Card = ({ number, gameState }) => {
  return (
    <div
      className={classNames(
        gameState === "startGame" ? styles.emptyCard : styles.closeHand
      )}
    >
      <p>{number}</p>
    </div>
  );
};

export default Card;
