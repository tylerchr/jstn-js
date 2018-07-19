function isValid(type, jsValue) {
	return type.validate(jsValue);
}

function isValidString(type, jsValue) {
	if (typeof(jsValue) === "string") {
		return true;
	} else if (jsValue === null || jsValue === undefined) {
		if (type.Optional) {
			return true;
		} else {
			console.error("validation failed: string: got null for required value");
			return false;
		}
	}
	console.error("validation failed: string: unexpected type " + typeof(jsValue));
	return false;
}

function isValidNumber(type, jsValue) {
	if (typeof(jsValue) === "number") {
		return (!Number.isNaN(jsValue) && jsValue !== Infinity && jsValue != -Infinity)
	} else if (jsValue === null || jsValue === undefined) {
		if (type.Optional) {
			return true;
		} else {
			console.error("validation failed: number: got null for required value");
			return false;
		}
	}
	console.error("validation failed: number: unexpected type " + typeof(jsValue));
	return false;
}

function isValidBoolean(type, jsValue) {
	if (typeof(jsValue) === "boolean") {
		return true;
	} else if (jsValue === null || jsValue === undefined) {
		if (type.Optional) {
			return true;
		} else {
			console.error("validation failed: boolean: got null for required value");
			return false;
		}
	}
	console.error("validation failed: boolean: unexpected type " + typeof(jsValue));
	return false;
}

function isValidNull(type, jsValue) {
	if (jsValue === null) {
		return true;
	} else if (jsValue === undefined) {
		if (type.Optional) {
			return true;
		} else {
			console.error("validation failed: null: got null for required value");
			return false;
		}
	}
	console.error("validation failed: null: unexpected type " + typeof(jsValue));
	return false;
}

function isValidArray(type, jsValue) {
	if (Array.isArray(jsValue)) {

		// it's valid if all the children are of the specified child type
		return jsValue.reduce((accum, child) => {
			if (!type.Items) {
				console.error("validation failed: array: array is not empty");
				return false;
			}
			if (!isValid(type.Items, child)) {
				console.error("validation failed: array: invalid sub-element");
				return false;
			}
			return accum;
		}, true);

	} else if (jsValue === null || jsValue === undefined) {
		if (type.Optional) {
			return true;
		} else {
			console.error("validation failed: array: got null for required value");
			return false;
		}
	}
	console.error("validation failed: array: unexpected type " + typeof(jsValue));
	return false;
}

function isValidObject(type, jsValue) {
	if (jsValue === Object(jsValue)) {

		// note which properties we need to find
		let necessaryProps = {};
		Object.keys(type.Properties).forEach((key) => {
			necessaryProps[key] = true;
		})

		// iterate through all keys
		for (let key in jsValue) {
			if (jsValue.hasOwnProperty(key)) {

				if (!necessaryProps[key]) {
					console.error("validation failed: object: contains undeclared property");
					return false;
				}

				// mark this property as visited
				delete necessaryProps[key];

				if (!isValid(type.Properties[key], jsValue[key])) {
					console.error("validation failed: object: invalid sub-element");
					return false;
				}
			}
		}

		// make sure that any not-located properties were optional
		return Object.keys(necessaryProps).reduce((accum, key) => {
			if (!type.Properties[key].Optional) {
				console.error("validation failed: object: missing required property: " + key);
				return false;
			}
			return accum;
		}, true);

	} else if (jsValue === null || jsValue === undefined) {
		if (type.Optional) {
			return true;
		} else {
			console.error("validation failed: object: got null for required value");
			return false;
		}
	}
	console.error("validation failed: object: unexpected type " + typeof(jsValue));
	return false;
}

export {
	isValid,
	isValidString,
	isValidNumber,
	isValidBoolean,
	isValidNull,
	isValidArray,
	isValidObject
};