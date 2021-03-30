const auth_reducer = (state={}, action)=>{
    switch (action.type) {
        case 'ISLOGGEDIN':
            return{...state, is_auth:action.payload}
        
        case 'PROFILE':
            return{...state,profile:action.payload}

        default:
            return state;
    }
}

export default auth_reducer