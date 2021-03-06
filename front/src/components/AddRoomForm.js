import React, { Component } from 'react';
import axios from 'axios';

import Title from './Title';
import Alert from './Alert';
import Form from './Form';

class AddRoomForm extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.extraHandler = this.extraHandler.bind(this);
        this.uploadImg = this.uploadImg.bind(this);
        this.fileInput = React.createRef();

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
            file: [],
            err: false,
            message: "",
            messageImg: "",
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/type')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({ allType: response.data })
                }
            });
        axios.get('http://localhost:5000/extra')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({ allExtra: response.data })
                }
            });
    }

    onChangeHandler(event) {
        const target = event.target;
        const name = event.target.name;
        let value = target.type === 'checkbox' ? target.checked : target.value;

        if (name === 'file') {
            value = target.files;
        }

        this.setState({ [name]: value });
    }

    uploadImg(e) {
        e.preventDefault();
        const file = this.state.file;
        const formData = new FormData();

        for (let i = 0; i < file.length; i++) {
            formData.append("file", file[i])
        }

        axios.post('http://localhost:5000/upload', formData)
            .then(res => {
                const data = res.data;
                let tmpImg = [...this.state.images];

                for (let i = 0; i < data.length; i++) {
                    if (tmpImg === undefined) {
                        tmpImg = [data[i]];
                    }
                    else {
                        tmpImg.splice(tmpImg.length, 0, data[i]);
                    }
                }
                this.setState({ images: tmpImg, messageImg: "" });
            })
            .catch(err => {
                let message = '';

                if (err.response.status === 500) {
                    message = 'There was a probleme with the server !';
                }
                else {
                    message = err.response.data;
                }
                this.setState({ messageImg: message });
            });
    }

    extraHandler(event) {
        const target = event.target;
        const value = target.value;
        const checked = target.checked;
        const tmpExtra = this.state.extras;
        const i = tmpExtra.indexOf(value);

        if (!checked) {
            tmpExtra.splice(i, 1);
        }
        else {
            tmpExtra.splice(0, 0, value)
        }
        this.setState({ extras: tmpExtra })
    }

    onSubmit(e) {
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
        if (this.state.status === 'add') {
            axios.post("http://localhost:5000/room/add", room)
                .then(response => this.setState({
                    message: response.data,
                    err: false,
                    name: '',
                    path: "single-economy",
                    type: 'single room',
                    price: 0,
                    size: 0,
                    capacity: 0,
                    pets: false,
                    breakfast: false,
                    featured: false,
                    description: '',
                    extras: [],
                    images: []
                }))
                .catch(err => {
                    const message = (err.response.data.indexOf("duplicate key") > -1) ? 'The room already exists' : err.response.data;
                    this.setState({ message: message, err: true })
                });
        }

        if (this.state.status === 'update') {
            axios.post(`http://localhost:5000/room/update/${this.state._id}`, room)
                .then(response => this.setState({ message: response.data, err: false }))
                .catch(err => this.setState({ message: err.response.data, err: true }));
        }
    }

    render() {
        return (
            <section className="section-margin">
                <Title title={this.state.status === 'add' ? "Add Rooms" : "Update Room"} />

                { this.state.message ? <Alert message={this.state.message} status={this.state.err ? "error" : "success"} /> : null}

                <div className="room-add-center">
                    <form>

                        <Form
                            type="text"
                            className="room-add-input margin-bottom"
                            name="name"
                            value={this.state.name}
                            onChange={this.onChangeHandler}
                            label="Room name"
                            required={true}
                        />

                        <div className="room-add-form">
                            <label>Room Type:</label>
                            <select name="type"
                                value={this.state.type}
                                className="room-add-input margin-bottom"
                                onChange={this.onChangeHandler}
                            >
                                {
                                    this.state.allType.map(type => {
                                        return <option key={type._id}>{type.name}</option>
                                    })
                                }
                            </select>
                        </div>

                        <Form type="number"
                            name="price"
                            className="room-add-input margin-bottom"
                            value={this.state.price}
                            onChange={this.onChangeHandler}
                            required={true}
                            label="Room price"
                        />

                        <Form type="number"
                            className="room-add-input margin-bottom"
                            name="size"
                            value={this.state.size}
                            onChange={this.onChangeHandler}
                            required={true}
                            label="Room size"
                        />

                        <Form type="number"
                            className="room-add-input margin-bottom"
                            name="capacity"
                            value={this.state.capacity}
                            onChange={this.onChangeHandler}
                            required={true}
                            label="Room capacity"
                        />

                        <Form type="text"
                            className="room-add-input margin-bottom"
                            name="description"
                            value={this.state.description}
                            onChange={this.onChangeHandler}
                            required={true}
                            label="Room description"
                        />


                        <div className="room-add-option margin-bottom">

                            <div className="room-add-form">
                                <label >Breakfast:</label>
                                <input type="checkbox"
                                    name="breakfast"
                                    value={this.state.breakfast}
                                    className="room-checkbox"
                                    onChange={this.onChangeHandler}
                                    checked={this.state.breakfast}
                                />
                            </div>

                            <div className="room-add-form">
                                <label >Featured:</label>
                                <input type="checkbox"
                                    name="featured"
                                    value={this.state.featured}
                                    className="room-checkbox"
                                    onChange={this.onChangeHandler}
                                    checked={this.state.featured}
                                />
                            </div>

                            <div className="room-add-form">
                                <label >Pets:</label>
                                <input type="checkbox"
                                    name="pets"
                                    value={this.state.pets}
                                    className="room-checkbox"
                                    onChange={this.onChangeHandler}
                                    checked={this.state.pets}
                                />
                            </div>
                        </div>

                        <div className="form-group margin-bottom">
                            <label className="margin-bottom">Extra:</label>
                            {
                                this.state.allExtra.map(extra => {
                                    return (
                                        <div className="room-add-extra" key={extra._id}>
                                            <input type="checkbox"
                                                name="extra"
                                                value={extra.name}
                                                onChange={this.extraHandler}
                                                checked={this.state.extras.find(element => element === extra.name) ? true : false}
                                            />
                                            <label>{extra.name}</label>
                                            <br />
                                        </div>
                                    )
                                })
                            }
                        </div>

                        {this.state.messageImg ? <Alert message={this.state.messageImg} status="error" /> : null}

                        <div className="form-group">
                            <div className="custom-file room-file-form">
                                <label>Room Images:</label>
                                <input name="file" multiple type="file" onChange={this.onChangeHandler} />
                                <div className="room-file-button margin-bottom">
                                    <button onClick={this.uploadImg} className="btn btn-primary">
                                        Upload
                                    </button>
                                </div>
                            </div>

                            <div className="single-room-images margin-bottom">
                                {
                                    this.state.images.map((img, i) => {
                                        return <img src={img} key={i} alt="" />
                                    })
                                }
                            </div>

                        </div>


                        <div className="form-group add-btn">
                            <button type="submit"
                                onClick={this.onSubmit}
                                className="btn-primary"
                            >
                                {this.state.status === "add" ? "Create New Room" : "Update Room"}
                            </button>
                        </div>

                    </form>
                </div>
            </section>
        )
    }
}

export default AddRoomForm