import { db } from "./";

// update should be default method to write to db to resolve any changes without deleting sibling keys that are unspecified in the payload
export const UpdateDataController = (payload: object, path: string): void => {
  const currRef = db.ref(path);
  console.log("this is what we're updating or adding to it: ", payload);
  // for udpating whose turn it is, updating pot size, etc..
  currRef.update(payload);

  /*   example   */
  //   const tableRef = db.ref('server/poker/table')
  //   tableRef.update({
  //       players: {
  //           count: 3,
  //           names: {
  //             david: true,
  //             lance: true,
  //             pamela: true
  //           }
  //       },
  //       table: {
  //           name: "degens",
  //           date: "12-12-2012",
  //           count: 2
  //       }
  //   })
};

/**
 * Write or replace data to a defined path, like messages/users/<username>. If
 * the path is undefined, the root will be used.
 */
export const setDatabase = (
  path: string | undefined,
  payload: any
): Promise<void> => {
  const ref = db.ref(path);
  return ref.set(payload);
};

// push() generates and returns a unique key (derived from timestamp), which then you can set() payload
// shorthand to combine push() and set() is to simply pass in the obj as arg in push() which will set the obj as values to the newly created child
export const PushDataController = (
  payload: object,
  path: string
): string | null => {
  const currRef = db.ref(path);
  console.log(
    "this is what we're *appending* to it with a unique key: ",
    payload
  );
  const newChildRef = currRef.push(payload);

  return newChildRef.key;

  /* example */
  // const generatedChild = currRef.push({ 'test': true })
  // const newChildId = newChildRef.key
  // console.log('this is the newly generated key for the pushed data: ', newChildId)
};

// The unique key is based on a timestamp, so list items will automatically be ordered chronologically
// Because Firebase generates a unique key for each push call, no write conflicts will occur if multiple users add a post at the same time

/* <----- example -----> */
// const movesRef = db.ref('server/poker/table/moves')
// movesRef.push({
//   action_type: 'bet',
//   player: 'Lance',
//   amount: .4,
//   turn_count: 2
// });
// movesRef.push({
//   action_type: 'raise',
//   player: 'Anthony',
//   amount: 2,
//   turn_count: 3
// })

/* the data at 'server/poker/table/moves' might now look like this.. */
// {
//   "plays": {
//     /* ** since push immediately creates a new, unique child Key each time, then only writes on that new child, the other children's data at that ref remains unaffected ** */
//     "-JRHTHaAuInDoqEj02kE": {
//       "action_type": 'check',
//       "player": 'Pamela',
//       "amount": 0,
//       "turn_count": 1
//     },
//     "-JRHTHaIs-jNPLXOQivY": {
//       "action_type": "bet",
//       "player": "Lance"
//       "amount": .4,
//       "turn_count": 2
//     },
//     "-JRHTHaKuITFIhnj02kE": {
//       "action_type": "raise",
//       "player": "Anthony",
//       "amount": 2,
//       "turn_count": 3
//     }
//   }
// }
