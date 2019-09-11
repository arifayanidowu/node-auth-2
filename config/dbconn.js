const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log(`[MongoDB] Connected to Mongodb database successfully`);
  })
  .catch(err => console.log(`[MongoDB Failed]: ${err}`));
