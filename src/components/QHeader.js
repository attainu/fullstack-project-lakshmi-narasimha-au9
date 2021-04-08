import React, { useState } from "react";
import HomeIcon from "@material-ui/icons/Home";
import FeaturedPlayListOutlinedIcon from "@material-ui/icons/FeaturedPlayListOutlined";
import AssignmentTurnedInOutlinedIcon from "@material-ui/icons/AssignmentTurnedInOutlined";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import NotificationsOutlinedIcon from "@material-ui/icons/NotificationsOutlined";
import SearchIcon from "@material-ui/icons/Search";
import LanguageIcon from "@material-ui/icons/Language";
import Modal from "react-modal";
import { base_url, categories } from '../utils/constants'
import { Menu, Dropdown } from 'antd';
import { logout } from '../features/userSlice';
import { useDispatch } from 'react-redux';
import { Link as Anc, withRouter } from 'react-router-dom';

import "./QHeader.css";
import 'antd/dist/antd.css';
import { Avatar, Button, Input, FormControl, MenuItem, InputLabel, FormHelperText, Select } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { ExpandMore, Link } from "@material-ui/icons";

Modal.setAppElement("#root");

function QHeader(props) {
  const user = useSelector(selectUser);

  const [IsmodalOpen, setIsModalOpen] = useState(false);
  const [input, setInput] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const [category, setCategory] = useState("");
  const questionName = input;
  const dispatch = useDispatch()

  const handleQuestion = (e) => {
    e.preventDefault();
    console.log(input, inputUrl, category)
    setIsModalOpen(false);

    setInput("");
    setInputUrl("");
  };


  const logoutHandler = ()=>{
    document.cookie=`x-access-token=;path=/;max-age=0`;
    dispatch(logout)
    props.history.push('/login')
  }


  const menu = (
    <Menu>
      <Menu.Item>
        <Anc rel="noopener noreferrer" to='/profile'>
          profile
        </Anc>
      </Menu.Item>
      <Menu.Item danger onClick={()=>{logoutHandler()}}>Logout</Menu.Item>
    </Menu>
  );
  

  return (
    <div className="qHeader">
      <Anc to="/" className="qHeader__logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Quora_logo_2015.svg/250px-Quora_logo_2015.svg.png"
          alt=""
        />
      </Anc>
      <div className="qHeader__icons">
        <div className="active qHeader__icon">
          <HomeIcon />
        </div>
        <div className="qHeader__icon">
          <FeaturedPlayListOutlinedIcon />
        </div>
        <div className="qHeader__icon">
          <AssignmentTurnedInOutlinedIcon />
        </div>
        <div className="qHeader__icon">
          <PeopleAltOutlinedIcon />
        </div>
        <div className="qHeader__icon">
          <NotificationsOutlinedIcon />
        </div>
      </div>
      <div className="qHeader__input">
        <SearchIcon />
        <input type="text" placeholder="Search Quora" />
      </div>
      <div className="qHeader__Rem">
        <div className="qHeader__avatar">
        <Dropdown overlay={menu}>
          <Anc className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            <Avatar
              className="Avatar"
              src={
                user.data.profile_img_url
                  ? user.data.profile_img_url
                  : "https://images-platform.99static.com//_QXV_u2KU7-ihGjWZVHQb5d-yVM=/238x1326:821x1909/fit-in/500x500/99designs-contests-attachments/119/119362/attachment_119362573"
              }
            />
          </Anc>
          
        </Dropdown>
          
        </div>
        <LanguageIcon />
        <Button onClick={() => setIsModalOpen(true)}>Add Question</Button>
        <Modal
          isOpen={IsmodalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          shouldCloseOnOverlayClick={false}
          style={{
            overlay: {
              width: 800,
              height: 700,
              backgroundColor: "rgba(0,0,0,0.8)",
              zIndex: "1000",
              top: "50%",
              left: "50%",
              marginTop: "-300px",
              marginLeft: "-450px",
            },
          }}
        >
          <div className="modal__title">
            <h5>Add Question</h5>
            <h5>Share Link</h5>
          </div>
          <div className="modal__info">
            <Avatar
              className="avatar"
              src={
                user.photo
                  ? user.photo
                  : "https://images-platform.99static.com//_QXV_u2KU7-ihGjWZVHQb5d-yVM=/238x1326:821x1909/fit-in/500x500/99designs-contests-attachments/119/119362/attachment_119362573"
              }
            />
            <p>{user.disPlayName ? user.disPlayName : user.email} asked</p>
            <div className="modal__scope">
              <PeopleAltOutlinedIcon />
              <p>Public</p>
              <ExpandMore />
            </div>
          </div>
          
          <div className="modal__Field">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Start your question with 'What', 'How', 'Why', etc. "
            />
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={category}
              style={{marginTop:"10px"}}
              onChange={(e)=>setCategory(e.target.value)}
            >
              {categories.map((item,idx)=>{
                  return <MenuItem key={idx} value={item}>{item}</MenuItem>
              })}
            </Select>
            <FormHelperText>Select category</FormHelperText>
            <div className="modal__fieldLink">
              <Link />
              <input
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                type="text"
                placeholder="Optional: inclue a link that gives context"
              ></input>
            </div>
          </div>
          <div className="modal__buttons">
          <button className="cancle" onClick={() => setIsModalOpen(false)}>
            Cancel
          </button>
          <button type="sumbit" onClick={handleQuestion} className="add">
            Add Question
          </button>
        </div>
          
          
        </Modal>
      </div>
    </div>
  );
}

export default withRouter(QHeader);
