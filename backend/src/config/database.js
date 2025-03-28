const mysql = require("mysql2/promise");

class Database {
  static instance = null;

  static async getInstance() {
    if (!Database.instance) {
      Database.instance = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "Student-management",
      });
    }
    return Database.instance;
  }
}

module.exports = Database;
