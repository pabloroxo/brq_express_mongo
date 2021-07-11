const express = require('express');
const swaggerDocs = require('./swagger');
const swaggerUi = require('swagger-ui-express');

const PORT = 3000;
const HOST = '0.0.0.0';

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

require('./controllers/authController')(app);
require('./controllers/usuarioController')(app);
require('./controllers/pokemonController')(app);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, HOST);