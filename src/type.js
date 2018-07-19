import {
	isValidString,
	isValidNumber,
	isValidBoolean,
	isValidNull,
	isValidArray,
	isValidObject,
} from './validator.js';

const Kinds = {
	String: "String",
	Number: "Number",
	Boolean: "Boolean",
	Null: "Null",
	Object: "Object",
	Array: "Array"
};

class JSTNType {

	constructor(kind, { optional, properties, items }) {
		this.Kind = kind;
		if (typeof optional === 'boolean') {
			this.Optional = optional;
		}
		if (properties !== undefined) {
			this.Properties = properties;
		}
		if (items !== undefined) {
			this.Items = items;
		}
	}

}

class JSTNString extends JSTNType {
	constructor(optional) { super(Kinds.String, { optional }); }
	validate(jsValue) { return isValidString(this, jsValue); }
}

class JSTNNumber extends JSTNType {
	constructor(optional) { super(Kinds.Number, { optional }); }
	validate(jsValue) { return isValidNumber(this, jsValue); }
}

class JSTNBoolean extends JSTNType {
	constructor(optional) { super(Kinds.Boolean, { optional }); }
	validate(jsValue) { return isValidBoolean(this, jsValue); }
}

class JSTNNull extends JSTNType {
	constructor(optional) { super(Kinds.Null, { optional }); }
	validate(jsValue) { return isValidNull(this, jsValue); }
}

class JSTNArray extends JSTNType {
	constructor(items, optional) { super(Kinds.Array, { optional, items }); }
	validate(jsValue) { return isValidArray(this, jsValue); }
}

class JSTNObject extends JSTNType {
	constructor(properties = {}, optional) { super(Kinds.Object, { optional, properties }); }
	validate(jsValue) { return isValidObject(this, jsValue); }
}

const Types = {
	JSTNString,
	JSTNNumber,
	JSTNBoolean,
	JSTNNull,
	JSTNArray,
	JSTNObject,
}

export { Kinds, JSTNType };

export default Types;