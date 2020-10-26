import React from 'react';
import { Link } from 'react-router-dom'

import Hero from '../components/Hero'
import Banner from '../components/Banner'

const addRooms= () => {
    return (
        <div>
            <Hero hero="roomsHero">
                <Banner title="Add Room">
                    <Link to='/' className="btn-primary">Return Home</Link>
                </Banner>    
            </Hero> 
        </div>
    )
}

export default addRooms;