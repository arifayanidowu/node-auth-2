require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

require("./config/dbconn");

// Import Routes
app.use("/api/user", require("./routes/users"));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`[Server] Listening on port ${PORT}`));
