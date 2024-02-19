import { Op } from "sequelize"
import { CategoriaModel } from "../models/CategoriaModel.js"
import { GastoModel } from "../models/GastoModel.js"
import { sequelize } from "../database/conexion.js"

export const store=async(req,res)=>{
    try {
        
        const {descripcion,monto,fechaTransaccion,categorias_id}=req.body
        if(!descripcion||!monto||!fechaTransaccion||!categorias_id){
            return res.status(400).json({messageF:'todos los campos son requeridos'})
        }
        if(monto<1){
            return res.status(400).json({messageE:'monto debe ser mayor a 0'})
        }
       
        const gastos=await GastoModel.create({
            descripcion:descripcion,
            monto:monto,
            fechaTransaccion:fechaTransaccion,
            categorias_id:categorias_id
        })
       
      return res.status(201).json({message:'usuario creado exitosamente',gastos:gastos})
    
    } catch (error) {
            return res.status(500).json({error:error.message})
    
    }    
    }
    export const gastoCategoria = async (req, res) => {
        try {
            const gastosConCategoria = await GastoModel.findAll({
                include: [{
                    model: CategoriaModel,
                    attributes: ['nombre'], // Asegúrate de que este atributo es correcto y existe en tu modelo de CategoriaModel.
                }],
                attributes: ['descripcion', 'monto', 'fechaTransaccion', 'estado'], // Excluimos 'categorias_id'
            });
    
            if (gastosConCategoria.length > 0) {
                // Mapear los resultados para ajustar el formato
                const resultado = gastosConCategoria.map(gasto => {
                    let gastoJson = gasto.toJSON();
                    // Asegurarse de que la categoría está incluida y tiene el atributo 'nombre'
                    if (gasto.CategoriaModel && gasto.CategoriaModel.nombre) {
                        gastoJson.nombreCategoria = gasto.CategoriaModel.nombre;
                    } else {
                        gastoJson.nombreCategoria = 'Categoría no encontrada';
                    }
                    return gastoJson;
                });
    
                return res.status(200).json(resultado);
            } else {
                return res.status(404).json({message: 'No se encontraron gastos'});
            }
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    };
    export const gastos = async (req, res) => {
        try {
            // Obtenemos todos los gastos de la base de datos
            const todosLosGastos = await GastoModel.findAll({
                attributes: [ 'descripcion', 'monto', 'fechaTransaccion'] // Especificamos los atributos que queremos obtener
            });
    
            // Verificamos si se encontraron gastos
            if (todosLosGastos && todosLosGastos.length > 0) {
                return res.status(200).json({gastos:todosLosGastos}); // Enviamos los gastos encontrados como respuesta
            } else {
                return res.status(404).json({ message: 'No se encontraron gastos' }); // Mensaje de no encontrado
            }
        } catch (error) {
            // Manejo de errores en caso de que algo falle durante la consulta a la base de datos
            return res.status(500).json({ error: error.message });
        }
    };
    export const gastosFecha = async (req, res) => {
        try {
            // Obtenemos la fecha de los parámetros de la consulta
            const { fechaTransaccion } = req.query;
            console.log(req.query)
            // Verificamos que la fecha haya sido proporcionada
            if (!fechaTransaccion) {
                return res.status(400).json({ message: "La fecha es requerida" });
            }
    
            // Buscamos los gastos que coincidan con la fecha proporcionada
            const gastosPorFecha = await GastoModel.findAll({
                where: {
                  // Compara solo la parte de la fecha, ignorando la hora
                  fechaTransaccion: sequelize.where(sequelize.fn('DATE', sequelize.col('fechaTransaccion')), '=', fechaTransaccion)
                },
                attributes: ['descripcion', 'monto', 'fechaTransaccion'] // Atributos que quieres obtener
              });
            console.log(gastosPorFecha)
    
            // Verificamos si se encontraron gastos
            if (gastosPorFecha && gastosPorFecha.length > 0) {
                return res.status(200).json({gastosfecha:gastosPorFecha}); // Enviamos los gastos encontrados como respuesta
            } else {
                return res.status(404).json({ message: 'No se encontraron gastos para la fecha proporcionada' }); // Mensaje de no encontrado
            }
        } catch (error) {
            // Manejo de errores en caso de que algo falle durante la consulta a la base de datos
            return res.status(500).json({ error: error.message });
        }
    };