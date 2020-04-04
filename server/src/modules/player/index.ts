import database from "../firebase/db";
import { Player, Players, SeatState } from "../../types";

/**
 * TODO: Remove default values once we are ready to accept user requests. These
 * were added to make testing easier.
 */
const newPlayer: Player = {
  currentBetSize: null,
  holeCards: null,
  isBigBlind: false,
  isDealer: false,
  isFolded: true,
  isSmallBlind: false,
  seatState: SeatState.SEATED,
  stackSize: 2000,
  userId: "davidvcho@gmail.com"
};

export const sitAtTable = async (
  tableId: string = "-M33QUXuHYBlHzFJjZ1V",
  seatNumber: number = 1
) => {
  const committed = await database.setInTransaction(
    `tables/${tableId}/players/seat${seatNumber}`,
    (currentData: any) => {
      // Seat is already taken.
      if (currentData) {
        return;
      }

      return newPlayer;
    }
  );

  return committed ? newPlayer : undefined;
};

/**
 * TODO: Check if player is currently folded.
 */
export const standUp = async (
  tableId: string = "-M33QUXuHYBlHzFJjZ1V",
  seatNumber: number = 1
) => {
  const committed = await database.setInTransaction(
    `tables/${tableId}/players/${seatNumber}/seatState`,
    (currentData: any) => {
      if (currentData === SeatState.SEATED) {
        return SeatState.STANDING;
      }
    }
  );
  return committed ? SeatState.STANDING : null;
};

/**
 * TODO: Check if player is currently folded.
 */
export const leaveTable = async (
  tableId: string = "-M33QUXuHYBlHzFJjZ1V",
  seatNumber: number = 1
) => {
  const committed = await database.setInTransaction(
    `tables/${tableId}/players/${seatNumber}`,
    () => null
  );
  // return true if successfully cleared the seat
  return committed === null;
  /**
   * TODO: Remove player from table.
   */
};

export const getNumPlayers = (players: Players) => {
  // TODO: Compute number of players.
  return 4;
};
