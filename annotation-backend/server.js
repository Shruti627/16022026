require("dotenv").config();
const express = require("express");
const cors = require("cors");
const annotationRoutes = require("./routes/annotationRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/annotations", annotationRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
