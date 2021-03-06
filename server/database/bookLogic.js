const db = require("../models");
const axios = require("axios");

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

const deleteBookFromPersonalLists = async (
  dbPersonalBookTableModel,
  userID,
  bookID
) => {
  return await dbPersonalBookTableModel.destroy({
    where: {
      bookID: bookID,
      userID: userID,
    },
  });
};

const deleteFromPersonalListFunctionMapping = {
  owned: async (userID, bookID) =>
    await deleteBookFromPersonalLists(db.OwnedBooks, userID, bookID),
  read: async (userID, bookID) =>
    await deleteBookFromPersonalLists(db.ReadBooks, userID, bookID),
  want: async (userID, bookID) =>
    await deleteBookFromPersonalLists(db.WantToReadBooks, userID, bookID),
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
  let { id } = book;

  let results = await db.books.findAll({
    where: {
      googleBookID: id,
    },
  });

  if (results.length === 0) {
    book = await addLargerImageLinks(book);
    return await createBookEntry(book);
  } else {
    return results[0];
  }
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
    return { ...originalBook, imageLinks };
  } catch (error) {
    console.error(error);
    return originalBook;
  }
};

const findOrCreatePersonalListFunctionMapping = {
  owned: async (userID, bookID) =>
    await findOrCreatePersonalListEntry(db.OwnedBooks, userID, bookID),
  read: async (userID, bookID) =>
    await findOrCreatePersonalListEntry(db.ReadBooks, userID, bookID),
  want: async (userID, bookID) =>
    await findOrCreatePersonalListEntry(db.WantToReadBooks, userID, bookID),
};

const findOrCreatePersonalListEntry = async (dbTableModel, userID, bookID) => {
  return await dbTableModel.findOrCreate({
    where: {
      userID: userID,
      bookID: bookID,
    },
  });
};

const showUsersWhoOwnBook = async (bookID) => {
  return await db.OwnedBooks.findAll({
    where: {
      bookID: bookID,
    },
    attributes: ["userID", "bookID", "lendToID"],
    include: [
      {
        as: "owner",
        model: db.user,
        attributes: ["id", "firstName", "lastName", "email", "googleAuth"],
      },
      {
        model: db.books,
        attributes: [
          "id",
          "title",
          "authors",
          "categories",
          "isbn",
          "description",
          "imageLinks",
          "googleBookID",
          "publisher",
          "publishedDate",
        ],
      },
    ],
  });
};

const showUsersWhoOwnBookByGoogleID = async (bookID) => {
  return await db.books.findAll({
    where: {
      googleBookID: bookID,
    },
    attributes: ["id", "title", "authors"],
    include: [
      {
        // as: "owner",
        model: db.OwnedBooks,
        attributes: ["userID", "bookID", "lendToID"],
        include: [
          {
            as: "owner",
            model: db.user,
            attributes: ["id", "firstName", "lastName", "email", "googleAuth"],
          },
          {
            model: db.books,
            attributes: [
              "id",
              "title",
              "authors",
              "categories",
              "isbn",
              "description",
              "imageLinks",
              "googleBookID",
              "publisher",
              "publishedDate",
            ],
          },
        ],
      },
      // {
      //   model: db.books,
      //   attributes: [
      //     "id",
      //     "title",
      //     "authors",
      //     "categories",
      //     "isbn",
      //     "description",
      //     "imageLinks",
      //     "googleBookID",
      //     "publisher",
      //     "publishedDate",
      //   ],
      // },
    ],
  });
  // return await db.OwnedBooks.findAll({
  //   where: {
  //     bookID: bookID,
  //   },
  //   attributes: ["userID", "bookID", "lendToID"],
  //   include: [
  //     {
  //       as: "owner",
  //       model: db.user,
  //       attributes: ["id", "firstName", "lastName", "email", "googleAuth"],
  //     },
  //     {
  //       model: db.books,
  //       attributes: [
  //         "id",
  //         "title",
  //         "authors",
  //         "categories",
  //         "isbn",
  //         "description",
  //         "imageLinks",
  //         "googleBookID",
  //         "publisher",
  //         "publishedDate",
  //       ],
  //     },
  //   ],
  // });
};

module.exports.showUsersWhoOwnBook = showUsersWhoOwnBook;
module.exports.showUsersWhoOwnBookByGoogleID = showUsersWhoOwnBookByGoogleID;
module.exports.showAllOwnedBooksByUser = showAllOwnedBooksByUser;
module.exports.showAllReadBooksByUser = showAllReadBooksByUser;
module.exports.showAllWantToReadBooksByUser = showAllWantToReadBooksByUser;
module.exports.showAllOwnedBooksByUser = showAllOwnedBooksByUser;
module.exports.findOrCreatePersonalListFunctionMapping = findOrCreatePersonalListFunctionMapping;
module.exports.deleteFromPersonalListFunctionMapping = deleteFromPersonalListFunctionMapping;
module.exports.findOrCreateBookEntry = findOrCreateBookEntry;
