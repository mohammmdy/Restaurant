const mongoose = require("mongoose");

const connection = () => {
  mongoose
    .connect(process.env.DATABASECONNECTION)
    .then((conn) => {
      console.log(conn.connection.host);
    })
    .catch((err) => {
      console.log(err);
      process.exit(1)
    });
};

module.exports = connection

