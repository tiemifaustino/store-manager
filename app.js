const express = require('express');

const app = express();
app.use(express.json());

const productsRoute = require('./routes/productsRoute');
const errorMidlleware = require('./middlewares/error');

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRoute);

app.use(errorMidlleware);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;