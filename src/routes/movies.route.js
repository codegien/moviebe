const express = require("express");

const router = express.Router();

const {
	create,
	update,
	get,
	getOne,
	deleteProduct,
} = require("../controller/movies.controller");

const { productSchema } = require("../middleware/validation-middleware");

const verifyToken = require("../middleware/auth.middleware");

router.post("/create", verifyToken, productSchema, create);
router.put("/update/:id", verifyToken, update);
router.get("/get", get);
// router.get("/get", verifyToken, get);
router.get("/get/:id", verifyToken, getOne);
router.delete("/destroy/:id", verifyToken, deleteProduct);

module.exports = router;
