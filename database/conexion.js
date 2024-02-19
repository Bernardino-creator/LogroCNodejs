import { Sequelize } from "sequelize";
import { PORT,DB_CONNECTION,DB_HOST,DB_PORT,DB_DATABASE,DB_USERNAME,DB_PASSWORD } from "../config/config.js";

export const sequelize=new Sequelize(DB_DATABASE,DB_USERNAME,DB_PASSWORD,{
    host:DB_HOST,
    dialect:DB_CONNECTION

});