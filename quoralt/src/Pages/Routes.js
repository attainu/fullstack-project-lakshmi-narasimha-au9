import { BrowserRouter,Route } from 'react-router-dom'
import TopNav from '../Components/TopNav'
import Footer from '../Components/Footer'
import Home from './Home'
import Register from '../Components/Auth/Register'
import Login from '../Components/Auth/Login'
import 'bootstrap/dist/css/bootstrap.min.css';

const Routes= ()=>{
    return(
        <BrowserRouter>
            <TopNav />
                <Route path={'/'} exact component={Home} />
                <Route path={'/register'} component={Register} />
                <Route path={'/login'} component={Login} />
            <Footer />
        </BrowserRouter>
    )
    
}
export default Routes