function role({ app, connection }) {
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
    let delParams = [req.body.id];
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
  app.post("/api/updaterole",(req,res,next) => {
      const sql = "update role set descs = ? where id = ?"
      let updateRole = [
          req.body.descs,
          req.body.id
      ]
      connection.query(sql,updateRole,(err,results) => {
        if(err) {
            console.log(err);
            
            return res.json({
                code: -2,
                message: '修改失败',
                affextedRows: 0
            })
        }
        res.json({
            code: 200,
            data: results,
            affextedRows: results.affextedRows
        })
      })
  })
}

module.exports = role;
