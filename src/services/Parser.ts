import { Token, TokenType } from "../types/tokens";

export default class Parser {
  text: string;
  currentToken?: Token;
  currentIndex: number;

  constructor() {
    this.text = "";
    this.currentToken = undefined;
    this.currentIndex = 0;
  }

  validate(text: string): string | undefined {
    try {
      this.parse(text);
    } catch (error) {
      return (error as Error).message;
    }
  }

  parse(text: string): void {
    this.text = text;
    this.currentIndex = 0;
    this.currentToken = undefined;

    this.nextToken();
    this.expression();
  }

  expression(): void {
    this.term();
    this.expression1();
  }

  expression1(): void {
    switch (this.currentToken?.type) {
      case TokenType.PLUS:
        this.nextToken();
        this.term();
        this.expression();
        break;
      case TokenType.MINUS:
        this.nextToken();
        this.term();
        this.expression();
    }
  }

  term(): void {
    this.factor();
    this.term1();
  }

  term1(): void {
    switch (this.currentToken?.type) {
      case TokenType.MUL:
        this.nextToken();
        this.factor();
        this.term1();
        break;
      case TokenType.DIV:
        this.nextToken();
        this.factor();
        this.term1();
        break;
      case TokenType.MOD:
        this.nextToken();
        this.factor();
        this.term1();
        break;
      case TokenType.POWER:
        this.nextToken();
        this.factor();
        this.term1();
        break;
    }
  }

  factor(): void {
    switch (this.currentToken?.type) {
      case TokenType.LEFT_PAREN:
        this.nextToken();
        this.expression();
        this.match(TokenType.RIGHT_PAREN);
        break;
      case TokenType.MINUS:
        this.nextToken();
        this.factor();
        break;
      case TokenType.NUMBER:
        this.nextToken();
        break;
      case TokenType.T:
        this.nextToken();
        break;
      case TokenType.SIN:
        this.nextToken();
        this.expression();
        break;
      case TokenType.COS:
        this.nextToken();
        this.expression();
        break;
      case TokenType.EOF:
        break;
      case TokenType.RIGHT_PAREN:
        break;
      default:
        throw new Error(
          `Unexpected token: '${this.currentToken?.type}' at position ${this.currentIndex}`
        );
    }
  }

  match(expected: string): void {
    if (this.text[this.currentIndex - 1] === expected) {
      this.nextToken();
    } else {
      throw new Error(
        `Unexpected character: Expected '${expected}' but found '${
          this.text[this.currentIndex] ?? "EOF"
        }' at position ${this.currentIndex}`
      );
    }
  }

  nextToken(): void {
    this.skipWhitespace();

    // test for end of string
    if (this.currentIndex > this.text.length - 1) {
      this.currentToken = new Token(TokenType.EOF, "");
      return;
    }

    // if the current character is a digit read a number
    if (this.isDigit(this.text[this.currentIndex])) {
      this.currentToken = this.readNumber();
      return;
    }

    // if the current character is '*' decide if it is a power or a multiplication
    if (this.text[this.currentIndex] === "*") {
      if (this.text[this.currentIndex + 1] === "*") {
        this.currentToken = new Token(TokenType.POWER, "**");
        this.currentIndex += 2;
        return;
      } else {
        this.currentToken = new Token(TokenType.MUL, "*");
        this.currentIndex++;
        return;
      }
    }

    // if the current character is a letter read a sin or cos or the t magic variable
    if (this.isLetter(this.text[this.currentIndex])) {
      let result = "";
      while (this.isLetter(this.text[this.currentIndex])) {
        result += this.text[this.currentIndex];
        this.currentIndex++;
      }

      if (result === "sin") {
        this.currentToken = new Token(TokenType.SIN, "sin");
        return;
      } else if (result === "cos") {
        this.currentToken = new Token(TokenType.COS, "cos");
        return;
      } else if (result === "t") {
        this.currentToken = new Token(TokenType.T, "t");
        return;
      }

      throw new Error(
        `Unexpected token: '${result}' at position ${this.currentIndex}`
      );
    }

    // if the current character is an operator or a parenthesis read it
    if (
      this.text[this.currentIndex] === TokenType.PLUS ||
      this.text[this.currentIndex] === TokenType.MINUS ||
      this.text[this.currentIndex] === TokenType.DIV ||
      this.text[this.currentIndex] === TokenType.MOD ||
      this.text[this.currentIndex] === TokenType.LEFT_PAREN ||
      this.text[this.currentIndex] === TokenType.RIGHT_PAREN
    ) {
      this.currentToken = new Token(
        this.text[this.currentIndex] as TokenType,
        this.text[this.currentIndex]
      );
      this.currentIndex++;
      return;
    }

    // if the current character is none of the above throw an error
    throw new Error(
      `Unexpected character: '${this.text[this.currentIndex]}' at position ${
        this.currentIndex
      }`
    );
  }

  skipWhitespace(): void {
    while (this.text[this.currentIndex] === " ") {
      this.currentIndex++;
    }
  }

  isDigit(char: string): boolean {
    return char >= "0" && char <= "9";
  }

  isLetter(char: string): boolean {
    return (char >= "a" && char <= "z") || (char >= "A" && char <= "Z");
  }

  readNumber(): Token {
    let result = "";
    while (this.isDigit(this.text[this.currentIndex])) {
      result += this.text[this.currentIndex];
      this.currentIndex++;
    }

    if (this.text[this.currentIndex] === ".") {
      // if first char after dot is not a digit throw an error
      if (!this.isDigit(this.text[this.currentIndex + 1])) {
        throw new Error(
          `Unexpected character: Expected digit but found '${
            this.text[this.currentIndex + 1]
          }' at position ${this.currentIndex + 1}`
        );
      }
      result += this.text[this.currentIndex];
      this.currentIndex++;

      while (this.isDigit(this.text[this.currentIndex])) {
        result += this.text[this.currentIndex];
        this.currentIndex++;
      }
    }

    return new Token(TokenType.NUMBER, result);
  }
}
