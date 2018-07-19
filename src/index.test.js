import jstn, { Parser, Tokenizer, isValid } from './index.js';

import parse, { Parser as ParserOriginal } from './parser.js';
import TokenizerOriginal from './scanner.js';
import { isValid as isValidOriginal } from './validator.js';
import Types, { JSTNType, Kinds } from './type.js';

describe('default export', () => {

	test('includes parse function', () => {

		expect(typeof parse).toBe('function');
		expect(jstn).toHaveProperty('parse', parse);

	});

	test('includes kinds', () => {

		expect(typeof Kinds.String).toBe('string');
		expect(typeof Kinds.Number).toBe('string');
		expect(typeof Kinds.Boolean).toBe('string');
		expect(typeof Kinds.Null).toBe('string');
		expect(typeof Kinds.Object).toBe('string');
		expect(typeof Kinds.Array).toBe('string');

		expect(jstn).toMatchObject({
			Kinds: {
				String: Kinds.String,
				Number: Kinds.Number,
				Boolean: Kinds.Boolean,
				Null: Kinds.Null,
				Object: Kinds.Object,
				Array: Kinds.Array,
			}
		});

	});

	test('includes types', () => {

		expect(typeof JSTNType).toBe('function');
		expect(typeof Types.JSTNString).toBe('function');
		expect(typeof Types.JSTNNumber).toBe('function');
		expect(typeof Types.JSTNBoolean).toBe('function');
		expect(typeof Types.JSTNNull).toBe('function');
		expect(typeof Types.JSTNObject).toBe('function');
		expect(typeof Types.JSTNArray).toBe('function');

		expect(jstn).toMatchObject({
			Type: JSTNType,
			String: Types.JSTNString,
			Number: Types.JSTNNumber,
			Boolean: Types.JSTNBoolean,
			Null: Types.JSTNNull,
			Object: Types.JSTNObject,
			Array: Types.JSTNArray,
		});

	});

});

describe('exported objects', () => {

	test('includes Parser', () => {
		expect(typeof Parser).toBe('function');
		expect(Parser).toBe(ParserOriginal);
	});

	test('includes Tokenizer', () => {
		expect(typeof Tokenizer).toBe('function');
		expect(Tokenizer).toBe(TokenizerOriginal);
	});

	test('includes isValid', () => {
		expect(typeof isValid).toBe('function');
		expect(isValid).toBe(isValidOriginal);
	});

});