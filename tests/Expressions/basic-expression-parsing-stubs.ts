import { Token, TokenType } from "../../src/types/tokens";

export const basicExpressionParsingStubs = [
  { expression: "t", expected: [] },
  {
    expression: "t + 1",
    expected: [],
  },
  {
    expression: "t + 1 * 2",
    expected: [],
  },
  {
    expression: "t + 1.1 * 2.00009 / 3",
    expected: [],
  },
  {
    expression: "t + 1 * 2 - 3",
    expected: [],
  },
  {
    expression: "t + 1 * 2 - 3 / 4",
    expected: [],
  },
  {
    expression: "t + 1 * 2 - 3 / 4 ** 5",
    expected: [],
  },
  {
    expression: "t + 1 * 2 - 3 / 4 ** 5 % 6",
    expected: [],
  },
  {
    expression: "t + 1 * 2 - 3 / 4 ** 5 % 6 * (7 + 8)",
    expected: [],
  },
  {
    expression: "((t + 1 * (2 - 3) / 4) ** 5 % 6 * (7 + 8)) / 9",
    expected: [],
  },
  {
    expression: "(10*sin(2*3.14*t/10))",
    expected: [],
  },
  {
    expression: "(-0.35*(cos(3.141*t/25)**100)+0.8)",
    expected: [],
  },
  {
    expression: "   1 *  2.5   ",
    expected: [],
  },
  {
    expression: "   1*2,5",
    expected: ["Unexpected character: ',' at position 6"],
  },
  {
    expression: "M1 + 2.5",
    expected: ["Unexpected token: 'M' at position 1"],
  },
  {
    expression: "1 * 2.5.6",
    expected: ["Unexpected character: '.' at position 7"],
  },
  {
    expression: "*1 / 2.5",
    expected: ["Unexpected token: '*' at position 1"],
  },
  {
    expression: "1 * 2.5 /",
    expected: ["Unexpected token: 'EOF' at position 9"],
  },
  {
    expression: "1 * (2.5 / 3",
    expected: [
      "Unexpected character: Expected ')' but found 'EOF' at position 12",
    ],
  },
  {
    expression: "(1 * (2.5 / 3)",
    expected: [
      "Unexpected character: Expected ')' but found 'EOF' at position 12",
    ],
  },
  {
    expression: "1 * (2. / 3)",
    expected: [
      "Unexpected character: Expected digit but found ' ' at position 7",
    ],
  },
  {
    expression: "sin 1",
    expected: [
      "Unexpected character: Expected '(' but found ' ' at position 4",
    ],
  },
  {
    expression: "sin1",
    expected: [
      "Unexpected character: Expected '(' but found '1' at position 4",
    ],
  },
  {
    expression: "sin(1",
    expected: [
      "Unexpected character: Expected ')' but found 'EOF' at position 5",
    ],
  },
  {
    expression: "2++2",
    expected: ["Unexpected token: '+' at position 3"],
  },
  {
    expression: "+2",
    expected: ["Unexpected token: '+' at position 1"],
  },
  {
    expression: "2",
    expected: [],
  },
  {
    expression: "2.03232",
    expected: [],
  },
  {
    expression: "2+2+2",
    expected: [],
  },
];
