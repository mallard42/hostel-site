import React, { Component } from 'react'
import axios from 'axios';

import RoomsList from '../components/RoomsList';

class EditListRoom extends Component {
    constructor(props){
        super(props);

        this.state = {
            rooms: []
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

    render(){
        return (
            <section>
                <RoomsList rooms={ this.state.rooms } link="Edit" />
            </section>
        )
    }

}

export default EditListRoom
