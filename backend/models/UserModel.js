import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const User = db.define(
  "users",
  {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    gender: { type: DataTypes.STRING, allowNull: false },
    picture: { type: DataTypes.STRING, allowNull: true },
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
