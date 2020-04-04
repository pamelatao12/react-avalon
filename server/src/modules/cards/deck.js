import { SUITS } from "./suit";
import { VALUES } from "./value";
import Card from "./card";

export default class Deck {
  constructor() {
    this.reset();
  }

  reset() {
    this.nextCardIndex = 0;
    this.cards = this.initializeCards();
    this.shuffle();
  }

  initializeCards() {
    const cards = [];

    SUITS.forEach(suit => {
      VALUES.forEach(value => {
        cards.push(new Card(suit, value));
      });
    });

    return cards;
  }

  /**
   * Shuffles the deck of cards.
   */
  shuffle() {
    // Move down the deck so random number logic is simpler.
    for (let i = this.cards.length - 1; i > 0; i--) {
      const swapIndex = Math.floor(Math.random() * (i + 1));
      const tempCard = this.cards[i];
      this.cards[i] = this.cards[swapIndex];
      this.cards[swapIndex] = tempCard;
    }
  }

  /**
   * Deals out the next card.
   */
  deal() {
    return this.cards[this.nextCardIndex++];
  }

  toString() {
    return this.cards.map(card => card.toString()).join("\n");
  }
}
