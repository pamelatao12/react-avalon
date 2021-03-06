import React, { useState } from "react";
import styles from "pages/play/components/table/tableCards.module.css";
import Card from "pages/play/components/table/card";

const TableCards = ({ missionDetails, gameState }) => {
  return (
    <div className={styles.cardSet}>
      {missionDetails.map((num, i) => (
        <Card key={i} number={num} gameState={gameState} />
      ))}
    </div>
  );
};

export default TableCards;
