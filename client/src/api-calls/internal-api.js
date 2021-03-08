import axios from "axios";

export const bookAddPost = async (book) => {
  let response = await axios.post(
    "http://localhost:3005/books",
    { book },
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );

  console.log(response?.data?.publishedDate);
};

export const bookDeleteRequest = async (type, id) => {
  let response = await axios.delete("http://localhost:3005/books", {
    data: {
      idType: type,
      id: id,
    },
  });
  console.log(response);
};

export const bookDeleteRequestByDatabaseID = async (id) => {
  return await bookDeleteRequest("id", id);
};

export const bookDeleteRequestByGoogleBookID = async (id) => {
  return await bookDeleteRequest("googleBookID", id);
};

export const addBookToPersonalLists = async (book, whichList) => {
  let response = await axios.post(
    "http://localhost:3005/books",
    { book, whichList },
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
  console.log(response);
};
