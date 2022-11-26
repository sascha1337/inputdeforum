// valid tokens are: +, -, *, /, (, ), number, t, sin, cos, **, %
// key value pairs enums
export enum TokenType {
  LEFT_PAREN = "(",
  RIGHT_PAREN = ")",
  PLUS = "+",
  MINUS = "-",
  MUL = "*",
  DIV = "/",
  MOD = "%",
  POWER = "**",
  SIN = "sin",
  COS = "cos",
  NUMBER = "number",
  T = "t",
  EOF = "EOF",
}

export class Token {
  type: TokenType;
  value: string;

  constructor(type: TokenType, value: string) {
    this.type = type;
    this.value = value;
  }
}
