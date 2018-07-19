import { Parser } from './parser.js';
import {
	isValid,
	isValidString,
	isValidNumber,
	isValidBoolean,
	isValidNull,
	isValidArray,
	isValidObject
} from './validator.js';

describe('type matrix', () => {

	const acceptableValues = {
		"string": ["", "words"],
		"number": [-1, 0, 1, 125, 10e6],
		"boolean": [true, false],
		"null": [ null ],
		"[number]": [ [1], [1, 2, 3], [100] ],
		"{a:null; b:number}": [ {a:null, b:125} ]
	};

	test('validates own types', () => {
		for (let jstnType in acceptableValues) {
			let parsedType = (new Parser(jstnType)).parseType();
			acceptableValues[jstnType].forEach((value) => {
				expect(isValid(parsedType, value)).toEqual(true);
			});
		}
	});

	Object.keys(acceptableValues).forEach((jstnType) => {
		let parsedType = (new Parser(jstnType)).parseType();
		Object.keys(acceptableValues).forEach((otherType) => {

			// skip self, cause we know those pass
			if (jstnType == otherType) { return }

			test('doesn\'t validate other types', () => {
				acceptableValues[otherType].forEach((otherValue) => {
					expect(isValid(parsedType, otherValue)).toEqual(false);
				});

			});

		});
	});

	Object.keys(acceptableValues).forEach((jstnType) => {
		test('always accepts null when optional', () => {
			let optionalType = jstnType.endsWith("?") ? jstnType : jstnType + "?";
			let parsedType = (new Parser(optionalType)).parseType();
			expect(isValid(parsedType, null)).toEqual(true);
			expect(isValid(parsedType, undefined)).toEqual(true);
		});
	});

});

describe('string', () => {

	let stringType = (new Parser("string")).parseType();
	let stringOptionalType = (new Parser("string?")).parseType();
	let someString = "some string";

	test('validates', () => {
		expect(isValidString(stringType, someString)).toEqual(true);
	});

	test('validates generically', () => {
		expect(isValid(stringType, someString)).toEqual(true);
	});

	test('doesn\'t validate with boolean', () => {
		expect(isValidString(stringType, true)).toEqual(false);
	});

	test('doesn\'t validate with null', () => {
		expect(isValidString(stringType, null)).toEqual(false);
	});

	test('doesn\'t validate with undefined', () => {
		expect(isValidString(stringType, undefined)).toEqual(false);
	});

	describe('optional', () => {

		test('validates', () => {
			expect(isValidString(stringOptionalType, someString)).toEqual(true);
		});

		test('validates with null', () => {
			expect(isValidString(stringOptionalType, null)).toEqual(true);
		});

		test('validates with undefined', () => {
			expect(isValidString(stringOptionalType, undefined)).toEqual(true);
		});

	});

});

describe('number', () => {

	let numberType = (new Parser("number")).parseType();
	let someNumber = 125;

	test('validates', () => {
		expect(isValidNumber(numberType, someNumber)).toEqual(true);
	});

	test('doesn\'t validate with null', () => {
		expect(isValidNumber(numberType, null)).toEqual(false);
	});

	test('doesn\'t validate with undefined', () => {
		expect(isValidNumber(numberType, undefined)).toEqual(false);
	});

	test('doesn\'t validate with NaN', () => {
		expect(isValidNumber(numberType, NaN)).toEqual(false);
	});

	test('doesn\'t validate with Infinity', () => {
		expect(isValidNumber(numberType, Infinity)).toEqual(false);
	});

	test('doesn\'t validate with -Infinity', () => {
		expect(isValidNumber(numberType, -Infinity)).toEqual(false);
	});

	describe('optional', () => {

		let numberOptionalType = (new Parser("number?")).parseType();

		test('validates', () => {
			expect(isValidNumber(numberOptionalType, someNumber)).toEqual(true);
		});

		test('validates with null', () => {
			expect(isValidNumber(numberOptionalType, null)).toEqual(true);
		});

		test('validates with undefined', () => {
			expect(isValidNumber(numberOptionalType, undefined)).toEqual(true);
		});

		test('doesn\'t validate with NaN', () => {
			expect(isValidNumber(numberOptionalType, NaN)).toEqual(false);
		});

		test('doesn\'t validate with Infinity', () => {
			expect(isValidNumber(numberOptionalType, Infinity)).toEqual(false);
		});

		test('doesn\'t validate with -Infinity', () => {
			expect(isValidNumber(numberOptionalType, -Infinity)).toEqual(false);
		});

	});

});

