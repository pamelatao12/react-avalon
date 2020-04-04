export type PlayerActionType = 'check' | 'fold' | 'bet' | 'raise' 

export interface PlayerAction {
  actionType: PlayerActionType,
  player: string,
  amount: number,
  turnCount: number
}

export as namespace Player