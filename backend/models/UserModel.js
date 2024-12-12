import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const User = db.define(
  "users",
  {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default User;

// Modern Way
// (async () => {
//   await db.sync();
// })();

// (async () => {
//   try {
//     await db.sync();
//     console.log("Database synchronized successfully!");
//   } catch (error) {
//     console.error("Error syncing the database:", error.message);
//   }
// })();

// Traditional Way
async function syncDatabase() {
  await db.sync();
}
syncDatabase();
