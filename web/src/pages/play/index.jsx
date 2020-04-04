import React from "react";
import PokerTable from "pages/play/components/table/pokerTable";
import PokerActions from "pages/play/components/pokerActions";
import { Footer } from "pages/play/components/footer";
import SocketProvider from "pages/play/components/socket_context/socketProvider";
import JoinGameNewPlayer from "pages/play/components/table/joinGameNewPlayer";

const PlayPage = () => {
  return (
    <SocketProvider>
      <JoinGameNewPlayer />
      <PokerActions />
      <Footer />
    </SocketProvider>
  );
};

export default PlayPage;
