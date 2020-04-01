import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from './common/components/ProtectedRoute';
import SignedOutPage from "pages/signedOut";
import PlayPage from "pages/play";
import PokerActions from "pages/play/components/pokerActions";

const App = () => {
  return (
    <Router>
      <Switch>
        <ProtectedRoute exact path="/play">
          <PlayPage />
        </ProtectedRoute>

        <Route exact path="/poker-actions">
          <PokerActions />
        </Route>
        
        <Route path="*">
          <SignedOutPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
