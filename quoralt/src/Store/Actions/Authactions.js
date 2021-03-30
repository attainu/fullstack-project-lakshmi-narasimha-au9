// Authenticate and set authentication true/false 

export const isAuthenticated = (bool)=>{
    
    return{
        type:"ISLOGGEDIN",
        payload:bool
    }
}

export const profile = async(data)=>{
    return {
        type:'PROFILE',
        payload:await data
    }
}