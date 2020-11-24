import React, { Component } from 'react';
import axios from 'axios';

import Title from '../components/Title';
import Alert from '../components/Alert';

class AddRoomForm extends Component {
    constructor(props) {
        super(props);
  
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.extraHandler = this.extraHandler.bind(this);

        this.state = {
            status: props.status,
            _id: props.room._id,
            name: props.room.name,
            path: props.room.path,
            type: props.room.type,
            allType: [],
            price: props.room.price,
            size: props.room.size,
            capacity: props.room.capacity,
            pets: props.room.pets,
            breakfast: props.room.breakfast,
            featured: props.room.featured,
            description: props.room.description,
            extras: props.room.extras,
            allExtra: [],
            images: props.room.images,
            err: false,
            message:""
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/type')
             .then(response => {
                if (response.data.length > 0){
                    this.setState({ allType: response.data })
                }
             });
        axios.get('http://localhost:5000/extra')
             .then(response => {
                if (response.data.length > 0){
                    this.setState({ allExtra: response.data })
                }
             });
    }

    onChangeHandler(event) {
        const target = event.target;
        const name = event.target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({ [name]: value });
    }

    extraHandler(event) {
        const target = event.target;
        const value = target.value;
        const checked = target.checked;
        const tmpExtra = this.state.extras;
        const i = tmpExtra.indexOf(value);

        if (!checked){
            tmpExtra.splice(i, 1);
        }
        else {
            tmpExtra.splice(0, 0, value)
        }
        this.setState({extras: tmpExtra})
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
            axios.post("http://localhost:5000/room/add", room)
                 .then(response => this.setState({message: response.data, err: false}))
                 .catch(err => {
                    const message = (err.response.data.indexOf("duplicate key") > -1) ? 'The room already exists' : err.response.data;
                    this.setState({message: message, err: true})
                 });
        }
        
        if (this.state.status === 'update'){
            axios.post(`http://localhost:5000/room/update/${this.state._id}`, room)
                 .then(response => this.setState({message: response.data, err: false}))
                 .catch(err => this.setState({message: err.response.data, err: true}));
        }
    }

    render() {
        return (
            <section className="room-add">
                <Title title={this.state.status === 'add' ? "Add Rooms" : "Update Room"}/>
                {this.state.message ? <Alert message={this.state.message} 
                                             status={this.state.err ? "error": "success"} 
                                             /> : null}
                <div className="room-add-center">
                    <form onSubmit={this.onSubmit}>

                        <div className="form-group">
                            <label>Room Name:</label>
                            <input type="text" 
                                   name="name"
                                   className="form-control"
                                   value={this.state.name}
                                   onChange={this.onChangeHandler}
                                   required
                            />
                        </div>

                        <div className="form-group">
                            <label>Room Type:</label>
                            <select name="type" 
                                    value={this.state.type}
                                    className="form-control" 
                                    onChange={this.onChangeHandler}
                            >
                                {
                                    this.state.allType.map(type => {
                                        return <option key={type._id}>{type.name}</option>
                                    })
                                }
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Room Price:</label>
                            <input type="number"
                                   name="price"
                                   className="form-control"
                                   value={this.state.price}
                                   onChange={this.onChangeHandler}
                                   required
                            />
                        </div>

                        <div className="form-group">
                            <label>Room Size:</label>
                            <input type="number"
                                   name="size"
                                   className="form-control"
                                   value={this.state.size}
                                   onChange={this.onChangeHandler}
                                   required
                            />
                        </div>

                        <div className="form-group">
                            <label>Room Capacity:</label>
                            <input type="number" 
                                   name="capacity"
                                   className="form-control"
                                   value={this.state.capacity}
                                   onChange={this.onChangeHandler}
                                   required
                            />
                        </div>

                        <div className="form-group">
                            <label>Room Description:</label>
                            <input type="text"
                                   name="description"
                                   className="form-control"
                                   value={this.state.description}
                                   onChange={this.onChangeHandler}
                                   required
                            />
                        </div>

                        <div className="form-group">
                            <div className="room-add-extra">
                                <input type="checkbox" 
                                       name="breakfast"
                                       className="form-control"
                                       value={this.state.breakfast}
                                       onChange={this.onChangeHandler}
                                />
                                <label>Room breakfast</label>
                            </div>

                            <div className="room-add-extra">
                                <input type="checkbox" 
                                       name="featured" 
                                       className="form-control" 
                                       value={this.state.featured} 
                                       onChange={this.onChangeHandler}
                                />
                                <label>Room Featured</label>
                            </div>

                            <div className="room-add-extra">
                                <input type="checkbox" 
                                       name="pets"
                                       className="form-control"
                                       value={this.state.pets}
                                       onChange={this.onChangeHandler}
                                />
                                <label>Room Pets</label>
                            </div>
                        </div>
                        
                        <div className="form-group">
                            {
                                this.state.allExtra.map(extra => {
                                    return (
                                    <div className="" key={extra._id}>
                                        <input type="checkbox" 
                                               name="extra"
                                               className="form-control"
                                               value={extra.name}
                                               onChange={this.extraHandler}
                                        />
                                        <label>{extra.name}</label>
                                    </div>
                                    ) 
                                })
                                
                            }
                        </div>

                        <div className="form-group add-btn">
                                <input type="submit" 
                                       value={this.state.status === "add" ? "Create New Room" : "Update Room"} 
                                       className="btn-primary" 
                                />
                        </div>
                    </form>
                </div>
            </section>
        )
    }
}

export default AddRoomForm