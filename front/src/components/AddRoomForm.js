import React, { Component } from 'react'
import axios from 'axios'

import Title from '../components/Title'

class AddRoomForm extends Component {
    constructor(props) {
        super(props);
  
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.addExtra = this.addExtra.bind(this);
        this.removeExtra = this.removeExtra.bind(this);

        this.state = {
            status: props.status,
            name: props.room.name,
            path: props.room.path,
            type: props.room.type,
            price: props.room.price,
            size: props.room.size,
            capacity: props.room.capacity,
            pets: props.room.pets,
            breakfast: props.room.breakfast,
            featured: props.room.featured,
            description: props.room.description,
            extras: props.room.extras,
            images: props.room.images
        }
    }

    onChangeHandler(event) {
        const target = event.target;
        const name = event.target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({ [name]: value });
    }

    extraChange(event , i) {
        const name = event.target.name;
        const value = event.target.value;

        const list = [...this.state[name]];
        list[i] = value;

        this.setState({ [name]: list })
    }

    addExtra() {
        const list = [...this.state.extras, ""];
        this.setState({ extras: list });
    }

    removeExtra(i) {
        if (this.state.extras.length > 1){
            const list = [...this.state.extras, ""];
            list.splice(i, 1);
            this.setState({ extras: list });
        }
    }

    onSubmit(e){
        e.preventDefault();

        const room = {
            name: this.state.name,
            path: this.state.path,
            type: this.state.type,
            price: this.state.price,
            size: this.state.size,
            capacity: this.state.capacity,
            pets: this.state.pets,
            breakfast: this.state.breakfast,
            featured: this.state.featured,
            description: this.state.description,
            extras: this.state.extras,
            images: this.state.images
        }

        if (this.state.status === 'add'){
            axios.post("http://localhost:5000/room/add", room);
        }
        
        if (this.state.status === 'update'){
            axios.post(`http://localhost:5000/room/update/${room.path}`, room);
        }

        // window.location = '#';
    }

    render() {
        return (
            <section className="room-add">
                <Title title={this.state.status === 'add' ? "Add Rooms" : "Update Room"}/>
                <div className="room-add-center">
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
                        
                        <div className="form-group">
                            {
                                this.state.extras.map((item, i) => {
                                    return (
                                        <div key={i}>
                                            <input className="form-control" type="text" name="extras" value={item} onChange={event => this.extraChange(event, i)} />
                                            <input className="btn-primary" type="button" onClick={() => this.removeExtra(i)} value="-" />
                                        </div>
                                    )
                                })
                            }
                            <input className="btn-primary" type="button" onClick={this.addExtra} value="+" />
                        </div>

                        <div className="form-group add-btn">
                                <input type="submit" value={this.state.status === "add" ? "Create New Room" : "Update Room"} className="btn-primary" />
                        </div>
                    </form>
                </div>
            </section>
        )
    }
}

export default AddRoomForm