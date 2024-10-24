const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5050;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json({ message: "Welcome to the Christmas Trees application." });
});

const itemRoutes = require("./routes/item.routes");
app.use('/api/items', itemRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
