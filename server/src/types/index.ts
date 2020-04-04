export type TableSettings = {
  bigBlind: number;
  buyIn: number;
  smallBlind: number;
};

export enum SeatState {
  SEATED = "seated",
  STANDING = "standing"
}

export type Player = {
  currentBetSize: number | null;
  holeCards: string | null;
  isDealer: boolean;
  isFolded: boolean;
  isSmallBlind: boolean;
  isBigBlind: boolean;
  seatState: SeatState;
  stackSize: number;
  userId: string;
};

export type Players = {
  // Keyed on the seat number, 1-9.
  [key in string]: Player;
};

export type BetSizes = {
  currentBetSize: number;
  minBet: number;
  halfPot: number;
  pot: number;
};

export enum Turn {
  PREFLOP = "preflop",
  FLOP = "flop",
  TURN = "turn",
  RIVER = "river"
}

export type Board = {
  flopCard1: string | null;
  flopCard2: string | null;
  flopCard3: string | null;
  turnCard: string | null;
  riverCard: string | null;
  turn: Turn;
};

export type Game = {
  betSizes: BetSizes;
  board: Board;
  potSize: number;
  // Player number whose turn it is.
  whoseTurn: number;
};

export type Table = {
  game: Game | null;
  hasStarted: boolean;
  players: Players;
  settings: TableSettings;
};
