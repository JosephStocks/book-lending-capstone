const express = require("express");
const router = express.Router();
const db = require("../models");
const axios = require("axios");

router.get("/api", (req, res) => {
  res.send("I am an API.");
});

router.post("/addbook", async (req, res) => {
  let book = await addLargerImageLinks(req.body.book);

  let {
    id,
    title,
    authors,
    categories,
    industryIdentifiers,
    description,
    imageLinks,
    publisher,
    publishedDate,
  } = book;

  let result = await db.books.create({
    title,
    publisher,
    publishedDate,
    description,
    googleBookID: id,
    authors: JSON.stringify(authors),
    categories: JSON.stringify(categories),
    isbn: JSON.stringify(industryIdentifiers),
    imageLinks: JSON.stringify(imageLinks),
  });
  // console.log(result);
  res.status(200).json(result);
});

const addLargerImageLinks = async (originalBook) => {
  let { selfLink } = originalBook;

  try {
    let url = new URL(selfLink); //check if it is URL
    let result = await axios.get(selfLink, {
      params: {
        fields: `volumeInfo/imageLinks`,
      },
    });
    let imageLinks = result.data.volumeInfo.imageLinks;
    console.log(imageLinks);
    return { ...originalBook, imageLinks };
  } catch (error) {
    console.error(error);
    return originalBook;
  }
};

module.exports = router;
