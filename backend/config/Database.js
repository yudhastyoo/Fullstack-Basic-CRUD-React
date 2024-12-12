import { Sequelize } from "sequelize";

const db = new Sequelize("crud_db", "yudha", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
