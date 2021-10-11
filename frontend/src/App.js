import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import HomeScreen from './screens/HomeScreen';
import ExploreScreen from './screens/ExploreScreen';
import ParkScreen from './screens/ParkScreen';
import BackendTest from './screens/BackendTest';
import AboutScreen from './screens/AboutScreen';

function App() {
  return (
    <Router>
      <Navbar />
      <Route path='/' component={HomeScreen} exact />
      <Route path='/about' component={AboutScreen} />
      <Route path='/explore' component={ExploreScreen} exact/>
      <Route path='/explore/:parkcode' component={ParkScreen} />
      <Route path='/server' component={BackendTest} />
      <Footer />
    </Router> 
  );
}

export default App;