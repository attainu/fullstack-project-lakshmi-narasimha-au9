import { baseUrl } from '../../utils/urls'


export const getRecentQuestions = async ()=>{
    const Url = baseUrl+'/question'
    const data = await fetch(Url)
    .then(res=>res.json())
    .then(data=>data)
    .catch(err=>err)
    if(data){
        return{
            type:"QUESTIONS",
            payload: await data
        }
    }else{
        return data;
    }
    
}