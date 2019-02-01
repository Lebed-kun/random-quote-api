const express = require('express');
const quotes = require('../models/quotes');
const randomQuoteRouter = express.Router();

randomQuoteRouter.get('/', (req, res) => {
  res.send('Type /random to get random quote');
});

randomQuoteRouter.get('/random', (req, res) => {
  const randomId = Math.floor(Math.random() * quotes.length);
  res.send(quotes[randomId]);
});

module.exports = randomQuoteRouter;
