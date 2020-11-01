import React, { Component } from 'react'
import axios from 'axios';

import RoomsList from '../components/RoomsList';

class ListRoom extends Component {
    constructor(props){
        super(props);

        this.state = {
            rooms: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:5000/room").then(response => {
        if (response.data.length > 0){
            console.log(response.data)
            this.setState({
                rooms: response.data
            })
        }
        console.log(this.state.rooms)
        });
    }

    render(){
        return (
            <section>
                <RoomsList rooms={ this.state.rooms } />
                coucou
            </section>
        )
    }

}

export default ListRoom
