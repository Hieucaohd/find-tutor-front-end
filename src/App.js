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

// import RegisterTutor from "./feature/register/RegisterTutor/RegisterTutor";
// import RegisterParent from "./feature/register/RegisterParent/RegisterParent";

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
          <Route exact path="/signup/tutor" component={RegisterTutor} />
          <Route exact path="/signup/parent" component={RegisterParent} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
