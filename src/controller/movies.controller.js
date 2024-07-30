const productModel = require("../models/movies");
const moviesModel = require("../models/movies");
const asyncHandler = require("express-async-handler");

const { v4: uuidv4 } = require("uuid");

const create = asyncHandler(async (req, res) => {
	try {
		if (req.method === "POST") {
			const { name, brand, desc, price, image } = req.body;
			const productID = uuidv4();

			// create the product payload
			const product = await new productModel({
				productId: productID,
				name: name,
				brand: brand,
				desc: desc,
				price: price,
				image: image,
			});

			product.save();
			return res.status(201).json({
				success: true,
				messages: "go and ask your grand father",
				data: product,
			});
		} else {
			return res.status(405).json({
				err: `${req.method} method not allowed`,
			});
		}
	} catch (error) {
		return res.status(412).json({
			success: false,
			message: error,
		});
	}
});

const update = asyncHandler(async (req, res) => {
	const { id } = req.params;

	const product = await productModel.findOne({ productId: id });

	if (req.method != "PUT") {
		return res.status(405).json({
			err: `${req.method} is not permitted`,
		});
	}
	try {
		if (!product) {
			return res.status(404).json({
				success: false,
				message: "product not found",
			});
		} else {
			product.updateOne(req.body, { useFindAndModify: false }).then((data) => {
				if (!data) {
					res.status(404).send({
						message: `Cannot update product  with id id=${id}`,
					});
				} else {
					return res.status(201).json({
						message: "Product updated successfully",
						data: req.body,
					});
				}
			});
		}
	} catch (error) {
		return res.status(412).send({
			success: false,
			message: error.message,
		});
	}
});

const get = asyncHandler(async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 10;
	const title = req.query.title || "";
	const minRating = parseFloat(req.query.minRating) || 0;

	const query = {
		title: { $regex: title, $options: "i" },
		vote_average: { $gte: minRating },
	};
	const movieslist = await moviesModel
		.find(query)
		.skip((page - 1) * limit)
		.limit(limit);
	const totalMovies = await moviesModel.countDocuments(query);
	return res.status(200).json({
		success: true,
		current_page: page,
		total_pages: Math.ceil(totalMovies / limit),
		total_movies: totalMovies,
		data: movieslist.reverse(),
	});
});

const getOne = asyncHandler(async (req, res) => {
	const { id } = req.params;

	const product = await productModel.find({ productId: id });

	try {
		if (product) {
			return res.status(200).json({
				success: true,
				data: product,
			});
		}
	} catch (err) {
		return res.status(412).send({
			success: false,
			data: err.message,
		});
	}
});

const deleteProduct = asyncHandler(async (req, res) => {
	const { id } = req.params;

	try {
		await productModel.deleteOne({ productId: id });
		const products = await productModel.find();

		return res.status(410).json({
			success: true,
			message: "Successfully deleted",
			data: products,
		});
	} catch (error) {
		return res.status(412).send({
			success: false,
			message: error.message,
		});
	}
});
module.exports = { create, update, get, getOne, deleteProduct };
