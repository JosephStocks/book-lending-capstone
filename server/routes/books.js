const express = require("express");
const router = express.Router();
const db = require("../models");
const axios = require("axios");
// auth
const passport = require('passport');
require('../auth/passAuth'); //import all of passport auth strategy

// jwt auth
let requireAuth = passport.authenticate('jwt', { session: false });


router.get("/ownedbooks", async (req, res) => {

  let userID = req.params.userID;
  res.status(200).json(await showAllOwnedBooksByUser(userID));
});

router.get("/readbooks/:userID", async (req, res) => {
  let userID = req.params.userID;
  res.status(200).json(await showAllReadBooksByUser(userID));
});

router.get("/wantbooks/:userID", async (req, res) => {
  let userID = req.params.userID;
  res.status(200).json(await showAllWantToReadBooksByUser(userID));
});

router.post("/books", requireAuth, async (req, res) => {


  console.log(req.user.id)
  console.log(req.body.bookid);
  res.send('hi')


  // let book = await addLargerImageLinks(req.body.book);
  // let result = await createBookEntry(book);
  // console.log(result);
  // res.status(200).json(result);
});

router.delete("/books", async (req, res) => {
  let result = deleteBookByAnyID(req.body);

  console.log(result);
  res.status(200).json(result);
});

const showAllOwnedBooksByUser = async (userID) => {
  return await showSpecifiedBookListByUser(db.OwnedBooks, userID);
};

const showAllReadBooksByUser = async (userID) => {
  return await showSpecifiedBookListByUser(db.ReadBooks, userID);
};
const showAllWantToReadBooksByUser = async (userID) => {
  return await showSpecifiedBookListByUser(db.WantToReadBooks, userID);
};

const showSpecifiedBookListByUser = async (dbTableModel, userID) => {
  return await dbTableModel.findAll({
    where: {
      userID: userID,
    },
    include: [
      {
        model: db.books,
      },
    ],
    raw: true,
  });
};

// Delete by database id OR by googleID
const deleteBookByAnyID = async ({ idType, id }) => {
  return await db.books.destroy({
    where: {
      [idType]: id,
    },
  });
};

const deleteBookByID = async (id) => {
  return await db.books.destroy({
    where: {
      id: id,
    },
  });
};

const deleteBookByGoogleBookID = async (googleBookID) => {
  return await db.books.destroy({
    where: {
      googleBookID: googleBookID,
    },
  });
};

const createBookEntry = async (book) => {
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

  return await db.books.create({
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
};

const findOrCreateBookEntry = async (book) => {
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

  return await db.books.findOrCreate({
    where: {
      googleBookID: id,
    },
    defaults: {
      title,
      publisher,
      publishedDate,
      description,
      authors: JSON.stringify(authors),
      categories: JSON.stringify(categories),
      isbn: JSON.stringify(industryIdentifiers),
      imageLinks: JSON.stringify(imageLinks),
    },
  });
};

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
