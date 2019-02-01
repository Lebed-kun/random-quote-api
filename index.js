const express = require('express')
const app = express();
const port = 3000;

const randomQuoteRouter = require('./src/routes/random_quote');

app.use('/', randomQuoteRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
