import Types from './type.js';

describe('jstn', () => {

	describe('strings', () => {

		test('serialize to json as generated jstn strings', () => {
			let sample = new Types.JSTNString(true);
			let serialized = JSON.stringify(sample);
			expect(serialized).toEqual("\"string?\"");
		});

	});

	describe('arrays', () => {

		test('serialize to json as generated jstn strings', () => {
			let sample = new Types.JSTNArray(new Types.JSTNObject({
				"firstName": new Types.JSTNString(),
				"age": new Types.JSTNNumber(true),
			}));
			let serialized = JSON.stringify(sample);
			expect(serialized).toEqual("\"[{firstName:string;age:number?}]\"");
		});

	});

});