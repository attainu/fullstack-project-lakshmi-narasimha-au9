import React from 'react'
import { connect } from 'react-redux'
import { profile, isAuthenticated } from '../Store/Actions/Authactions'
import AuthStatus from '../utils/authstatus'
import PostUi from '../Components/Posts/PostUi'
import { getRecentQuestions } from '../Store/Actions/postActions'
import getCookie from '../utils/getCookie'


class Home extends React.Component {
    constructor(){
        super()
        this.state={
            data:[]
        }
    }

    componentDidMount = async()=>{
        const cookie = getCookie("x-access-token")
        let data = await this.props.dispatch(getRecentQuestions())
        this.setState({...this.state, data: data.payload})
        if(cookie){
            let userdata = await AuthStatus();
            if(userdata.email){
                this.props.dispatch(profile(userdata))
                this.props.dispatch(isAuthenticated(true))
                sessionStorage.setItem("x-access-token",cookie)
                
            }
            
        }
        
    }
    
    renderData = ()=>{
        const postData = this.state.data
        if(this.state.data.length>0){
            return  postData.map((post)=>{
                let postedTime =post.questioned_time.split("T")[0].split('-').join("")
                return(
                    <PostUi key={post._id} postData={post} postedTime={postedTime}/>
                )}
            )           
            }
        else{
            return(
                <div>
                    <img src="https://res.cloudinary.com/djsrzxm3j/image/upload/v1616999545/QuoraLt/loader_fc7ml8.gif" alt="loading" />
                </div>
            )
        }
    }
    

    render(){
        return (
            <main>
                <div className="container">
                    {this.renderData()}
                </div>
                
            </main>
        )
    }
    }   
    

const mapStateToProps = (state) =>{
    return {
        auth:state.auth_reducer.is_auth,
        questions:state.post_reducer.questions
    }
}

export default connect(mapStateToProps)(Home)
