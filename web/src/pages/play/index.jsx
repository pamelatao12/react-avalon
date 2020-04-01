import React from "react";
import PokerTable from "pages/play/components/table/pokerTable";
import PokerActions from "pages/play/components/pokerActions";
import { Footer } from "pages/play/components/footer";

const PlayPage = () => {
  return (
    <div>
      <PokerTable />
      <PokerActions />
      <Footer />
    </div>
  );
};

export default PlayPage;
