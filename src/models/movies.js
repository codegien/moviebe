const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
	{
		// productId: { type: String, required: false, unique: true },
		title: { type: String, required: true },
		// brand: { type: String, required: true },
		// desc: { type: String, required: true, maxLength: 500 },
		// price: { type: Number, required: true },
		// image: { type: String },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Listings", movieSchema);
