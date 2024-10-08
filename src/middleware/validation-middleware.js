const validator = require("../utils/validate");

// product validator
const productSchema = async (req, res, next) => {
	const validateRule = {
		name: "required|string",
		brand: "required|string",
		desc: "required|string|min:10",
		price: "required",
	};
	await validator(req.body, validateRule, {}, (err, status) => {
		if (!status) {
			res.status(412).send({
				success: false,
				messages: "validation failed",
				data: err,
			});
		} else {
			next();
		}
	}).catch((err) => console.log(err));
};

module.exports = { productSchema };
