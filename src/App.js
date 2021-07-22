import Home from "./feature/home/Home";
import Login from "./feature/auth/Login";
import CreateRoom from "./feature/home/CreateRoom";
import ParentRoom from "./feature/parent_room/ParentRoom";
import MainNavigation from "./feature/header/MainNavigation";
import ParentInfor from "./feature/parent/ParentInfor";
import TutorInfor from "./feature/tutor/TutorInfor";

import { fetchRoomList } from "./feature/home/homeSlice";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useCookies } from "react-cookie";

import { useEffect } from "react";

function App() {
  return (
    <div>
      <BrowserRouter>
        <MainNavigation />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route exact path="/tutorInfor" component={TutorInfor} />
          <Route exact path="/parentInfor" component={ParentInfor} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
