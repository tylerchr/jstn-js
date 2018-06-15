import Tokenizer from './scanner.js';

test('tokenizing sample text works', () => {

	let writtenCollectionSchema = `{
		author: {
			penName: string?
		}
		works: [{
			title: string
			language: string
			pageCount: number?
		}]
	}
	`

	let tokens = [];
	for (let token of new Tokenizer(writtenCollectionSchema).tokens()) {
		tokens.push(token);
	}

	let expectation = [
		{ Token: 'CURLYOPEN', Value: '{' },
		{ Token: 'NEWLINE', Value: '\n' },
		{ Token: 'WHITESPACE', Value: '\t\t' },
		{ Token: 'IDENT', Value: 'author' },
		{ Token: 'COLON', Value: ':' },
		{ Token: 'WHITESPACE', Value: ' ' },
		{ Token: 'CURLYOPEN', Value: '{' },
		{ Token: 'NEWLINE', Value: '\n' },
		{ Token: 'WHITESPACE', Value: '\t\t\t' },
		{ Token: 'IDENT', Value: 'penName' },
		{ Token: 'COLON', Value: ':' },
		{ Token: 'WHITESPACE', Value: ' ' },
		{ Token: 'STRING', Value: 'string' },
		{ Token: 'QUESTION', Value: '?' },
		{ Token: 'NEWLINE', Value: '\n' },
		{ Token: 'WHITESPACE', Value: '\t\t' },
		{ Token: 'CURLYCLOSE', Value: '}' },
		{ Token: 'NEWLINE', Value: '\n' },
		{ Token: 'WHITESPACE', Value: '\t\t' },
		{ Token: 'IDENT', Value: 'works' },
		{ Token: 'COLON', Value: ':' },
		{ Token: 'WHITESPACE', Value: ' ' },
		{ Token: 'SQUAREOPEN', Value: '[' },
		{ Token: 'CURLYOPEN', Value: '{' },
		{ Token: 'NEWLINE', Value: '\n' },
		{ Token: 'WHITESPACE', Value: '\t\t\t' },
		{ Token: 'IDENT', Value: 'title' },
		{ Token: 'COLON', Value: ':' },
		{ Token: 'WHITESPACE', Value: ' ' },
		{ Token: 'STRING', Value: 'string' },
		{ Token: 'NEWLINE', Value: '\n' },
		{ Token: 'WHITESPACE', Value: '\t\t\t' },
		{ Token: 'IDENT', Value: 'language' },
		{ Token: 'COLON', Value: ':' },
		{ Token: 'WHITESPACE', Value: ' ' },
		{ Token: 'STRING', Value: 'string' },
		{ Token: 'NEWLINE', Value: '\n' },
		{ Token: 'WHITESPACE', Value: '\t\t\t' },
		{ Token: 'IDENT', Value: 'pageCount' },
		{ Token: 'COLON', Value: ':' },
		{ Token: 'WHITESPACE', Value: ' ' },
		{ Token: 'NUMBER', Value: 'number' },
		{ Token: 'QUESTION', Value: '?' },
		{ Token: 'NEWLINE', Value: '\n' },
		{ Token: 'WHITESPACE', Value: '\t\t' },
		{ Token: 'CURLYCLOSE', Value: '}' },
		{ Token: 'SQUARECLOSE', Value: ']' },
		{ Token: 'NEWLINE', Value: '\n' },
		{ Token: 'WHITESPACE', Value: '\t' },
		{ Token: 'CURLYCLOSE', Value: '}' },
		{ Token: 'NEWLINE', Value: '\n' },
		{ Token: 'WHITESPACE', Value: '\t' }
	];

	expect(tokens).toEqual(expectation);
});
