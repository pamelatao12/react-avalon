import React from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";

const Button = ({ action, isMyTurn, setIsMyTurn, stage, gameState }) => {
  const disabled = gameState === stage && isMyTurn ? "" : "disabled";

  return (
    <button
      className={classNames(
        styles[`${action.toLowerCase().replace(/\s/g, "")}`],
        styles[`${disabled}`]
      )}
      disabled={gameState === stage && !isMyTurn}
      onClick={() => setIsMyTurn(false)}
    >
      <span>{action}</span>
    </button>
  );
};

export default Button;
