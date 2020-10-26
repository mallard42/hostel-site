import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';

import Home from './pages/Home';
import Error from './pages/Error';
import Rooms from './pages/Rooms';
import SingleRoom from './pages/SingleRoom';
import AddRooms from './pages/AddRooms';

import Navbar from './components/Navbar';

function App() {
  return (
    <div >
        <Navbar />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/rooms/" component={Rooms} />
            <Route exact path="/rooms/:slug" component={SingleRoom} />
            <Route exact path="/add-room" component={AddRooms} />
            <Route component={Error}/>
    </Switch>
    </div>
  );
}

export default App;
