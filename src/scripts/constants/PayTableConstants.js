export const LINE_TYPES = {
  TOP: {
    value: 0,
    label: 'Top'
  },
  CENTER: {
    value: 1,
    label: 'Center'
  },
  BOTTOM: {
    value: 2,
    label: 'Bottom'
  },
  ANY: {
    value: -1,
    label: 'Any'
  }
};

/**
 * PAY_TYPES defines the type of pays.
 * SYMBOLS: Array of slot symbol's index number.
 * [4, 4, 4] means = Cherry, Cherry, Cherry
 * LINE: top, bottom, center or any
 * COMBINATION: If true, SYMBOLS can be combinated.
 * AMOUNT: Payout of the reward.
 * ISOR: if true, any one of the symbols enough to win
*/

export const PAY_TYPES = [
  {
    ID: 0,
    SYMBOLS: [4, 4, 4],
    LINE: LINE_TYPES.TOP,
    COMBINATION: false,
    AMOUNT: 2000,
    ISOR: false
  },
  {
    ID: 1,
    SYMBOLS: [4, 4, 4],
    LINE: LINE_TYPES.CENTER,
    COMBINATION: false,
    AMOUNT: 1000,
    ISOR: false
  },
  {
    ID: 2,
    SYMBOLS: [4, 4, 4],
    LINE: LINE_TYPES.BOTTOM,
    COMBINATION: false,
    AMOUNT: 4000,
    ISOR: false
  },
  {
    ID: 3,
    SYMBOLS: [3, 3, 3],
    LINE: LINE_TYPES.ANY,
    COMBINATION: false,
    AMOUNT: 150,
    ISOR: false
  },
  {
    ID: 4,
    SYMBOLS: [3, 4],
    LINE: LINE_TYPES.ANY,
    COMBINATION: true,
    AMOUNT: 75,
    ISOR: false
  },
  {
    ID: 5,
    SYMBOLS: [0, 0, 0],
    LINE: LINE_TYPES.ANY,
    COMBINATION: false,
    AMOUNT: 50,
    ISOR: false
  },
  {
    ID: 6,
    SYMBOLS: [2, 2, 2],
    LINE: LINE_TYPES.ANY,
    COMBINATION: false,
    AMOUNT: 20,
    ISOR: false
  },
  {
    ID: 7,
    SYMBOLS: [1, 1, 1],
    LINE: LINE_TYPES.ANY,
    COMBINATION: false,
    AMOUNT: 10,
    ISOR: false
  },
  {
    ID: 8,
    SYMBOLS: [0, 1, 2],
    LINE: LINE_TYPES.ANY,
    COMBINATION: true,
    AMOUNT: 5,
    ISOR: true
  }
];
