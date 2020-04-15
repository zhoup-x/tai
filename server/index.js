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

app.get("/api/getrole", (req, res, next) => {
  const sql = "SELECT * FROM role";
  connection.query(sql, (err, results) => {
    if (err) {
      return res.json({
        code: 1,
        message: "用户不存在",
        affextedRows: 0,
      });
    }
    res.json({
      code: 200,
      data: results,
      affextedRows: results.affextedRows,
    });
  });
});

app.post("/api/addrole", (req, res, next) => {
  const sql = "INSERT INTO role SET ?";
  let addUser = {
    name: req.body.name,
    desc: req.body.desc,
  };
  connection.query(sql, addUser, (err, results) => {
    if (err) {
      console.log(err);
      
      return res.json({
        code: -1,
        message: "添加失败",
        affextedRows: 0,
      });
    }
    res.json({
      code: 200,
      data: results,
      affextedRows: results.affextedRows,
    });
  });
});
app.post("/api/delrole", (req, res, next) => {
  const sql = "DELETE FROM role WHERE id = ?";
  let delParams = [req.body.id]
  connection.query(sql, delParams, (err, results) => {
    if (err) {
      console.log(err);
      
      return res.json({
        code: -3,
        message: "删除失败",
        affextedRows: 0,
      });
    }
    res.json({
      code: 200,
      data: results,
      affextedRows: results.affextedRows,
    });
  });
});

app.listen(3001, () => {
  console.log("服务启动成功:" + `http://localhost:3001/`);
});
