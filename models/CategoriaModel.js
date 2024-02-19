import { DataTypes } from "sequelize";
import { sequelize } from "../database/conexion.js";
export const CategoriaModel=sequelize.define('categorias',{

    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    nombre:{
        type:DataTypes.STRING,
        allowNull:false
    },
    
    estado: {
        type: DataTypes.STRING,
        defaultValue:true
    },
   
},{
    timestamps:false
})
