import axios from "axios";

export const bookAddPost = async (book, token) => {
  let response = await axios.post(
    "http://localhost:3005/books",
    { book },
    {
      headers: {
        "content-type": "application/json",
        authorization: token,
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

export const addBookToPersonalLists = async (book, whichList, token) => {
  let response = await axios.post(
    "http://localhost:3005/books",
    { book, whichList },
    {
      headers: {
        "content-type": "application/json",
        authorization: token,
      },
    }
  );
  console.log(response);
};
