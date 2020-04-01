import React from "react";
import styles from "./styles.module.scss";

const BetInput = ({ isMyTurn, currentBet, setCurrentBet, minBet, allIn }) => {
  const handleInputChange = e => {
    const betAmount = e.target.value;
    setCurrentBet(betAmount);
  };

  return (
    <form className={styles.betInputContainer}>
      <label>
        <input
          className={styles.betInput}
          type="number"
          disabled={!isMyTurn}
          value={currentBet}
          onKeyPress={handleInputChange}
          onChange={handleInputChange}
          min={minBet}
          max={allIn}
        />
      </label>
    </form>
  );
};

export default BetInput;
