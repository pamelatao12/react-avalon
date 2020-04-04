class Suit {
  constructor(name) {
    this.name = name;
  }

  toString() {
    return this.name;
  }

  toShortString() {
    return this.name.charAt(0);
  }

  compareTo(other) {
    return this.name === other.name
      ? 0
      : this.name.charCodeAt(0) - other.name.charCodeAt(0);
  }
}

export const DIAMOND = new Suit("Diamond");
export const CLUB = new Suit("Club");
export const HEART = new Suit("Heart");
export const SPADE = new Suit("Spade");

export const SUITS = [DIAMOND, CLUB, HEART, SPADE];
