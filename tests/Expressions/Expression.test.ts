import { describe, expect, it } from "vitest";
import Parser from "../../src/services/Parser";
import { basicExpressionParsingStubs } from "./basic-expression-parsing-stubs";

describe.each(basicExpressionParsingStubs)(
  "Expression parser",
  ({ expression }) => {
    it(`should parse ${expression} without error`, () => {
      new Parser().parse(expression);
    });
  }
);
