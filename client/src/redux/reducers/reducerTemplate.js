//setting initial state
const initialState = {
    modalShow: false,
    individBook: [],
    searchResults: []
}

//purpose of reducer is to return a new global state
//reducer must be passed into store
const reducerTemplate = (state = initialState, action) => {
    
    switch(action.type){
        case "TOGGLEMODAL":   //must match name of action.type in actions
            return{
                ...state,
                modalShow: !state.modalShow
            }
        case "ADDINDIVIDBOOK":
            return{
                ...state,
                individBook: action.book
            }
        case "SEARCHFUNCTION":
            return{
                ...state,
                searchResults: action.book
            }
        
        default:
            return state;
    }
}



export default reducerTemplate;