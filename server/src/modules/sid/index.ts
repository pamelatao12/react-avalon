/**
 * Creates a sid, or secure id. This is a random 34 character string that
 * consists of:
 *
 * - a unique 4 character prefix in all caps
 * - a 30 character lowercase hex (0-9, a-f) suffix
 *
 * Sids ensure primary keys for different table schemas are unique.
 */
import { randomInt } from "../common/random";

const createSid = (prefix: string): string => {
  if (prefix.length !== 4) {
    throw new Error(`Prefix must be 4 characters: ${prefix}`);
  }
  const suffix = generateHexId(30);
  return `${prefix.toUpperCase()}${suffix}`;
};

const generateHexId = (length: number): string => {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += randomHexValue();
  }
  return result;
};

const HEX_VALUES = "0123456789abcdef";

const randomHexValue = (): string => {
  const index = randomInt(0, HEX_VALUES.length - 1);
  return HEX_VALUES.charAt(index);
};

export default createSid;

export const createTableSid = () => {
  return createSid("TABL");
};
