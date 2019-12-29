const mysql = require("mysql");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "reachat"
});

const DB = (function() {
  function _query(query, params) {
    return new Promise((resolve, reject) => {
      pool.getConnection(function(err, connection) {
        if (err) {
          connection.destroy();
          reject(err);
        }

        connection.query(query, params, function(err, rows) {
          connection.destroy();
          if (!err) {
            resolve(JSON.parse(JSON.stringify(rows)));
          } else {
            reject(err);
          }
        });

        connection.on("error", function(err) {
          connection.destroy();
          reject(err);
        });
      });
    });
  }

  return {
    query: _query
  };
})();

module.exports = DB;
