import { determineHandValue } from "./hand";
import Card from "./card";
import { ACE, TEN } from "./value";
import { HEART } from "./suit";

export const debugHand = (): string => {
  return determineHandValue([
    new Card(ACE, HEART),
    new Card(TEN, HEART),
    new Card(TEN, HEART),
    new Card(TEN, HEART),
    new Card(TEN, HEART)
  ]);
};
