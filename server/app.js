const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
//Handlebar Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//How middleware works
app.use((req, res, next) => {
  req.startTime = Date.now();
  next();
});

//GET '/'
app.get('/', (req, res) => {
  res.send('Salam');
  req.time = Date.now() - req.startTime;
  console.log(`${req.method} ${req.originalUrl} ${req.time}(ms)`);
});

const port = 5000;

app.listen(port, () => {
  console.log(`Server starts on port ${port}`);
});
