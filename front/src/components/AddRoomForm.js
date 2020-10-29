import React, { Component } from 'react'
import axios from 'axios'

import Title from '../components/Title'

class AddRoomForm extends Component {
    constructor(props) {
        super(props);
  
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);

        this.state = {
            name: '',
            type: 'single room',
            price: 0,
            size: 0,
            capacity: 0,
            pets: false,
            breakfast: false,
            featured: false,
            description: ''
        }
    }

    onChangeHandler(event) {
        const target = event.target;
        const name = event.target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({ [name]: value });
    }

    onSubmit(e){
        e.preventDefault();

        const room = {
            name: this.state.name,
            type: this.state.type,
            price: this.state.price,
            size: this.state.size,
            capacity: this.state.capacity,
            pets: this.state.pets,
            breakfast: this.state.breakfast,
            featured: this.state.featured,
            description: this.state.description
        }
        console.log(room);
        axios.post("http://localhost:5000/room/add", room);
        // window.location = '#';
    }

    render() {
        return (
            <div className="room-add">
                <Title title="Add Rooms"/>
                <section className="room-add-center">
                    <form onSubmit={this.onSubmit}>

                        <div className="form-group">
                            <label>Room Name:</label>
                            <input type="text" name="name" className="form-control" value={this.state.name} onChange={this.onChangeHandler}></input>
                        </div>

                        <div className="form-group">
                            <label>Room Price:</label>
                            <input type="number" name="price" className="form-control" value={this.state.price} onChange={this.onChangeHandler}></input>
                        </div>

                        <div className="form-group">
                            <label>Room Size:</label>
                            <input type="number" name="size" className="form-control" value={this.state.size} onChange={this.onChangeHandler}></input>
                        </div>

                        <div className="form-group">
                            <label>Room Capacity:</label>
                            <input type="number" name="capacity" className="form-control" value={this.state.capacity} onChange={this.onChangeHandler}></input>
                        </div>

                        <div className="form-group">
                            <label>Room Description:</label>
                            <input type="text" name="description" className="form-control" value={this.state.description} onChange={this.onChangeHandler}></input>
                        </div>

                        <div className="form-group">
                            <div className="room-add-extra">
                                <input type="checkbox" name="breakfast" className="form-control" value={this.state.breakfast} onChange={this.onChangeHandler}></input>
                                <label>Room breakfast</label>
                            </div>

                            <div className="room-add-extra">
                                <input type="checkbox" name="featured" className="form-control" value={this.state.featured} onChange={this.onChangeHandler}></input>
                                <label>Room Featured</label>
                            </div>

                            <div className="room-add-extra">
                                <input type="checkbox" name="pets" className="form-control" value={this.state.pets} onChange={this.onChangeHandler}></input>
                                <label>Room Pets</label>
                            </div>
                        </div>
                        
                        <div className="form-group add-btn">
                                <input type="submit" value="Create New Room" className="btn-primary" />
                        </div>

                    </form>
                </section>
            </div>
        )
    }
}

export default AddRoomForm