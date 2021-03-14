//setting initial state
const initialState = {
  modalShow: false,
  individBook: [],
  searchResults: [],
  ownedBooks: [],
  readBooks: [],
  wantBooks: [],
  token: "",
  profileImage: null,
  googleAuth: false,
  loggedUser: { firstName: "", lastName: "" },
  pendingSentFriendRequests: [],
  pendingReceivedFriendRequests: [],
  potentialFriendsSearchResults: [],
};

//purpose of reducer is to return a new global state
//reducer must be passed into store
const baseReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLEMODAL": //must match name of action.type in actions
      return {
        ...state,
        modalShow: !state.modalShow,
      };
    case "ADDINDIVIDBOOK":
      return {
        ...state,
        individBook: action.book,
      };
    case "SEARCHFUNCTION":
      return {
        ...state,
        searchResults: action.results,
      };

    case "SAVETOKEN":
      return {
        ...state,
        token: action.data.token,
        loggedUser: {
          firstName: action.data.firstName,
          lastName: action.data.lastName,
        },
      };

    case "SAVE_OWNED_BOOKS":
      return {
        ...state,
        ownedBooks: action.data,
      };

    case "SAVE_READ_BOOKS":
      return {
        ...state,
        readBooks: action.data,
      };

    case "SAVE_WANTTOREAD_BOOKS":
      return {
        ...state,
        wantBooks: action.data,
      };

    case "SAVEGOOGLEIMG":
      return {
        ...state,
        profileImage: action.data,
      };

    case "SETGOOGLEAUTH":
      return {
        ...state,
        googleAuth: action.data,
      };

    case "SET_PENDING_SENT_FRIEND_REQUESTS":
      return {
        ...state,
        pendingSentFriendRequests: action.data,
      };

    case "SET_PENDING_RECEIVED_FRIEND_REQUESTS":
      return {
        ...state,
        pendingReceivedFriendRequests: action.data,
      };

    case "SET_POTENTIAL_FRIENDS_SEARCH_RESULTS":
      return {
        ...state,
        potentialFriendsSearchResults: action.data,
      };

    default:
      return state;
  }
};

export default baseReducer;
