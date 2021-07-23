import Home from "./feature/home/Home";
import Login from "./feature/auth/Login";
import MainNavigation from "./feature/header/MainNavigation";
import ParentInfor from "./feature/parent/ParentInfor";
import TutorInfor from "./feature/tutor/TutorInfor";

import { BrowserRouter, Route, Switch } from "react-router-dom";

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
