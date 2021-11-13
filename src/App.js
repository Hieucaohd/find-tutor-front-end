import loadable from '@loadable/component';
import Loading from "components/Loading/Loading";
import Message from 'features/Message';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainNavigation from "./features/Header";

const Home = loadable(() => import('./features/Home'), {
  fallback: <Loading whiteBkg={true} />
});

const TutorHome = loadable(() => import('./features/TutorRoom'), {
  fallback: <Loading whiteBkg={true} />
});
const ParentRoom = loadable(() => import('features/TeachingRoom'), {
  fallback: <Loading whiteBkg={true} />
});
const RegisterRole = loadable(() => import('./features/RegisterRole'), {
  fallback: <Loading whiteBkg={true} />
});
const ParentHome = loadable(() => import('./features/ParentRoom'), {
  fallback: <Loading whiteBkg={true} />
});
const CreateRoom = loadable(() => import('./features/CreateRoom'));
const SignUp = loadable(() => import('./features/SignUp'), {
  fallback: <Loading whiteBkg={true} />
});
const NotFound = loadable(() => import('features/404NotFound'), {
  fallback: <Loading whiteBkg={true} />
});
const Auth = loadable(() => import('features/auth'), {
  fallback: <Loading whiteBkg={true} />
});
const Profile = loadable(() => import('features/Profile'), {
  fallback: <Loading whiteBkg={true} />
});
const Settings = loadable(() => import('features/Settings'), {
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
            <Route exact path="/tutorInfo/:tutorId" component={TutorHome} />
            <Route exact path="/parentInfo/:parentId" component={ParentHome} />
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
