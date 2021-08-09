import Home from "./feature/home/Home";
import Login from "./feature/auth/Login";
import MainNavigation from "./feature/header/MainNavigation";
import ParentInfor from "./feature/parent/ParentInfor";
import TutorInfor from "./feature/tutor/TutorInfor";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import ParentRoom from "./feature/parent_room/ParentRoom";
import CreateRoom from "./feature/CreateRoom/CreateRoom";
import Register from "./feature/register/Register";
import RegisterTutor from "./feature/register/components/RegisterTutor/RegisterTutor";
import RegisterParent from "./feature/register/components/RegisterParent/RegisterParent";
import RegisterRole from "./feature/register/components/RegisterRole/RegisterRole";
import { getNewToken, getToken, selectToken } from "./feature/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import TutorProfile from "./feature/profile/TutorProfile";
import ParentProfile from "./feature/profile/ParentProfile";

function App() {

  //get new token after 1hours
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  if(token){
    getToken();
  }
  
  return (
    <div className="App">
      <BrowserRouter>
        <MainNavigation />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route exact path="/tutorInfo/:tutorId" component={TutorInfor} />
          <Route exact path="/parentInfo/:parentId" component={ParentInfor} />
          <Route exact path="/room/:roomId" component={ParentRoom}/>
          <Route exact path="/createroom" component={CreateRoom}/>
          <Route exact path="/signup" component={Register} />
          <Route exact path="/signup/chooserole" component={RegisterRole} />
          <Route exact path="/signup/parent" component={RegisterParent} />
          <Route exact path="/signup/tutor" component={RegisterTutor} />
          <Route exact path="/tutorprofile/:tutorId" component={TutorProfile} />
          <Route exact path="/parentprofile/:parentId" component={ParentProfile} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
