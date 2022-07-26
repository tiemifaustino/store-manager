const express = require('express');
require('express-async-errors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger.json');
const productsRoute = require('./routes/products.routes');
const salesRoute = require('./routes/sales.routes');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/products', productsRoute);
app.use('/sales', salesRoute);

app.use((err, _req, res, _next) => {
  const { name, message, type } = err;
  switch (name) {
    case 'ValidationError':
      if (type === 'string.min' || type === 'number.min') return res.status(422).json({ message });
      res.status(400).json({ message }); // bad request
      break;
    case 'NotFoundError':
      res.status(404).json({ message }); // not found
      break;
    default:
      console.warn(err);
      res.sendStatus(500);
      break;
  }
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;