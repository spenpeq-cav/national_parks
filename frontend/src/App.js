import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'

import HomeScreen from './screens/HomeScreen';
import ExploreScreen from './screens/ExploreScreen';
import ParkScreen from './screens/ParkScreen';

function App() {
  return (
    <Router>
      <Header />
      <Route path='/' component={HomeScreen} exact />
      <Route path='/explore' component={ExploreScreen} exact/>
      <Route path='/explore/:parkcode' component={ParkScreen} />
      <Footer />
    </Router> 
  );
}

export default App;