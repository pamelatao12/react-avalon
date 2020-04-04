import { db } from "./";

// ref.on takes in a callback that is triggered once with initial state and again every time the data changes (not 100% sure if that includes when changes happen outside of reference tree)
// the callback is passed a snapshot containing all the data from that reference node, including all descendants
// one use case for this api is to determine subsequent actions to be taken after a transaction (action/move) in the db has resolved
type EventType =
  | "value"
  | "child_added"
  | "child_removed"
  | "child_changed"
  | "child_moved";

export const AddEventListenerController = (
  eventType: EventType,
  path: string
): void => {
  const currRef = db.ref(path);
  currRef.on(
    eventType,
    (snapshot: any | null, prevChildKey?: string | undefined) => {
      // logging what's happening
      console.log("the following event type happened: ", eventType);
      console.log("and this is how our state looks now", snapshot.val());
      if (prevChildKey)
        console.log("if we need the previous child key, it's: ", prevChildKey);

      // return the state after the change takes place
      // since value events are always triggered last, we are guaranteed to contain updates from any other events which occurred before that snapshot was taken
      const newState = snapshot.val();
      return newState;
    },
    (errorObject: any) => {
      console.log("The read failed: ", errorObject.code);
    }
  );
};

// once() reads and returns state when called
export const GetStateController = (path: string = "server/poker"): object => {
  const currRef = db.ref(path);
  return currRef.once("value", snapshot => {
    console.log(
      "this is what the data looks like now: ",
      snapshot.numChildren()
    );
    // read and fire some event one time
    // do some stuff once
  });
};

// example controller we may need to make
type PlayerActionType = "check" | "fold" | "bet" | "raise";
interface PlayerAction {
  actionType: PlayerActionType;
  player: string;
  amount: number;
  turnCount: number;
}

export const PlayerTurnController = (playerMove: PlayerAction) => {
  const turnRef = db.ref("server/poker/table/turn");
  turnRef.push(playerMove);
};
