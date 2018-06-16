import Parser, { Kinds, ParseError } from './parser.js';

describe('string', () => {

	test('parses', () => {
		let parser = new Parser("string");
		let type = parser.parseType();
		expect(type).toEqual({ Kind: Kinds.String });
	});

	test('parses with optional', () => {
		let parser = new Parser("string?");
		let type = parser.parseType();
		expect(type).toEqual({ Kind: Kinds.String, Optional: true });
	});

});

describe('number', () => {

	test('parses', () => {
		let parser = new Parser("number");
		let type = parser.parseType();
		expect(type).toEqual({ Kind: Kinds.Number });
	});

	test('parses with optional', () => {
		let parser = new Parser("number?");
		let type = parser.parseType();
		expect(type).toEqual({ Kind: Kinds.Number, Optional: true });
	});

});

describe('boolean', () => {

	test('parses', () => {
		let parser = new Parser("boolean");
		let type = parser.parseType();
		expect(type).toEqual({ Kind: Kinds.Boolean });
	});

	test('parses with optional', () => {
		let parser = new Parser("boolean?");
		let type = parser.parseType();
		expect(type).toEqual({ Kind: Kinds.Boolean, Optional: true });
	});

});

describe('null', () => {

	test('parses', () => {
		let parser = new Parser("null");
		let type = parser.parseType();
		expect(type).toEqual({ Kind: Kinds.Null });
	});

	test('parses with optional', () => {
		let parser = new Parser("null?");
		let type = parser.parseType();
		expect(type).toEqual({ Kind: Kinds.Null, Optional: true });
	});

});

describe('array', () => {

	test('parses', () => {
		let parser = new Parser("[]");
		let type = parser.parseType();
		expect(type).toEqual({ Kind: Kinds.Array });
	});

	test('parses with optional', () => {
		let parser = new Parser("[]?");
		let type = parser.parseType();
		expect(type).toEqual({ Kind: Kinds.Array, Optional: true });
	});

	test('parses with child', () => {
		let parser = new Parser("[string]");
		let type = parser.parseType();
		expect(type).toEqual({ Kind: Kinds.Array, Items: {
			Kind: Kinds.String
		} });
	});

	test('parses with optional child', () => {
		let parser = new Parser("[string?]");
		let type = parser.parseType();
		expect(type).toEqual({ Kind: Kinds.Array, Items: {
			Kind: Kinds.String,
			Optional: true
		} });
	});

});

describe('object', () => {

	test('parses', () => {
		let parser = new Parser("{}");
		let type = parser.parseType();
		expect(type).toEqual({ Kind: Kinds.Object, Properties: {} });
	});

	test('parses with optional', () => {
		let parser = new Parser("{}?");
		let type = parser.parseType();
		expect(type).toEqual({ Kind: Kinds.Object, Optional: true, Properties: {} });
	});

	test('parses with property', () => {
		let parser = new Parser("{countryCode: string}");
		let type = parser.parseType();
		expect(type).toEqual({ Kind: Kinds.Object, Properties: {
			"countryCode": {Kind: Kinds.String}
		} });
	});

	test('parses with optional property', () => {
		let parser = new Parser("{countryCode: string?}");
		let type = parser.parseType();
		expect(type).toEqual({ Kind: Kinds.Object, Properties: {
			"countryCode": {Kind: Kinds.String, Optional: true}
		} });
	});

	test('fails to parse with bad syntax', () => {
		let parser = new Parser("{countryCode:string name}");
		expect(() => { parser.parseType() }).toThrowError(ParseError);
	});

});

describe('standard cases', () => {

	test('parse correctly', () => {

		let text = `{author:string;works:[{
	title:string
	year:     number?;
	classic:boolean;}]}`;

		let parser = new Parser(text);
		let type = parser.parseType();
		expect(type).toEqual({Kind: Kinds.Object, Properties: {
			"author": {Kind: Kinds.String},
			"works": {Kind: Kinds.Array, Items: {Kind: Kinds.Object, Properties: {
				"title":   {Kind: Kinds.String},
				"year":    {Kind: Kinds.Number, Optional: true},
				"classic": {Kind: Kinds.Boolean},
			}}}
		}});

	});

});
