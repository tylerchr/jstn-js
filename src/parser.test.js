import parse, { Parser, ParseError } from './parser.js';
import Types from './type.js';

describe('string', () => {

	test('parses', () => {
		let type = parse("string");
		expect(type).toEqual(new Types.JSTNString());
	});

	test('parses with optional', () => {
		let type = parse("string?");
		expect(type).toEqual(new Types.JSTNString(true));
	});

});

describe('number', () => {

	test('parses', () => {
		let type = parse("number");
		expect(type).toEqual(new Types.JSTNNumber());
	});

	test('parses with optional', () => {
		let type = parse("number?");
		expect(type).toEqual(new Types.JSTNNumber(true));
	});

});

describe('boolean', () => {

	test('parses', () => {
		let type = parse("boolean");
		expect(type).toEqual(new Types.JSTNBoolean());
	});

	test('parses with optional', () => {
		let type = parse("boolean?");
		expect(type).toEqual(new Types.JSTNBoolean(true));
	});

});

describe('null', () => {

	test('parses', () => {
		let type = parse("null");
		expect(type).toEqual(new Types.JSTNNull());
	});

	test('parses with optional', () => {
		let type = parse("null?");
		expect(type).toEqual(new Types.JSTNNull(true));
	});

});

describe('array', () => {

	test('parses', () => {
		let type = parse("[]");
		expect(type).toEqual(new Types.JSTNArray());
	});

	test('parses with optional', () => {
		let type = parse("[]?");
		expect(type).toEqual(new Types.JSTNArray(undefined, true));
	});

	test('parses with child', () => {
		let type = parse("[string]");
		expect(type).toEqual(new Types.JSTNArray(new Types.JSTNString()));
	});

	test('parses with optional child', () => {
		let type = parse("[string?]");
		expect(type).toEqual(new Types.JSTNArray(new Types.JSTNString(true)));
	});

});

describe('object', () => {

	test('parses', () => {
		let type = parse("{}");
		expect(type).toEqual(new Types.JSTNObject());
	});

	test('parses with optional', () => {
		let type = parse("{}?");
		expect(type).toEqual(new Types.JSTNObject({}, true));
	});

	test('parses with property', () => {
		let type = parse("{countryCode: string}");
		expect(type).toEqual(new Types.JSTNObject({
			"countryCode": new Types.JSTNString(),
		}));
	});

	test('parses with optional property', () => {
		let type = parse("{countryCode: string?}");
		expect(type).toEqual(new Types.JSTNObject({
			"countryCode": new Types.JSTNString(true),
		}));
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

		let type = parse(text);

		expect(type).toEqual(new Types.JSTNObject({
			"author": new Types.JSTNString(),
			"works": new Types.JSTNArray(new Types.JSTNObject({
				"title": new Types.JSTNString(),
				"year": new Types.JSTNNumber(true),
				"classic": new Types.JSTNBoolean(),
			})),
		}));

	});

});
