const mysql = require('mysql2');
const { db } = require('../config/config');

class Database {

    constructor() {

        this.pool = mysql.createPool({
            host: db.host,
            user: db.user,
            password: db.password,
            database: db.database,
            port: db.port,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        }).promise();
    }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  async query(sql, params) {
    return this.pool.query(sql, params);
  }
}

module.exports = Database;
