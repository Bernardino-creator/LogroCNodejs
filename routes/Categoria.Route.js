import express from 'express'
const router=express.Router()
import { categorias } from '../controllers/CategoriaController.js'
import listEndpoints from 'express-list-endpoints';

router.get('/categoria',categorias)
console.log(listEndpoints(router));

export const routerCategoria=router