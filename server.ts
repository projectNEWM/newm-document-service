import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import { authorize } from "./middlewares/index.js";
import routes from "./routes/index.js";

// create express app
const app = express();

// add request body parsing middleware
app.use(bodyParser.json());

// add JWT authentication middleware
app.use(authorize);

const port = process.env.PORT;
app.set("port", port);

app.use("v1/", routes);

app.listen(port, () => console.log(`server running on port ${port}`));
