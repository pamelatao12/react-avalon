class Value {
  constructor(value, name) {
    this.value = value;
    this.name = name;
  }

  toString() {
    return this.name;
  }

  toShortString() {
    return this.name.charAt(0);
  }

  compareTo(other) {
    return this.value - other.value;
  }

  getValueAsString() {
    return `${this.value < 10 ? "0" : ""}${this.value}`;
  }
}

export const TWO = new Value(2, "2");
export const THREE = new Value(3, "3");
export const FOUR = new Value(4, "4");
export const FIVE = new Value(5, "5");
export const SIX = new Value(6, "6");
export const SEVEN = new Value(7, "7");
export const EIGHT = new Value(8, "8");
export const NINE = new Value(9, "9");
export const TEN = new Value(10, "Ten");
export const JACK = new Value(11, "Jack");
export const QUEEN = new Value(12, "Queen");
export const KING = new Value(13, "King");
// Use 14 instead of 1 since this is the best card and it simplifies value
// comparisons.
export const ACE = new Value(14, "Ace");

export const VALUES = [
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT,
  NINE,
  TEN,
  JACK,
  QUEEN,
  KING,
  ACE
];

const valuesCopy = [...VALUES];
export const VALUES_DESC = valuesCopy.reverse();
