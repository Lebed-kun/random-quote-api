const express = require('express');
const bodyParser = require('body-parser');
const randomQuoteRouter = express.Router();

const Promise = require('bluebird');
const AppDAO = require('../models/dao');
const QuotesRepository = require('../models/quotes_repository');

const dao = new AppDAO('./quotes.sqlite3');
const quotesRepository = new QuotesRepository(dao);

randomQuoteRouter.use(bodyParser.urlencoded({ extended: false }));
randomQuoteRouter.use(bodyParser.json());

randomQuoteRouter.get('/', (req, res) => {
  quotesRepository.createTable()
    .then(() => {
      res.send('Type /random to get random quote');
    })
    .catch(err => {
      console.log('Error: ');
      console.log(JSON.stringify(err));
      res.status(500).send();
    })
});

randomQuoteRouter.get('/random', (req, res) => {
  quotesRepository.getRandomQuote()
    .then(quoteBlock => {
      console.log(quoteBlock);
      res.send({ quote : quoteBlock.quote, author : quoteBlock.author });
    })
    .catch(err => {
      console.log('Error: ');
      console.log(JSON.stringify(err));
      res.status(404).send();
    });
});

randomQuoteRouter.get('/new-quote', (req, res) => {
  res.sendFile(__dirname + '/view/new_quote.html');
});

randomQuoteRouter.post('/add-quote', (req, res) => {
  const quote = req.body.quote;
  const author = req.body.author;

  quotesRepository.create(quote, author)
    .then(() => {
      res.send('Quote added successfully!');
    })
    .catch(err => {
      console.log('Error: ');
      console.log(JSON.stringify(err));
      res.status(400).send();
    });
});

randomQuoteRouter.get('/delete-quote', (req, res) => {
  res.sendFile(__dirname + '/view/delete-quote.html');
});

randomQuoteRouter.delete('/delete', (req, res) => {
  const id = req.body.id;

  quotesRepository.delete(id)
    .then(() => {
      res.send('Quote deleted successfully');
    })
    .catch(err => {
      console.log('Error: ');
      console.log(JSON.stringify(err));
      res.status(400).send();
    })
})

module.exports = randomQuoteRouter;
