import React, { Component } from 'react'
import axios from 'axios';

import RoomsList from '../components/RoomsList';
import Title from './Title';

class EditListRoom extends Component {
    constructor(props){
        super(props);

        this.deleteRoom = this.deleteRoom.bind(this);

        this.state = {
            rooms: [],
            err: false,
            message: ""
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

    deleteRoom (room) {
        axios.delete(`http://localhost:5000/room/delete/${room._id}`)
             .then(response => this.setState({message: response.data, err: false}))
             .catch(err => {
                const message = (err.response.data.indexOf("duplicate key") > -1) ? 'The room already exists' : err.response.data;
                this.setState({message: message, err: true})
             });
    };

    render(){
        return (
            <section>
                <Title title="Rooms List" />
                <RoomsList rooms={ this.state.rooms } link="Edit" deleteRoom={this.deleteRoom} />
            </section>
        )
    }

}

export default EditListRoom
