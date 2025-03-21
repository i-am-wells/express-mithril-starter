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

  async initEmpty() {
    try {
      await this.run(`
        CREATE TABLE users(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT UNIQUE
        );`, []);

      await this.run(`
        CREATE TABLE slideshows(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT UNIQUE,
          userid INTEGER
            REFERENCES users(id) ON DELETE CASCADE,
          created_time INTEGER,
          modified_time INTEGER
        );`, []);

      await this.run(`
        CREATE TABLE images(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          slideshowid INTEGER
            REFERENCES slideshows(id) ON DELETE CASCADE,
          userid INTEGER
            REFERENCES users(id) ON DELETE CASCADE,
          uploaded_time INTEGER,
          image BLOB
        );`, []);

    } catch (err) {
      console.log(`failed to init db: ${err}`);
    }
  }

  async newUser(name) {
    try {
      const result = await this.run(`INSERT INTO users(name) VALUES (?);`, [name]);
      return result.lastID;
    } catch (err) {
      console.log(`failed to add user: ${err}`);
    }
  }

  async newSlideshow(name, userid) {
    const now = Date.now();
    try {
      const result = await this.run(`
        INSERT OR IGNORE INTO slideshows(
          name, userid, created_time, modified_time
        ) VALUES (
          ?, ?, ?, ?
        );`, [name, userid, now, now]);
      if (result.changes === 0) {
        return;
      }
      return result.lastID;
    } catch (err) {
      console.log(`failed to create slideshow: ${err}`);
    }
  }

  async hasSlideshowWithName(name) {
    try {
      const row = await this.get(`
        SELECT COUNT(*) FROM slideshows WHERE name=?;`, [name]);
      return row?.count > 0;
    } catch (err) {
      console.log(`failed to look up slideshows with name ${name}: ${err}`);
      return false;
    }
  }
};

export default Database;