import loadable from '@loadable/component';
import Loading from "components/Loading/Loading";
import Message from 'features/Message';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainNavigation from "./features/Header/MainNavigation";

const Home = loadable(() => import('./features/Home/Home'), {
  fallback: <Loading whiteBkg={true} />
});

const TutorInfor = loadable(() => import('./features/Tutor/TutorInfor'), {
  fallback: <Loading whiteBkg={true} />
});
const ParentRoom = loadable(() => import('features/ParentRoom/ParentRoom'), {
  fallback: <Loading whiteBkg={true} />
});
const RegisterRole = loadable(() => import('./features/RegisterRole/RegisterRole'), {
  fallback: <Loading whiteBkg={true} />
});
const ParentInfor = loadable(() => import('./features/Parent/ParentInfor'), {
  fallback: <Loading whiteBkg={true} />
});
const CreateRoom = loadable(() => import('./features/CreateRoom/CreateRoom'));
const SignUp = loadable(() => import('./features/SignUp/SignUp'), {
  fallback: <Loading whiteBkg={true} />
});
const NotFound = loadable(() => import('features/404NotFound/NotFound'), {
  fallback: <Loading whiteBkg={true} />
});
const Auth = loadable(() => import('features/auth/Auth'), {
  fallback: <Loading whiteBkg={true} />
});
const Profile = loadable(() => import('features/Profile/Profile'), {
  fallback: <Loading whiteBkg={true} />
});
const Settings = loadable(() => import('features/Settings/Settings'), {
  fallback: <Loading whiteBkg={true} />
});


 
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
            {/* <Route exact path="/search" component={Search} /> */}
            <Route exact path="/test" component={Message} />
            <Route path="/settings" component={Settings}/>
            <Route path="*" component={NotFound} />
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
