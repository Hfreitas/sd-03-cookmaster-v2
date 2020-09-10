const express = require('express');
const bodyParser = require('body-parser');
const { userController } = require('./controllers');
const { userValidate, loginValidate } = require('./middlewares/userValidate');

const app = express();

app.use(bodyParser.json());

app.post('/users', userValidate, userController.registerUser);
app.post('/login', loginValidate, userController.loginUser);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => console.log('App listening on port 3000!'));
