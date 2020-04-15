/* 引入api模块 */
const role = require("./role");

function api(app,connection) {
  const params = {app,connection}
  role(params)
}

module.exports = api;
