import React, { Component } from 'react';

import { RoomContext } from '../context';

import Loading from './Loading';
import Title from './Title';
import Room from './Room';

class FeaturedRooms extends Component {
    static contextType = RoomContext;
    constructor(props){
        super(props);
        this.state = {
            rooms: [],
            featuredRoms: [],
            loading: true
        }
    }


    render() {
        const room = this.context.featuredRooms.map((room) => {
                return <Room key={room.id} room={room} />
            })
        

        return (
            <section className="featured-rooms">
                <Title title="Featured Rooms" />
                <div className="featured-rooms-center">
                    {this.context.loading ? <Loading /> : room}
                    
                </div>
            </section>
        )
    }
}

export default FeaturedRooms;