import { DataTypes } from "sequelize";
import { sequelize } from "../database/conexion.js";
import { CategoriaModel } from "./CategoriaModel.js";
export const GastoModel=sequelize.define('gastos',{

    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    descripcion:{
        type:DataTypes.STRING,
        allowNull:false
    },
    monto: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    fechaTransaccion: {
        type: DataTypes.DATE,
                allowNull:false
    },
    estado: {
        type: DataTypes.STRING,
        defaultValue:true
    },
   
},{
    timestamps:false
})
CategoriaModel.hasMany(GastoModel, { foreignKey: "categorias_id" });
GastoModel.belongsTo(CategoriaModel, { foreignKey: "categorias_id" });