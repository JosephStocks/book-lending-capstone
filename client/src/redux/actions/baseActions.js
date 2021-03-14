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

export const setPendingSentFriendRequests = (requests) => {
  return {
    type: "SET_PENDING_SENT_FRIEND_REQUESTS",
    data: requests,
  };
};

export const setPendingReceivedFriendRequests = (requests) => {
  return {
    type: "SET_PENDING_RECEIVED_FRIEND_REQUESTS",
    data: requests,
  };
};

export const setPotentialFriendsSearchResults = (searchResults) => {
  return {
    type: "SET_POTENTIAL_FRIENDS_SEARCH_RESULTS",
    data: searchResults,
  };
};
export const allFriendRelationsIDs = (friendRelations) => {
  return {
    type: "SET_ALL_FRIEND_RELATIONS_IDS",
    data: friendRelations,
  };
};
