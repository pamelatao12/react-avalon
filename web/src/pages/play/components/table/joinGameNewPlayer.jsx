import React, { useState, useContext } from "react";
import styles from "pages/play/components/table/joinGameNewPlayer.module.css";
import classNames from "classnames";
import PokerTable from "pages/play/components/table/pokerTable";
import { addNewPlayer } from "pages/play/components/socket_context/emit";
import SocketContext from "pages/play/components/socket_context/socketContext";

const JoinGameNewPlayer = () => {
  const [input, setInput] = useState({
    name: ""
  });
  // This is the data that is read from the server.

  const { data, addNewPlayer } = useContext(SocketContext);

  const onInputChange = e => {
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value
    });
  };

  // Handle change age button.
  const addNewPlayerClick = () => {
    // Send server info on new player joining.
    console.log("new player added called");
    addNewPlayer(input.name);
  };

  return (
    <div className={styles.joinGameWrapper}>
      <input
        name="name"
        className={styles.gameUsername}
        type="text"
        placeholder="Your name"
        onChange={onInputChange}
        value={input.name}
      />
      <button className={styles.joinGameBtn} onClick={addNewPlayerClick}>
        Join
      </button>
      <PokerTable data={data} />
    </div>
  );
};

export default JoinGameNewPlayer;
