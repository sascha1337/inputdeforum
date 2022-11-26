import { describe, expect, it } from "vitest";
import Parser from "../../src/services/Parser";
import { basicExpressionParsingStubs } from "./basic-expression-parsing-stubs";

describe.each(basicExpressionParsingStubs)(
  "Expression parser",
  ({ expression, expected }) => {
    it(`should parse ${expression} or throw an error`, () => {
      try {
        new Parser().parse(expression);
      } catch (error) {
        if (expected.length === 0) {
          expect(error).toBeUndefined();
        } else {
          expect(error.message).toBe(expected[0]);
        }
      }
    });
  }
);
