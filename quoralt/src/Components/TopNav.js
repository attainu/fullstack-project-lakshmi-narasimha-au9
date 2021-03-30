import React,{ useState } from 'react'
import { Navbar, Nav, FormControl, InputGroup, Modal, Button, Form, Alert } from 'react-bootstrap'
import './styles/TopNav.scss'
import { SearchOutlined } from  '@ant-design/icons'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { categories } from '../utils/urls'
import { baseUrl } from '../utils/urls';


// Post question api
const quesUrl = baseUrl +'/question/new'

function TopNav(props) {
    const token = sessionStorage.getItem('x-access-token')
    const [show, setShow] = useState(false);
    const [category, setCategory] = useState(categories[0])
    const [question, setQuestion] = useState("")

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    // AddQuestion handler
    const addQuestion = async (e)=>{
        e.preventDefault()
        let questObj = { question , category};
        let options = {
            method : 'POST',
            body:JSON.stringify(questObj),
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "http://127.0.0.1:5000"
            },
            credentials:"include"
        }
        let  showMsg = true
        await fetch(quesUrl, options)
        .then(data=>data.json())
        .then(res=>{
            return (
                <Modal show={showMsg} onHide={handleClose}>
                    <Alert variant={"success"}>
                        Question posted successsfully
                    </Alert>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                 
            )
        })
        .catch(err=>{
            
            return(
                <Modal show={showMsg} onHide={handleClose}>
                    <Alert variant={"danger"}>
                        Something went wrong. Try again later
                    </Alert>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )
            
        })
    }

    const conditionalRender = ()=>{
        if(props){
            
            if(token==null || token === undefined){
                if(props.location && props.location.pathname==='/login'){
                    
                        return(
                            <Nav className="ml-auto">
                                <Nav.Link href={"/register"}>Register</Nav.Link>
                            </Nav>
                        )
                    }else if(props.location && props.location.pathname==='/register'){
                        return(
                            <Nav className="ml-auto">
                                <Nav.Link href="/login">Sign In</Nav.Link>
                            </Nav>
                        )
                    }
                else{
                        return(
                            <Nav className="ml-auto">
                                <Nav.Link href="/login">Sign In</Nav.Link>
                                <Nav.Link href="/register">Register</Nav.Link>
                            </Nav>
                        )
                    }     
                }
            
                
            else{
                if(props.profile){
                    return(
                        <Nav className="ml-auto">
                            <Nav.Link href="#home"><img className="profileImg" src={props.profile.profile_img_url} alt="pr" /> {props.profile.name}</Nav.Link>
                            <Nav.Link onClick={handleShow}>
                                <span className="material-icons " id="plus">
                                    add_circle_outline
                                </span>
                                Add Question
                            </Nav.Link>
                            <Nav.Link href="#link">Log out</Nav.Link>
                            <Modal show={show} onHide={handleClose}>
                                <Form onSubmit={addQuestion}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Add New Question</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form.Group controlId="SelectCustom">
                                            <Form.Label>Select Category</Form.Label>
                                            <Form.Control as="select" custom value={category} onChange={(e)=>setCategory(e.target.value)}>
                                                {categories.map((item,idx)=>{
                                                    return <option key={idx} value={item}>{item}</option>
                                                })}
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId="ControlTextarea1" value={question} onChange={(e)=>setQuestion(e.target.value)}>
                                            <Form.Label>Enter Your question:</Form.Label>
                                            <Form.Control as="textarea" rows={3} />
                                        </Form.Group>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button variant="primary" type="submit" onClick={handleClose}>
                                            Submit
                                        </Button>
                                    </Modal.Footer>
                                </Form>
                            </Modal>
                        </Nav>
                    )
                }   
        }
        }
        
}
    return (
        <header>
             <Navbar className="bg-dark" variant="dark" expand="lg">
                <Navbar.Brand href="/">QuoraLt</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" >
                    <InputGroup className="mb-3 ml-auto " id="searchBar" >
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1" className="searchSubmit"><SearchOutlined/></InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                        placeholder="Search for questions,people and topics"
                        aria-label="Search"
                        aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    {conditionalRender()}
                    
                
                </Navbar.Collapse>
            </Navbar>
            
        </header>
       
    )
    }

const mapStateToProps = (state)=>{
    return{
        is_authenticated:state.auth_reducer.is_auth,
        profile:state.auth_reducer.profile
    }
}


export default connect(mapStateToProps)(withRouter(TopNav))
