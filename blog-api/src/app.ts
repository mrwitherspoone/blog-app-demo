import express from "express";
import bodyParser from "body-parser";
import router from "./routes";
import cors from "cors"

const app = express();
const PORT = process.env.PORT || 3000;
const allowedOrigins = ['http://localhost:5000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};
app.use(cors(options));

app.use(bodyParser.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});