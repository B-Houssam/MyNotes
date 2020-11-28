import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = 'Notes.db';
const database_version = '1.0';
const database_displayname = 'SQLite React Offline Database';
const database_size = 200000;

export default class Database {
  initDB() {
    let db;
    return new Promise((resolve) => {
      console.log('Plugin integrity check ...');
      SQLite.echoTest()
        .then(() => {
          console.log('Integrity check passed ...');
          console.log('Opening database ...');
          SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size,
          )
            .then((DB) => {
              db = DB;
              console.log('Database OPEN');
              db.executeSql('SELECT 1 FROM Notes LIMIT 1')
                .then(() => {
                  console.log('Database is ready ... executing query ...');
                })
                .catch((error) => {
                  console.log('Received error: ', error);
                  console.log('Database not yet ready ... populating data');
                  db.transaction((tx) => {
                    tx.executeSql(
                      'CREATE TABLE IF NOT EXISTS Notes (title, body, date, cat, location, image)',
                    );
                  })
                    .then(() => {
                      console.log('Table created successfully');
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                });
              resolve(db);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log('echoTest failed - plugin not functional');
        });
    });
  }

  closeDatabase(db) {
    if (db) {
      console.log('Closing DB');
      db.close()
        .then((status) => {
          console.log('Database CLOSED');
        })
        .catch((error) => {
          this.errorCB(error);
        });
    } else {
      console.log('Database was not OPENED');
    }
  }

  listNote() {
    return new Promise((resolve) => {
      const notes = [];
      this.initDB()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql(
              'SELECT p.title, p.body, p.date, p.cat, p.location, p.image FROM Notes p',
              [],
            ).then(([tx, results]) => {
              console.log('Query completed');
              var len = results.rows.length;
              for (let i = 0; i < len; i++) {
                let row = results.rows.item(i);
                const {title, body, cat, date, location, image} = row;
                notes.push({
                  title,
                  body,
                  cat,
                  date,
                  location,
                  image,
                });
              }
              console.log(notes);
              resolve(notes);
            });
          })
            .then((result) => {
              this.closeDatabase(db);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  listCat(cat) {
    return new Promise((resolve) => {
      const notes = [];
      this.initDB()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql(
              'SELECT p.title, p.body, p.date, p.cat, p.location, p.image FROM Notes p WHERE p.date = ?',
              [cat],
            ).then(([tx, results]) => {
              console.log('Query completed');
              var len = results.rows.length;
              for (let i = 0; i < len; i++) {
                let row = results.rows.item(i);
                const {title, body, cat, date, location, image} = row;
                notes.push({
                  title,
                  body,
                  cat,
                  date,
                  location,
                  image,
                });
              }
              console.log(notes);
              resolve(notes);
            });
          })
            .then((result) => {
              this.closeDatabase(db);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  NotesByTitle(title) {
    console.log(title);
    return new Promise((resolve) => {
      this.initDB()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql('SELECT * FROM Notes WHERE title = ?', [title]).then(
              ([tx, results]) => {
                console.log(results);
                if (results.rows.length > 0) {
                  let row = results.rows.item(0);
                  resolve(row);
                }
              },
            );
          })
            .then((result) => {
              this.closeDatabase(db);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  addNote(note) {
    return new Promise((resolve) => {
      this.initDB()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql('INSERT INTO Notes VALUES (?, ?, ?, ?, ?, ?)', [
              note.title,
              note.body,
              note.cat,
              note.date,
              note.location,
              note.image,
            ]).then(([tx, results]) => {
              resolve(results);
            });
          })
            .then((result) => {
              this.closeDatabase(db);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  updateNote(title, note) {
    return new Promise((resolve) => {
      this.initDB()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql(
              'UPDATE Notes SET title = ?, body = ?, cat = ?, date = ?, location = ?, image = ? WHERE title = ?',
              [
                note.title,
                note.body,
                note.date,
                note.cat,
                note.location,
                note.image,
                title,
              ],
            ).then(([tx, results]) => {
              resolve(results);
            });
          })
            .then((result) => {
              this.closeDatabase(db);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  deleteNote(title) {
    return new Promise((resolve) => {
      this.initDB()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql('DELETE FROM Notes WHERE title = ?', [title]).then(
              ([tx, results]) => {
                console.log(results);
                resolve(results);
              },
            );
          })
            .then((result) => {
              this.closeDatabase(db);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
}
