import mysql from 'mysql2/promise';

class Database {
  private static instance: mysql.Connection;

  private constructor() {}

  public static async getInstance(): Promise<mysql.Connection> {
    if (!this.instance) {
      this.instance = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'Student-management',
        port: parseInt('3306')
      });
    }
    return this.instance;
  }
}

export default Database;