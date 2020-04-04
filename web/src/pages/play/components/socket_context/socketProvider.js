import React, { useState, useEffect } from "react";
import SocketContext from "pages/play/components/socket_context/socketContext";
import socketIOClient from "socket.io-client";

const SocketProvider = props => {
  const [data, setData] = useState(undefined);
  const [socket, setSocket] = useState(undefined);

  useEffect(() => {
    const socket = socketIOClient("http://127.0.0.1:4000");
    socket.on("FromAPI", setData);
    setSocket(socket);
  }, []);

  // emit events
  const addNewPlayer = player => {
    socket.emit("addNewPlayer", { name: player, id: socket.id });
  };

  /*
  const joinGame = () => {
      const socket = socketIOClient("http://127.0.0.1:4000");

      socket.on("FromAPI", setData);
      // setSocket.
  };
  */

  // {
  //   data: your data,
  //   joinGame: joinGame
  // }
  console.log(data);
  if (!socket || !data) return null;

  return (
    <SocketContext.Provider value={{ data, addNewPlayer }}>
      {props.children}
    </SocketContext.Provider>
  );
};
export default SocketProvider;
