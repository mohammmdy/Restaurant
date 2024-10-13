const mongoose = require("mongoose");
const { Client } = require("pg");

const connection = () => {
  mongoose
    .connect(process.env.DATABASECONNECTION)
    .then((conn) => {
      console.log(conn.connection.host);
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};
//--------------------------------------------------------------------
const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "135710",
  database: "restaurant",
});

client.connect();


client.query(
  `INSERT INTO person (first_name )VALUES('mohamed');`,
  (err, res) => {
    if (!err) {
      console.log(res.rows);
    } else {
      console.log(err.message);
    }
    client.end;
  }
);

module.exports = connection;
