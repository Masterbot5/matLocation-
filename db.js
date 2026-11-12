const Database = required("better-sqlite3");

const db = new Database("gestion.db");
db.pragma("foreign_keys = ON");

module.exports = db;
