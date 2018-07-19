import { Kinds } from './type.js';

class Generator {

	constructor(pretty, indentation = "  ") {
		this.pretty = pretty;
		this.indentation = typeof indentation === 'string' ? indentation : "  ";
	}

	generate(type, depth) {

		var output = "";

		const writePretty = (s) => {
			if (this.pretty && Object.keys(type.Properties).length > 0) {
				output += s;
			}
		}

		switch (type.Kind) {
			case Kinds.String:
				output += "string"
				break;
			case Kinds.Number:
				output += "number"
				break;
			case Kinds.Boolean:
				output += "boolean"
				break;
			case Kinds.Null:
				output += "null"
				break;
			case Kinds.Object:
				output += "{";
				writePretty("\n");
				Object.keys(type.Properties).forEach((propertyName, i, all) => {
					writePretty(this.indentation.repeat(depth + 1));

					// token: name
					output += propertyName;

					// token: name-separator
					output += ":";
					writePretty(" ");

					// token: member
					output += this.generate(type.Properties[propertyName], depth + 1);

					// token: delimiter
					writePretty("\n");
					if (!this.pretty && i < all.length - 1) {
						output += ";";
					}
				});
				writePretty(this.indentation.repeat(depth));
				output += "}";
				break;
			case Kinds.Array:
				output += "[";
				if (type.Items !== undefined) {
					output += this.generate(type.Items, depth);
				}
				output += "]";
				break;
			default:
				console.warn("got unrecognized kind: " + type.Kind);
		}

		if (type.Optional === true) {
			output = output + "?";
		}

		return output;

	}

}

export default function generate(type, pretty = false) {
	let g = new Generator(pretty);
	return g.generate(type, 0);
}