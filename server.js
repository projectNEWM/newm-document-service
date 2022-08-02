import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import routes from "./routes";

const app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 3000;
app.set("port", port);

app.use("/", routes);

app.listen(port, () => console.log(`server running on port ${port}`));
