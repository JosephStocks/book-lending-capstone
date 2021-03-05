import axios from "axios";

export const bookAddPost = async (book) => {
  let response = await axios.post(
    "http://localhost:3005/addbook",
    { book },
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );

  console.log(response?.data?.publishedDate);
};
