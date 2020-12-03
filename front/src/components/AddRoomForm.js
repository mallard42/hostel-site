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
            message: ""
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

        if (name === 'file'){
            value = target.files;
        }

        this.setState({ [name]: value });
    }

    uploadImg(e) {
        e.preventDefault();
        const file = this.state.file;
        const formData = new FormData();

        for (let i = 0; i < file.length; i++) {
            formData.append("files", file[i])
        }

        axios.post('http://localhost:5000/upload', formData)
            .then(res => {
                console.log(res.data);
                // const img = {
                //     fileName: res.data.fileName, 
                //     filePath: res.data.filePath
                // };
                // const tmpImg = this.state.images;
                // tmpImg.splice(0, 0, img);
                // this.setState({images: tmpImg});
            })
            .catch(err => {
                let message = '';

                if(err.response.status === 500) {
                    message = 'There was a probleme with the server !';
                }
                else { 
                    message = err.response.data.msg;
                }
                this.setState({message: message});
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
                .then(response => this.setState({ message: response.data, err: false }))
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
                {this.state.message ? <Alert message={this.state.message}
                    status={this.state.err ? "error" : "success"}
                /> : null}
                <div className="room-add-center">
                    <form>

                        <Form
                            type="text"
                            className="form-control margin-bottom"
                            name="name"
                            value={this.state.name}
                            onChange={this.onChangeHandler}
                            label="Room name"
                            required={true}
                        />

                        <div className="form-group">
                            <label>Room Type:</label>
                            <select name="type"
                                value={this.state.type}
                                className="form-control margin-bottom"
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
                            className="form-control margin-bottom"
                            value={this.state.price}
                            onChange={this.onChangeHandler}
                            required={true}
                            label="Room price"
                        />

                        <Form type="number"
                            className="form-control margin-bottom"
                            name="size"
                            value={this.state.size}
                            onChange={this.onChangeHandler}
                            required={true}
                            label="Room size"
                        />

                        <Form type="number"
                            className="form-control margin-bottom"
                            name="capacity"
                            value={this.state.capacity}
                            onChange={this.onChangeHandler}
                            required={true}
                            label="Room capacity"
                        />

                        <Form type="text"
                            className="form-control margin-bottom"
                            name="description"
                            value={this.state.description}
                            onChange={this.onChangeHandler}
                            required={true}
                            label="Room description"
                        />


                        <div className="room-add-option margin-bottom">
                            <Form type="checkbox"
                                name="breakfast"
                                value={this.state.breakfast}
                                onChange={this.onChangeHandler}
                                label="Breakfast"
                            />

                            <Form type="checkbox"
                                name="featured"
                                value={this.state.featured}
                                onChange={this.onChangeHandler}
                                label="Featured room"
                            />
                            <Form type="checkbox"
                                name="pets"
                                value={this.state.pets}
                                onChange={this.onChangeHandler}
                                label="Pets"
                            />
                        </div>

                        <div className="form-group margin-bottom">
                            {
                                this.state.allExtra.map(extra => {
                                    return (
                                        <div className="room-add-extra" key={extra._id}>
                                            <input type="checkbox"
                                                name="extra"
                                                className="margin-bottom"
                                                value={extra.name}
                                                onChange={this.extraHandler}
                                            />
                                            <label>{extra.name}</label>
                                            <br/>
                                        </div>
                                    )
                                })

                            }
                        </div>

                        <div className="form-group">
                            <div className="custom-file">
                                <label>Room Images:</label>
                                <input name="file" multiple type="file" onChange={this.onChangeHandler} />
                            </div>
                            <button onClick={this.uploadImg} className="btn btn-primary">Upload</button>
                            {
                                this.state.images.map(img => {
                                    return <img src={img.filePath} alt={img.name}/>
                                })
                            }
                        </div>
                            

                        <div className="form-group add-btn">
                            <button type="submit"
                                onClick={this.onSubmit}
                                className="btn-primary"
                            >{this.state.status === "add" ? "Create New Room" : "Update Room"}</button>
                        </div>
                        
                    </form>

                    

                </div>
            </section >
        )
    }
}

export default AddRoomForm