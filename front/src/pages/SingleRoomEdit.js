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
            rooms: "",
            path: props.match.params.id
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/room/${this.state.path}`).then(response => {
        if (response.data.length > 0){
            this.setState({
                rooms: response.data
            })
        }
        console.log(this.state)
        });
    }

    render() {
        const room = this.state.rooms[0];
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