import express from "express";
import "dotenv/config";
const app = express();
import cors from 'cors';
const PORT = process.env.PORT || 5001;


// * middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false}))
app.use(cors());


app.get("/", (req, res) => {
  return res.json({ message: "Working fine ..." });
});

// * Routes
import routes from "./routes/index.js"
app.use(routes);

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
