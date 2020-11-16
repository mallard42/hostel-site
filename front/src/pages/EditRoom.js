import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Hero from '../components/Hero';
import Banner from '../components/Banner';
import AddRoomForm from '../components/AddRoomForm';
import EditListRoom from '../components/EditListRoom';

class EditRoom extends Component {
    render() {
        const room = {
            _id: "",
            name: '',
            path: "single-economy",
            type: 'single room',
            price: 0,
            size: 0,
            capacity: 0,
            pets: false,
            breakfast: false,
            featured: false,
            description: '',
            extras: [""],
            images: []
        }

        return (
            <div>
                <Hero hero="roomsHero">
                    <Banner title="Edit Room">
                        <Link to='/' className="btn-primary">Return Home</Link>
                    </Banner>
                </Hero>
                <AddRoomForm room={room} status="add"/>
                <EditListRoom />
            </div>
        )
    }
}

export default EditRoom;