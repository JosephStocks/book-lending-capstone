const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/api", (req, res) => {
  res.send("I am an API.");
});

router.post("/addbook", async (req, res) => {
  console.log(req.body);

  let {
    id,
    title,
    authors,
    categories,
    industryIdentifiers,
    description,
    imageLinks,
  } = req.body.book;
  let result = await db.books.create({
    title: title,
    authors: JSON.stringify(authors),
    categories: JSON.stringify(categories),
    isbn: JSON.stringify(industryIdentifiers),
    description: description,
    imageLinks: JSON.stringify(imageLinks),
    googleBookID: id,
  });
  console.log(result);
  res.status(200).json(result);
});

module.exports = router;
