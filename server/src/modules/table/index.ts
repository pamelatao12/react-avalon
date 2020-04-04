import database from "modules/firebase/db";
import { Table, TableSettings } from "types";
import { initializeGame } from "modules/game";
import { getNumPlayers } from "modules/player";

/**
 * Default table settings.
 */
const MAX_PLAYER_COUNT = 9;
const SETTINGS_SMALL_BLIND = 10;
const SETTINGS_BIG_BLIND = 20;
const SETTINGS_BUY_IN = 2000;

export const createTable = async () => {
  const tableSettings: TableSettings = {
    buyIn: SETTINGS_BUY_IN,
    bigBlind: SETTINGS_BIG_BLIND,
    smallBlind: SETTINGS_SMALL_BLIND
  };

  const table: Table = {
    game: null,
    hasStarted: false,
    players: {},
    settings: tableSettings
  };

  const key = await database.push("tables", table);
  return { [key]: table };
};

export const listTables = () => {
  return database.read("tables");
};

export const getTable = (tableId: string = "-M33QUXuHYBlHzFJjZ1V") => {
  return database.read(`tables/${tableId}`);
};

/**
 * Starts the game, only if there are at least 2 players.
 */
export const startGame = async (tableId: string = "-M33QUXuHYBlHzFJjZ1V") => {
  // TODO: Transactionally start the game if it hasn't already started.
  // TODO: This is not trivial because we have to initiate the game state as
  // well.

  // TODO: Unclear why getTable here returns a snapshot instead of a val.
  const table: Table = (await getTable(tableId)).val();

  if (table.hasStarted || getNumPlayers(table.players) < 2) {
    return;
  }

  await database.setInTransaction(`tables/${tableId}`, (currentData: Table) => {
    if (
      currentData &&
      (currentData.hasStarted || getNumPlayers(table.players) < 2)
    ) {
      return;
    }

    // TODO: Return this value once it is fully completed.
    initializeGame(table);
    return currentData;
  });
};
