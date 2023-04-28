const {client} = require("pg");


const client = new client ({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: 'Abdallah21',
  database: 'postgres',
})

client.connect();

client.query('Select * from book', (err,res) => {
  if (!err) {
    console.log(res.rows);
  }else {
    console.log(err.message);
  }
  client.end;
})