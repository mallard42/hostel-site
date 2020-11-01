import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Hero from '../components/Hero';
import Banner from '../components/Banner';
import AddRoomForm from '../components/AddRoomForm';
import ListRoom from '../components/ListRoom';

class EditRoom extends Component {
    render() {
        return (
            <div>
                <Hero hero="roomsHero">
                    <Banner title="Edit Room">
                        <Link to='/' className="btn-primary">Return Home</Link>
                    </Banner>
                </Hero>
                <AddRoomForm />
                <ListRoom />
            </div>
        )
    }
}

export default EditRoom;