const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const loginRoute = require('./routers/loginRouter');
const recipesRoute = require('./routers/recipesRouter');
const usersRoute = require('./routers/userRouter');
const errorHandler = require('./middlewares/errorHandler');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/login', loginRoute);
app.use('/recipes', recipesRoute);
app.use('/users', usersRoute);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => {
  res.send();
});

app.use(errorHandler);

app.listen(3000, () => console.log('listening on port 3000!'));
