const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

let db;

module.exports.initDb = async () => {
    // open the database
    if (!db) {
        db = await open({
            filename: 'database.db', // имя и путь к БД
            driver: sqlite3.Database
        })
    }

    await db.exec(`
        CREATE TABLE IF NOT EXISTS inventory (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            serial_number TEXT,
            inventory_number TEXT,
            office INTEGER,
            comment TEXT
        )`);

    // await db.exec(`
    //     CREATE TABLE IF NOT EXISTS tokens (
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         userId INTEGER NOT NULL,
    //         token TEXT NOT NULL
    //     )`);
};

module.exports.getDb = () => db;

/*-------------------------------*/