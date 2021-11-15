import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'

import HomeScreen from './screens/HomeScreen';
import ExploreScreen from './screens/ExploreScreen';
import ParkScreen from './screens/ParkScreen';
import BackendTest from './screens/BackendTest';
import AboutScreen from './screens/AboutScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import {UserContext} from './context/UserContext';

function PrivateRoute({ isAuthed, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => (isAuthed ? children : <Redirect to="/login" />)}
    />
  );
}

function App() {
  const { user } = useContext(UserContext);

  //   const checkUserAuth = async() => {
  //     await axios.get("/userauth", {withCredentials: true})
  //         .then((res) => (setUserAuth(res.data.auth)))
  //     setLoaded(true)
  // }

  return (
    <div>
      <Switch>
        <Route path='/' component={HomeScreen} exact />
        <Route path='/about' component={AboutScreen} />
        <Route path='/explore' component={ExploreScreen} exact/>
        <Route path='/explore/:parkcode' component={ParkScreen} />
        <Route path='/server' component={BackendTest} />
        <Route path='/login' component={LoginScreen} />
        <Route path='/register' component={RegisterScreen} />
        {/* <Route path='/profile' component={ProfileScreen} /> */}
        <PrivateRoute path="/profile" isAuthed={user}>
          <ProfileScreen />
        </PrivateRoute>
      </Switch> 
    </div>
    
  );
}

export default App;