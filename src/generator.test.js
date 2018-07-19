import generate from './generator.js';
import Types from './type.js';

describe("generator", () => {

	test('renders strings', () => {
		let t = new Types.JSTNString();
		expect(generate(t)).toEqual("string");
	});

	test('renders optional strings', () => {
		let t = new Types.JSTNString(true);
		expect(generate(t)).toEqual("string?");
	});

	test('renders numbers', () => {
		let t = new Types.JSTNNumber();
		expect(generate(t)).toEqual("number");
	});

	test('renders optional numbers', () => {
		let t = new Types.JSTNNumber(true);
		expect(generate(t)).toEqual("number?");
	});

	test('renders booleans', () => {
		let t = new Types.JSTNBoolean();
		expect(generate(t)).toEqual("boolean");
	});

	test('renders optional booleans', () => {
		let t = new Types.JSTNBoolean(true);
		expect(generate(t)).toEqual("boolean?");
	});

	test('renders nulls', () => {
		let t = new Types.JSTNNull();
		expect(generate(t)).toEqual("null");
	});

	test('renders optional nulls', () => {
		let t = new Types.JSTNNull(true);
		expect(generate(t)).toEqual("null?");
	});

	test('renders objects', () => {
		let t = new Types.JSTNObject();
		expect(generate(t)).toEqual("{}");
	});

	test('renders optional objects', () => {
		let t = new Types.JSTNObject(undefined, true);
		expect(generate(t)).toEqual("{}?");
	});

	test('renders objects with properties', () => {
		let t = new Types.JSTNObject({
			"firstName": new Types.JSTNString(),
			"age": new Types.JSTNNumber(true),
		});
		expect(generate(t)).toEqual("{firstName:string;age:number?}");
	});

	test('renders pretty objects with properties', () => {
		let t = new Types.JSTNObject({
			"firstName": new Types.JSTNString(),
			"age": new Types.JSTNNumber(true),
		});
		expect(generate(t, true)).toEqual(`{
  firstName: string
  age: number?
}`);
	});

	test('renders pretty objects with nested properties', () => {
		let t = new Types.JSTNObject({
			"firstName": new Types.JSTNString(),
			"age": new Types.JSTNNumber(true),
			"residences": new Types.JSTNArray(new Types.JSTNObject({
				"city": new Types.JSTNString(),
				"country": new Types.JSTNString(true),
			})),
		});
		expect(generate(t, true)).toEqual(`{
  firstName: string
  age: number?
  residences: [{
    city: string
    country: string?
  }]
}`);
	});

	test('renders arrays', () => {
		let t = new Types.JSTNArray();
		expect(generate(t)).toEqual("[]");
	});

	test('renders optional arrays', () => {
		let t = new Types.JSTNArray(undefined, true);
		expect(generate(t)).toEqual("[]?");
	});

	test('renders arrays with contents', () => {
		let t = new Types.JSTNArray(new Types.JSTNString(), true);
		expect(generate(t)).toEqual("[string]?");
	});

	test('renders arrays with nested contents', () => {
		let t = new Types.JSTNArray(new Types.JSTNArray(new Types.JSTNBoolean(true)), true);
		expect(generate(t)).toEqual("[[boolean?]]?");
	});

});