const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  port: 3306,
  database: "tai",
});

const api = require("./api");
api(app,connection);

app.listen(3001, () => {
  console.log("服务启动成功:" + `http://localhost:3001/`);
});
