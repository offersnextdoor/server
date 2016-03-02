/**
 * http://usejsdoc.org/
 */
var mysql = require('mysql');

function Connection() {
  this.pool = null;

  this.init = function() {
    this.pool = mysql.createPool({
      connectionLimit: 10,
      host: '52.36.69.181',
      user: 'root',
      password: 'Offers@123',
      database: 'offers_dbo'
    });
  };

  this.acquire = function(callback) {
    this.pool.getConnection(function(err, connection) {
      callback(err, connection);
    });
  };
}

module.exports = new Connection();