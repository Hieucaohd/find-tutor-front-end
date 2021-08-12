import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { getToken, selectToken } from "./feature/auth/authSlice";
import Login from "./feature/auth/Login";
import CreateRoom from "./feature/CreateRoom/CreateRoom";
import MainNavigation from "./feature/header/MainNavigation";
import Home from "./feature/home/Home";
import ParentInfor from "./feature/parent/ParentInfor";
import ParentRoom from "./feature/parent_room/ParentRoom";
import ParentProfile from "./feature/profile/ParentProfile/ParentProfile";
import TutorProfile from "./feature/profile/TutorProfile/TutorProfile";
import RegisterParent from "./feature/register/components/RegisterParent/RegisterParent";
import RegisterRole from "./feature/register/components/RegisterRole/RegisterRole";
import RegisterTutor from "./feature/register/components/RegisterTutor/RegisterTutor";
import Register from "./feature/register/Register";
import Search from "./feature/search/Search";
import TutorInfor from "./feature/tutor/TutorInfor";


function App() {

  //get new token after 1hours
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
          <Route exact path="/search" component={Search} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
