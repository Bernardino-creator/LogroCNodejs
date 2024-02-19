import express from 'express'
import { store,gastoCategoria,gastos, gastosFecha } from '../controllers/GastoController.js'
const router=express.Router()

router.post('/registrar',store)
router.get('/gastoCategoria',gastoCategoria)
router.get('/gastos',gastos)
router.get('/gastosFecha',gastosFecha)
export const routerGasto=router