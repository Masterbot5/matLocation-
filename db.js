const fs = require("fs");
const path = require("path");
const Database = require("better-sqlite3");

const dbPath = path.join(__dirname, "gestion.db");
const db = new Database(dbPath);
db.pragma("foreign_keys = ON");

const schema = fs.readFileSync(path.join(__dirname, "gestion.sql"), "utf8");
try {
    db.exec(schema);
} catch (error) {
    if (!/already exists|duplicate/i.test(error.message)) {
        throw error;
    }
}

module.exports = db;
