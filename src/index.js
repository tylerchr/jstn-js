import Tokenizer from './scanner.js';
import parse, { Parser } from './parser.js';
import { isValid } from './validator.js';
import generate from './generator.js';
import Types, { Kinds, JSTNType } from './type.js';

export { Parser, Tokenizer, isValid }

export default {
	parse,
	generate,

	Kinds: Kinds,

	Type: JSTNType,

	String: Types.JSTNString,
	Number: Types.JSTNNumber,
	Boolean: Types.JSTNBoolean,
	Null: Types.JSTNNull,
	Object: Types.JSTNObject,
	Array: Types.JSTNArray,
};