import { Game, Player, Table, Turn } from "../../types";

export const initializeGame = (table: Table): Table => {
  table.hasStarted = true;
  const whoseTurn = initializePlayers(table);
  table.game = newGame(table, whoseTurn);
  console.log(table);
  return table;
};

const initializePlayers = (table: Table): number => {
  let seats = {} as { [key in number]: { player: Player; seatNumber: number } };
  let count = 0;

  for (let i = 1; i <= 9; i++) {
    const player: Player | null = table.players[`seat${i}`];
    if (player) {
      seats[count++] = { player, seatNumber: i };
    }
  }

  // TODO: Loop through to set values instead of assuming 4 players exist.
  seats[0].player.isDealer = true;
  seats[1].player.isSmallBlind = true;
  seats[2].player.isBigBlind = true;

  return seats[3].seatNumber;
};

const newGame = (table: Table, whoseTurn: number): Game => {
  const { smallBlind, bigBlind } = table.settings;
  // These are put into the pot automatically.
  const potSize = smallBlind + bigBlind;

  return {
    betSizes: {
      currentBetSize: bigBlind,
      minBet: 2 * bigBlind,
      halfPot: potSize / 2,
      pot: potSize
    },
    board: {
      flopCard1: null,
      flopCard2: null,
      flopCard3: null,
      riverCard: null,
      turn: Turn.PREFLOP,
      turnCard: null
    },
    potSize,
    whoseTurn
  };
};
