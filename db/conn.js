const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const DB = process.env.DATABASE;
mongoose
  .connect(DB)
  .then(() => {
    console.log(`database connected successfully...`);
  })
  .catch((e) => {
    console.log(`oops database not connected "some error occured"`);
  });
