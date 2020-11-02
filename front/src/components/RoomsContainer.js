import React, { Component } from 'react';
import axios from 'axios';

import RoomsFilter from './RoomsFilter';
import Loading from '../components/Loading';

class RoomContainer extends Component {
    constructor(props){
        super(props);

        this.state = {
            rooms: [],
            loading: true,
        }
    }

    componentDidMount() {
        axios.get("http://localhost:5000/room").then(response => {
        if (response.data.length > 0){
            this.setState({
                rooms: response.data,
                loading: false
            })
        }
        });
    }
        
    render (){
        if (this.state.loading){
            return (<Loading />)
        }

        return (
            <div>
                <RoomsFilter rooms={ this.state.rooms } />
            </div>
        )
    }
}

export default RoomContainer;
