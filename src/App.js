import SkeletonPage from "components/Skeleton/SkeletonPage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./features/auth/Login";
import CreateRoom from "./features/CreateRoom/CreateRoom";
import MainNavigation from "./features/header/MainNavigation";
import Home from "./features/home/Home";
import ParentInfor from "./features/parent/ParentInfor";
import ParentRoom from "./features/parent_room/ParentRoom";
import ParentProfile from "./features/profile/ParentProfile/ParentProfile";
import TutorProfile from "./features/profile/TutorProfile/TutorProfile";
import RegisterParent from "./features/register/components/RegisterParent/RegisterParent";
import RegisterRole from "./features/register/components/RegisterRole/RegisterRole";
import RegisterTutor from "./features/register/components/RegisterTutor/RegisterTutor";
import Register from "./features/register/Register";
import Search from "./features/search/Search";
import TutorInfor from "./features/tutor/TutorInfor";

function App() {
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
          <Route exact path="/test" component={SkeletonPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
