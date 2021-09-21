const express = require("express");
const app = express();
const PORT = 3000 || process.env.PORT;
const cors = require("cors");
const router = require("./routes/index");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(router);

app.listen(PORT, () => {
  console.log(`i <3 u ${PORT}`);
});
