import React from "react";
import { useSelector } from "react-redux";
import "./App.css";
import Login from "./components/auth/Login";
import Quora from "./components/Quora";
import { selectUser } from "./features/userSlice";

function App() {
  const user = useSelector(selectUser);
  console.log(user);
  React.useEffect(() => {}, [user]);
  return <div className="App">{user ? <Quora /> : <Login />}</div>;
}

export default App;
