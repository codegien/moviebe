const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
const cors = require("cors");
const connectDB = require("./src/config/db_config");
require("dotenv").config();

const products = require("./src/data/products");
const auth = require("./src/routes/auth.routes");
const movies = require("./src/routes/movies.route");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api-docs/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
console.log(process.env.PORT);

app.get("/", (req, res) => {
	res.send("Welcome");
});
app.use("/api/v1/auth", auth);
app.use("/api/v1/movies", movies);
// app.post("/login", loginValidation, login);
// app.get("/products", (req, res) => {
// 	res.send(products);
// });

connectDB();
app.listen(process.env.PORT, () => {
	console.log(`Server is running on port: ${process.env.PORT}...`);
});
