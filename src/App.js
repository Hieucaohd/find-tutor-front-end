import Modal from "components/Modal/Modal";
import NotFound from "features/404NotFound/NotFound";
import Auth from "features/auth/Auth";
import Profile from "features/Profile/Profile";
import Settings from "features/Settings/Settings";
import SignUp from "features/SignUp/SignUp";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import CreateRoom from "./features/CreateRoom/CreateRoom";
import Search from "./features/Header/components/Search/Search";
import MainNavigation from "./features/Header/MainNavigation";
import Home from "./features/Home/Home";
import ParentInfor from "./features/Parent/ParentInfor";
import ParentRoom from "./features/ParentRoom/ParentRoom";
import RegisterRole from "./features/RegisterRole/RegisterRole";
import TutorInfor from "./features/Tutor/TutorInfor";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <MainNavigation />
          <Switch>
            <Route path="/signin" component={Auth} />
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/tutorInfo/:tutorId" component={TutorInfor} />
            <Route exact path="/parentInfo/:parentId" component={ParentInfor} />
            <Route exact path="/room/:roomId" component={ParentRoom}/>
            <Route exact path="/createroom" component={CreateRoom}/>
            <Route path="/role" component={RegisterRole} />
            <Route path="/profile" component={Profile} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/test" component={Modal} />
            <Route exact path="/settings" component={Settings}/>
            <Route path="*" component={NotFound} />
          </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
