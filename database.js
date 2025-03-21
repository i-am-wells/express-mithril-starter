import { promisify } from 'node:util';
import sq3 from 'sqlite3'
const sqlite3 = sq3.verbose();

class Database {
  constructor() {
    this.db = new sqlite3.Database(':memory:');

    // Promise-based wrappers for sqlite3 Database methods
    this.get = promisify(this.db.get.bind(this.db));
    this.run = promisify((sql, params, callback) => {
      this.db.run(sql, params, function (err) {
        callback(err, this);
      });
    });
  }

  close() {
    this.db.close();
  }
};

export default Database;