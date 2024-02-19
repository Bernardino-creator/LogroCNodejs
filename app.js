import express from 'express';
import { sequelize } from './database/conexion.js';
import { CategoriaModel } from './models/CategoriaModel.js';
import { GastoModel } from './models/GastoModel.js';
import { routerCategoria } from './routes/Categoria.Route.js';
import { routerGasto } from './routes/GastoRoute.js';
import listEndpoints from 'express-list-endpoints';
import  morgan  from 'morgan';
import cors from 'cors';

const app = express();

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    console.log(`Conexión exitosa a http://localhost:${app.get('port')}`);
});
app.use(cors()); // Asegúrate de que esto venga antes de cualquier definición de ruta

app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Monta el enrutador de categorías en la ruta /api/v0/categorias
app.use('/api/v0', routerCategoria);
app.use('/api/v1', routerGasto);

// Configura CORS

console.log(listEndpoints(app));

const conectado = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: false });
        console.log('Conexión establecida correctamente con la base de datos');
    } catch (error) {
        console.error('No se puede conectar a la base de datos:', error);
    }
};

conectado();
