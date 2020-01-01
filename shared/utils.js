const toCamelCase = name =>
	name.toLowerCase().replace(/(_[a-z])/g, (_, letter) => letter[1].toUpperCase());

const createActions = config =>
	Object.keys(config)
		.map(key => ({
			type: key,
			fn: config[key]
		}))
		.reduce((prev, curr) => {
			const fn = (...args) => ({
				type: curr.type,
				payload: curr.fn(...args)
			});
			fn.toString = () => curr.type;
			return {
				...prev,
				[toCamelCase(curr.type)]: fn
			};
		}, {});

module.exports = {
	createActions
};
