const ILLEGAL = "ILLEGAL";
const EOF = "EOF";
const WHITESPACE = "WHITESPACE";
const NEWLINE = "NEWLINE";
const IDENT = "IDENT";
const STRING = "STRING";
const NUMBER = "NUMBER";
const BOOLEAN = "BOOLEAN";
const NULL = "NULL";
const CURLYOPEN = "CURLYOPEN";
const CURLYCLOSE = "CURLYCLOSE";
const SQUAREOPEN = "SQUAREOPEN";
const SQUARECLOSE = "SQUARECLOSE";
const COLON = "COLON";
const SEMICOLON = "SEMICOLON";
const QUESTION = "QUESTION";

const Tokens = {
	ILLEGAL,
	EOF,
	WHITESPACE,
	NEWLINE,
	IDENT,
	STRING,
	NUMBER,
	BOOLEAN,
	NULL,
	CURLYOPEN,
	CURLYCLOSE,
	SQUAREOPEN,
	SQUARECLOSE,
	COLON,
	SEMICOLON,
	QUESTION
};

const Token = (t, str) => { return { Token: t, Value: str }; }

const isWhitespace = (char) => { return char == " " || char == "\t" };
const isNewline = (char) => { return char == "\r" || char == "\n" };
const isLetter = (char) => { return (char >= "a" && char <= "z") || (char >= "A" && char <= "Z") }
const isDigit = (char) => { return char >= "0" && char <= "9" }

class Tokenizer {

	constructor(str) {
		this.index = 0;
		this.source = str;
	}

	read() {
		if (this.index < this.source.length) {
			return this.source[this.index++];
		}
		return "";
	}

	unread() {
		this.index--;
	}

	tokens() {
		let tokens = [];
		for (;;) {
			let token = this.scan();
			if (token.Token === EOF) {
				break;
			}
			tokens.push(token);
		}
		return tokens;
	}

	scan() {

		let char = this.read();

		if (isWhitespace(char)) {
			this.unread();
			return this.scanWhitespace();
		} else if (isNewline(char)) {
			this.unread();
			return this.scanNewline()
		} else if (isLetter(char)) {
			this.unread();
			return this.scanIdent();
		} else if (char == "") {
			return Token(EOF);
		}

		let chars = {
			"{": CURLYOPEN,
			"}": CURLYCLOSE,
			"[": SQUAREOPEN,
			"]": SQUARECLOSE,
			":": COLON,
			";": SEMICOLON,
			"?": QUESTION,
		}

		if (chars[char]) {
			return Token(chars[char], char);
		}

		return Token(ILLEGAL, char);

	}

	scanRunes(t, matcher) {
		var str = "";
		for (let char = this.read(); char != ""; char = this.read()) {
			if (!matcher(char)) {
				this.unread();
				break;
			}
			str += char;
		}
		return Token(t, str);
	}

	scanWhitespace() {
		return this.scanRunes(WHITESPACE, isWhitespace)
	}

	scanNewline() {
		return this.scanRunes(NEWLINE, isNewline)
	}

	scanIdent() {

		let t = this.scanRunes(IDENT, (char) => {
			return isLetter(char) || isDigit(char) || char === "_";
		})

		switch (t.Value.toLowerCase()) {
			case "string":  return Token(STRING, t.Value);
			case "number":  return Token(NUMBER, t.Value);
			case "boolean": return Token(BOOLEAN, t.Value);
			case "null":    return Token(NULL, t.Value);
		}

		return t;

	}

}

export default Tokenizer;

export { Tokens };