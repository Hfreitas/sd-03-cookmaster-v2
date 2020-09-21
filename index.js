const express = require('express');
const bodyParser = require('body-parser');

const recipeRoute = require('');
const userRoute = require('');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => {
  res.send();
});

app.listen(3000, () => console.log('listening on port 3000!'));
