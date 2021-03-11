//this is an action creator and it returns an object
export const toggleModal = () => {
  return {
    type: "TOGGLEMODAL",
  };
};

export const addIndividBook = (book) => {
  return {
    type: "ADDINDIVIDBOOK",
    book: book,
  };
};

export const searchFunction = (results) => {
  return {
    type: "SEARCHFUNCTION",
    results: results,
  };
};

export const saveToken = (token) => {
  return {
    type: "SAVETOKEN",
    data: token,
  };
};

export const saveOwnedBooks = (books) => {
  return {
    type: "SAVE_OWNED_BOOKS",
    data: books,
  };
};

export const saveReadBooks = (books) => {
  return {
    type: "SAVE_READ_BOOKS",
    data: books,
  };
};

export const saveWantBooks = (books) => {
  return {
    type: "SAVE_WANTTOREAD_BOOKS",
    data: books,
  };
};

export const saveGoogleImg = (image) => {
  return {
    type: "SAVEGOOGLEIMG",
    data: image,
  };
};

export const setGoogleAuth = (boolean) => {
  return {
    type: "SETGOOGLEAUTH",
    data: boolean,
  };
};
