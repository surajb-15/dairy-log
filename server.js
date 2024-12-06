const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

mongoose.connect(process.env.DATABASE_URL).then(() => {
  console.log("Database connected sucessfully");
});
//DATABASE=mongodb://localhost:27017/tour-test?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false

app.listen(8000, (err) => {
  if (err) console.log("can not able to connect " + err);
  else console.log("listening to port 8000");
});
