const fs = require("fs");
const db = require("./db");

const script = fs.readFileSync("gestion.sql", "utf8");
db.exec(script);
console.log("Base gestion.db créée");
