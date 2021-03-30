const post_reducer = (state={},action)=>{
    switch (action.type) {
        case 'QUESTIONS':
            return{
                ...state, questions:action.payload
            }
    
        default:
            return state;
    }

}

export default post_reducer;