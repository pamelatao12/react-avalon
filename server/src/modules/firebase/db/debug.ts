import express from "express";
import {
  AddEventListenerController as AddEventListener,
  GetStateController as GetState
} from "./ReadDatabaseController";
import { setDatabase } from "./WriteDatabaseController";
import database, { db } from "./";

export const debugDatabase = () => {
  // TODO: delete later. testing read and write methods to firebase db
  const tableSetup = {
    player_count: 6,
    settings: {
      small_blind: 0.2,
      big_blind: 0.4,
      buy_in_min: 10,
      buy_in_max: 20
    },
    table_name: "degens at it again"
  };
  const tablePath = "server/poker/table";
  AddEventListener("value", "server");
  setDatabase(tablePath, tableSetup);
  GetState("server/poker/table");
  // console should log tableSetup
};

/**
 * Returns an object containing a current view of the database.
 */
export const debugViewDatabase = (
  req: express.Request,
  res: express.Response
) => {
  const table = db.ref();
  table.once("value", snapshot => {
    const value = snapshot.val();
    res.send(value).status(200);
  });
};

export const debugClearAll = (req: express.Request, res: express.Response) => {
  database.clearAll().then(() => {
    res.send().status(204);
  });
};
