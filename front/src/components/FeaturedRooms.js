import React, { Component } from 'react';
import axios from 'axios'

import Loading from './Loading';
import Title from './Title';
import Room from './Room';

class FeaturedRooms extends Component {
    constructor(props){
        super(props);
        this.state = {
            featuredRooms: [],
            loading: true
        }
    }

    componentDidMount() {
        axios.get("http://localhost:5000/room").then(response => {
        if (response.data.length > 0){
            let featuredRooms = response.data.filter(room => room.featured === true);
            
            this.setState({
                featuredRooms: featuredRooms,
                loading: false
            })
        }
        });
    }

    render() {
        const room = this.state.featuredRooms.map((room) => {
                return <Room key={room._id} room={room} link="Featured" />
            })
        

        return (
            <section className="featured-rooms">
                <Title title="Featured Rooms" />
                <div className="featured-rooms-center">
                    {this.state.loading ? <Loading /> : room}
                    
                </div>
            </section>
        )
    }
}

export default FeaturedRooms;