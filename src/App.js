import Home from "./feature/home/Home";
import Login from "./feature/auth/Login";
import MainNavigation from "./feature/header/MainNavigation";
import ParentInfor from "./feature/parent/ParentInfor";
import TutorInfor from "./feature/tutor/TutorInfor";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import ParentRoom from "./feature/parent_room/ParentRoom";

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
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
