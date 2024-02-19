import { CategoriaModel } from "../models/CategoriaModel.js"
export const categorias=async(req,res)=>{
   try{
    const categoria=await CategoriaModel.findAll()
    if(!categoria){
        res.status(400).json({message:'No hay datos en categoria'})
    }else{
        res.status(200).json({message:'Solicitud procesada con exito',categoria})
    }
   }catch(err){
    res.status(500).json({error:err.message})
   }

}