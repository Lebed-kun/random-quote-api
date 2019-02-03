class QuotesRepository {
  constructor(dao) {
    this.dao = dao;
  }

  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS quotes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      quote TEXT NOT NULL,
      author TEXT NOT NULL
    )`;
    return this.dao.run(sql);
  }

  create(quote, author) {
    return this.dao.run('INSERT INTO quotes (quote, author) VALUES (?, ?)', [quote, author]);
  }

  update(quoteBlock) {
    const { id, quote, author } = quoteBlock;
    return this.dao.run(
      `UPDATE quotes
      SET quote = ?,
        author = ?
      WHERE id = ?`,
      [quote, author, id]
    );
  }

  delete(id) {
    return this.dao.run(
      `DELETE FROM quotes WHERE id = ?`,
      [id]
    );
  }

  getById(id) {
    return this.dao.get(
      `SELECT * FROM quotes WHERE id = ?`,
      [id]
    );
  }

  getQuotes() {
    return this.dao.all(`SELECT * FROM quotes`);
  }

  countQuotes() {
    return this.dao.get('SELECT count(*) FROM quotes');
  }

  getRandomQuote() {
    return this.dao.get('SELECT * FROM quotes ORDER BY RANDOM() LIMIT 1');
  }
}

module.exports = QuotesRepository;
