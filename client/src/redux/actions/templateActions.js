
//this is an action creator and it returns an object
export const toggleModal = () => {
    
    return{
        type: "TOGGLEMODAL"
    }
}

export const addIndividBook = (book) => {
    
    return{
        type: "ADDINDIVIDBOOK",
        book: book
    }
}