describe('boolean', () => {

	let booleanType = (new Parser("boolean")).parseType();
	let someBoolean = true;

	test('validates', () => {
		expect(isValidBoolean(booleanType, someBoolean)).toEqual(true);
	});

	test('doesn\'t validate with null', () => {
		expect(isValidBoolean(booleanType, null)).toEqual(false);
	});

	test('doesn\'t validate with undefined', () => {
		expect(isValidBoolean(booleanType, undefined)).toEqual(false);
	});

	describe('optional', () => {

		let booleanOptionalType = (new Parser("boolean?")).parseType();

		test('validates', () => {
			expect(isValidBoolean(booleanOptionalType, someBoolean)).toEqual(true);
		});

		test('validates with null', () => {
			expect(isValidBoolean(booleanOptionalType, null)).toEqual(true);
		});

		test('validates with undefined', () => {
			expect(isValidBoolean(booleanOptionalType, undefined)).toEqual(true);
		});

	});

});

describe('null', () => {

	let nullType = (new Parser("null")).parseType();

	test('validates', () => {
		expect(isValidNull(nullType, null)).toEqual(true);
	});

	test('doesn\'t validate with undefined', () => {
		expect(isValidNull(nullType, undefined)).toEqual(false);
	});

	describe('optional', () => {

		let nullOptionalType = (new Parser("null?")).parseType();

		test('validates', () => {
			expect(isValidNull(nullOptionalType, null)).toEqual(true);
		});

		test('validates with undefined', () => {
			expect(isValidNull(nullOptionalType, undefined)).toEqual(true);
		});

	});

});

describe('array', () => {

	describe('with number', () => {

		let arrayTypeNumber = (new Parser("[number]")).parseType();

		test('validates', () => {
			expect(isValidArray(arrayTypeNumber, [1, 2, 3])).toEqual(true);
		});

		test('doesn\'t validate with null children', () => {
			expect(isValidArray(arrayTypeNumber, [1, 2, 3, null])).toEqual(false);
		});

	});

	describe('with optional number', () => {

		let arrayTypeOptionalNumber = (new Parser("[number?]")).parseType();

		test('validates', () => {
			expect(isValidArray(arrayTypeOptionalNumber, [1, 2, 3])).toEqual(true);
		});

		test('validates with null children', () => {
			expect(isValidArray(arrayTypeOptionalNumber, [1, 2, 3, null])).toEqual(true);
		});

	});

	describe('without child type', () => {

		let emptyArrayType = (new Parser("[]")).parseType();
		
		test('validates when empty', () => {
			expect(isValidArray(emptyArrayType, [])).toEqual(true);
		});

		test('doesn\'t validate when containing value', () => {
			expect(isValidArray(emptyArrayType, ["foo"])).toEqual(false);
		});

		test('doesn\'t validate when containing null', () => {
			expect(isValidArray(emptyArrayType, [null])).toEqual(false);
		});

	})

	describe('optional', () => {

		let arrayOptionalType = (new Parser("[number]?")).parseType();

		test('validates', () => {
			expect(isValidArray(arrayOptionalType, [1, 2, 3])).toEqual(true);
		});

		test('validates with null', () => {
			expect(isValidArray(arrayOptionalType, null)).toEqual(true);
		});

		test('validates with undefined', () => {
			expect(isValidArray(arrayOptionalType, undefined)).toEqual(true);
		});

	});

});

describe('object', () => {

	let emptyObjectType = (new Parser("{}")).parseType();
	let optionalEmptyObjectType = (new Parser("{}?")).parseType();
	let objectType = (new Parser("{foo:null; bar:number}")).parseType();
	let objectTypeNested = (new Parser("{foo:{length:number}; bar:number}")).parseType();

	test('validates', () => {
		expect(isValidObject(emptyObjectType, {})).toEqual(true);
	});

	test('validates with properties', () => {
		expect(isValidObject(objectType, {
			foo: null,
			bar: 125
		})).toEqual(true);
	});

	test('doesn\'t validate with extra properties', () => {
		expect(isValidObject(objectType, {
			foo: null,
			bar: 125,
			baz: "hack"
		})).toEqual(false);
	});

	test('doesn\'t validate with missing properties', () => {
		expect(isValidObject(objectType, {
			foo: null,
		})).toEqual(false);
	});

	test('validates with nested objects', () => {
		expect(isValidObject(objectTypeNested, {
			foo: { length: 3 },
			bar: 125
		})).toEqual(true);
	});

	test('doesn\'t validate with null', () => {
		expect(isValidObject(emptyObjectType, null)).toEqual(false);
	});

	test('doesn\'t validate with undefined', () => {
		expect(isValidObject(emptyObjectType, undefined)).toEqual(false);
	});

	describe('optional', () => {

		test('validates', () => {
			expect(isValidObject(optionalEmptyObjectType, {})).toEqual(true);
		});

		test('validates with null', () => {
			expect(isValidObject(optionalEmptyObjectType, null)).toEqual(true);
		});

		test('validates with undefined', () => {
			expect(isValidObject(optionalEmptyObjectType, undefined)).toEqual(true);
		});

	});

});