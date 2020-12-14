import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Title from './Title';
import Alert from './Alert';
import defaultImg from '../images/room-1.jpeg';

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
             .then(response => this.setState({
                message: response.data, 
                err: false,
                rooms: this.state.rooms.filter(item => item._id !== room._id)
            }))
             .catch(err => {
                const message = (err.response.data.indexOf("duplicate key") > -1) ? 'The room already exists' : err.response.data;
                this.setState({
                    message: message, 
                    err: true
                })
             });
    };

    render(){
        return (
            <section className="section-margin">
                <Title title="Rooms List" />
                { this.state.message ? <Alert message={this.state.message} status={this.state.err ? "error" : "success"} /> : null }
                <div className="roomslist-center">
                    {
                        this.state.rooms.map(item => {
                            return (
                                <article className="room" key={item._id} >
                                    <div className="img-container">
                                        <img src={ item.images[0] || defaultImg } alt={item.path} />
                                        <div className="price-top">
                                            <h6>${ item.price }</h6>
                                            <p>Per Night</p>
                                        </div>
                                        <Link to={`/rooms/edit/${item.path}`} className="btn-primary room-link-edit" >Edit</Link>
                                        <button key={item._id} className="btn-primary room-link room-delete" onClick={() => this.deleteRoom(item)}> Delete </button>
                                    </div>
                                    <p className="room-info">{item.name}</p>
                                </article>
                            )
                        })
                    }
                </div>
            </section>
        )
    }

}

export default EditListRoom
