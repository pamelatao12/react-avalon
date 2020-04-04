import React, { useContext } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import SocketContext from "pages/play/components/socket_context/socketContext";

const Button = ({ action, isMyTurn, setIsMyTurn, stage, gameState }) => {
  const { data, buttonClicked } = useContext(SocketContext);

  const disabled = gameState === stage && isMyTurn ? "" : "disabled";

  return (
    <button
      className={classNames(
        styles[`${action.toLowerCase().replace(/\s/g, "")}`],
        styles[`${disabled}`]
      )}
      disabled={!isMyTurn}
      onClick={() => {
        setIsMyTurn(false);
        buttonClicked(action);
      }}
    >
      <span>{action}</span>
    </button>
  );
};

export default Button;
