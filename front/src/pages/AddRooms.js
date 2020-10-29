import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Hero from '../components/Hero'
import Banner from '../components/Banner'
import AddRoomForm from '../components/AddRoomForm'

class AddRooms extends Component {
    render() {
        return (
            <div>
                <Hero hero="roomsHero">
                    <Banner title="Add Room">
                        <Link to='/' className="btn-primary">Return Home</Link>
                    </Banner>
                </Hero>
                <AddRoomForm />
            </div>
        )
    }
}

export default AddRooms;