import { baseUrl } from '../utils/urls'


const profile_url = baseUrl+'/auth/profile'


const AuthStatus = async()=>{
    const options={
        mode:"cors",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://127.0.0.1:5000"
        },
        credentials:"include"
      };
    const data = await fetch(profile_url,options)
        .then((res)=>res.json())
        .then(data=>data)
        .catch(err=>err)
    return data
}


export default AuthStatus