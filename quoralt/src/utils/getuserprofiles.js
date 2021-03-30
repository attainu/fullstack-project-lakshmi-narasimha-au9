import { baseUrl } from './urls';
import axios from 'axios';

// get user by id

export const getUserById = async (id)=>{
    let url = baseUrl +'/auth/users/' + id;
    let data = await axios(url).then(res=>res.data).catch(err=>err);
    // console.log(data)
    return data
}


// get users by list of Ids
export const getUsersByList = async (ids)=>{
    let url = baseUrl +'/auth/users/profiles'
    let config = {
        body: JSON.stringify({ids}),
        headers: {
            "Content-Type": "application/json"
        }
    } 
    let data = await axios(url,config).then(res=>res.data).catch(err=>err)
    return data
}