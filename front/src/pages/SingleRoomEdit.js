import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'

import AddRoomForm from '../components/AddRoomForm';
import Banner from '../components/Banner'
import Hero from '../components/Hero'

class SingleRoomEdit extends Component {
    constructor(props){
        super(props);

        this.state = {
            rooms: [],
            path: props.match.params.id
        }
    }

    componentDidMount() {
        axios.get("http://localhost:5000/room").then(response => {
        if (response.data.length > 0){
            this.setState({
                rooms: response.data
            })
        }
        });
    }

    getRoom(path) {
        if (this.state.rooms.length > 0){
            const room = this.state.rooms.find((room) => room.path === path);
            return (room);
        }
    }

    render() {
        const room = this.getRoom(this.state.path);
        if (!room){
            return (
            <div className="error"> 
                <h3>No such room could be found ...</h3>
                <Link to="/rooms" className="btn-primary">Back to Rooms</Link>
            </div>
            )
        }

        return (
            <div>
                <Hero hero="roomsHero">
                    <Banner title="Edit Room">
                        <Link to='/' className="btn-primary">Return Home</Link>
                    </Banner>
                </Hero>
                <AddRoomForm room={room} status="update" />
            </div>
        )
    }
}

export default SingleRoomEdit;