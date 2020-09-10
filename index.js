const express = require('express');
const bodyParser = require('body-parser');
const controllerUser = require('./users/controllerUsers');

const app = express();
app.use(bodyParser.json());
app.use('/users', controllerUser);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// app.post('/', controllerUser);

app.listen(3000, () => console.log('Welcome 3000'));
