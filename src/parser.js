import Tokenizer, { Tokens } from './scanner.js';
import Types from './type.js';

// Can't properly extend builtin types, so we create this custom error
// type manually (see https://babeljs.io/docs/en/caveats/#classes).
const ParseError = (() => {

	function ParseError(token, expected) {
		this.token = token;
		this.expected = expected;
	}

	ParseError.prototype = Object.create(Error.prototype);

	ParseError.prototype.toString = function() {
		let expected = "[" + this.expected.join(" or ") + "]";
		return "syntax error: expected "
			+ expected
			+ ", found "
			+ this.token.Token;
	};

	return ParseError;

})();

class Parser {

	constructor(schema) {
		this.tokenizer = new Tokenizer(schema);
	}

	scan() {
		if (this.unscanned) {
			this.unscanned = null;
			return this.last;
		}
		this.last = this.tokenizer.scan();
		return this.last;
	}

	unscan() {
		this.unscanned = true;
	}

	scanIgnoreWhitespace(andNewlines) {
		var token = this.scan();
		while (token.Token == Tokens.WHITESPACE || (andNewlines && token.Token == Tokens.NEWLINE)) {
			token = this.scan();
		}
		return token;
	}

	parseType() {
		let token = this.parseTypeDecl();

		let nextToken = this.scan();
		if (nextToken.Token == Tokens.QUESTION) {
			token.Optional = true;
		} else {
			this.unscan();
		}

		return token;
	}

	parseTypeDecl() {
		let token = this.scanIgnoreWhitespace(true);

		switch (token.Token) {
			case Tokens.STRING:
				return new Types.JSTNString();
			case Tokens.NUMBER:
				return new Types.JSTNNumber();
			case Tokens.BOOLEAN:
				return new Types.JSTNBoolean();
			case Tokens.NULL:
				return new Types.JSTNNull();
			case Tokens.SQUAREOPEN:
				this.unscan();
				return this.parseArray();
			case Tokens.CURLYOPEN:
				this.unscan();
				return this.parseObject();
			default:
				throw new Error("unexpected token: " + token.Token + "(" + token.Value + ")");
		}
	}

	parseArray() {

		var token = this.scanIgnoreWhitespace(true);
		this.assertToken(token, Tokens.SQUAREOPEN);

		token = this.scanIgnoreWhitespace(true);
		this.unscan();

		var childType;
		if (token.Token != Tokens.SQUARECLOSE) {
			childType = this.parseType();
		}

		token = this.scanIgnoreWhitespace(true);
		this.assertToken(token, Tokens.SQUARECLOSE);

		return new Types.JSTNArray(childType);

	}

	parseObject() {

		var token = this.scanIgnoreWhitespace(true);
		this.assertToken(token, Tokens.CURLYOPEN);

		let props = {};
		for (;;) {

			let token = this.scanIgnoreWhitespace(true);

			// check for the curly brace
			if (token.Token == Tokens.CURLYCLOSE) {
				this.unscan();
				break;
			}

			// parse the property name
			this.assertToken(token, Tokens.IDENT);

			// parse the colon
			this.assertToken(this.scanIgnoreWhitespace(true), Tokens.COLON);

			// parse the object type
			props[token.Value] = this.parseType();

			// Every property pair must finish with a delimiter token, which can be
			// either a CURLYCLOSE (indicating the end of the object), a SEMICOLON,
			// or a NEWLINE.
			let delimiterToken = this.scanIgnoreWhitespace(false);
			if (delimiterToken.Token == Tokens.CURLYCLOSE) {
				this.unscan();
			} else if (delimiterToken.Token != Tokens.SEMICOLON && delimiterToken.Token != Tokens.NEWLINE) {
				throw new ParseError(delimiterToken, [Tokens.SEMICOLON, Tokens.NEWLINE]);
			}

		}

		this.assertToken(this.scanIgnoreWhitespace(true), Tokens.CURLYCLOSE);

		return new Types.JSTNObject(props);

	}

	assertToken(token, expected) {
		if (token.Token != expected) {
			throw new ParseError(token, expected);
		}
	}

}

function parse(schema) {
	return (new Parser(schema)).parseType();
}

export { Parser, ParseError };

export default parse;