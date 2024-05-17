//importacion del express
const express = require('express');
const cors = require('cors');
const {dbConnection} = require('./database/config.db');

//importar rutas
const librosRoutes = require('./routes/libro.route');

//conexion a la base de datos
dbConnection();

//inicializar variables de express
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

//lectura y parseo del body
app.use(express.json());

//rutas
app.use('/api/libros', librosRoutes);

//rutas de prueba

app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        message: 'Peticion realizada correctamente'
    }) 
});

//escuchar peticiones
app.listen(port, () => {
    console.log(`Express Server Puerto: ${port}:\x1b[32m%s\x1b[0m`, 'online');
});