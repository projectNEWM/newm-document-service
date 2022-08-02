import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import routes from "./routes.js";

// create express app
const app = express();

// add request body parsing middleware
app.use(bodyParser.json());

const port = process.env.PORT;
app.set("port", port);

app.use("/", routes);

app.listen(port, () => console.log(`server running on port ${port}`));
