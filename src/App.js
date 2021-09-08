import SkeletonPage from "components/Skeleton/SkeletonPage";
import Auth from "features/auth/Auth";
import Register from "features/auth/components/Register";
import Profile from "features/Profile/Profile";
import { GetTutorProfile } from "graphql/ProfileQueries";
import { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import CreateRoom from "./features/CreateRoom/CreateRoom";
import MainNavigation from "./features/Header/MainNavigation";
import Home from "./features/Home/Home";
import ParentInfor from "./features/Parent/ParentInfor";
import ParentRoom from "./features/ParentRoom/ParentRoom";
import RegisterRole from "./features/RegisterRole/RegisterRole";
import Search from "./features/Search/Search";
import TutorInfor from "./features/Tutor/TutorInfor";
function App() {
  useEffect(() => {
    const get = async () => {
      const hmu = await GetTutorProfile(2);
      console.log(hmu)
    }
    get();
  })
  return (
    <div className="App">
        <BrowserRouter>
          <MainNavigation />
          <Switch>
            <Route path="/signin" component={Auth} />
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Register} />
            <Route exact path="/tutorInfo/:tutorId" component={TutorInfor} />
            <Route exact path="/parentInfo/:parentId" component={ParentInfor} />
            <Route exact path="/room/:roomId" component={ParentRoom}/>
            <Route exact path="/createroom" component={CreateRoom}/>
            <Route path="/role" component={RegisterRole} />
            <Route path="/profile" component={Profile} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/test" component={SkeletonPage} />
          </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
