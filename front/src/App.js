import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';

import Home from './pages/Home';
import Error from './pages/Error';
import Rooms from './pages/Rooms';
import SingleRoom from './pages/SingleRoom';
import EditRoom from './pages/EditRoom';
import SingleRoomEdit from './pages/SingleRoomEdit';

import Navbar from './components/Navbar';

function App() {
  return (
    <div >
        <Navbar />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/rooms/" component={Rooms} />
            <Route exact path="/rooms/:path" component={SingleRoom} />
            <Route exact path="/edit-room" component={EditRoom} />
            <Route exact path='/rooms/edit/:id' component={SingleRoomEdit} />
            <Route component={Error}/>
    </Switch>
    </div>
  );
}

export default App;
