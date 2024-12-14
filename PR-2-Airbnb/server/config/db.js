const mongoose = require('mongoose');

const connectWithDB = () => {
  mongoose.set('strictQuery', false);
  mongoose
    .connect( "mongodb+srv://pandyabhargav707:kkDrfbI06FXFgCJm@cluster1.okvbl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log(`DB connected successfully`))
    .catch((err) => {
      console.log(`DB connection failed`);
      console.log(err);
      process.exit(1);
    });
};

module.exports = connectWithDB;
