import React, { Component } from 'react';
import axios from 'axios';

import RoomsList from './RoomsList';
import Title from './Title';

const getUnique = (items, value) => {
    return [...new Set(items.map(item => item[value]))]
}

class RoomsFilter extends Component {
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.filterRooms = this.filterRooms.bind(this);

        this.state = {
            rooms: props.rooms,
            sortedRooms: props.rooms,
            guestsSelect: [],
            typeSelect: [],
            type: 'all',
            capacity: 1,
            price: 0,
            minPrice: 0,
            maxPrice: 0,
            minSize: 0,
            maxSize: 0,
            breakfast: false,
            pets: false
        }
    }

    componentDidMount(){
        let maxPrice = Math.max(...this.state.rooms.map(item => item.price));
        let minPrice = Math.min(...this.state.rooms.map(item => item.price));
        let maxSize = Math.max(...this.state.rooms.map(item => item.size));
        let guestsSelect = getUnique(this.state.rooms, "capacity");

        axios.get('http://localhost:5000/type').then(response => {
            const tmp = ["all"];

            response.data.map(type => {
                return tmp.splice(tmp.length, 0, type.name);
            });

            this.setState({typeSelect: tmp})
        });

        this.setState({
            price: maxPrice,
            maxPrice: maxPrice,
            minPrice: minPrice,
            maxSize: maxSize,
            guestsSelect: guestsSelect,
        });
    }

    filterRooms(){
        let {rooms, type, capacity, price, minSize, breakfast, pets, maxSize} = this.state
        let filtered = [...rooms];

        capacity = parseInt(capacity);
        price = parseInt(price);
        minSize = parseInt(minSize);
        maxSize = parseInt(maxSize);

        if (type !== 'all'){
            filtered = filtered.filter(room => room.type === type);
        }
        
        if (capacity !== 1){
            filtered = filtered.filter(room => room.capacity >= capacity);
        }

        if (breakfast){
            filtered = filtered.filter(room => room.breakfast === breakfast);
        }

        if (pets){
            filtered = filtered.filter(room => room.pets === pets);
        }

        filtered = filtered.filter(room => room.price <= price);
        filtered = filtered.filter(room => room.size >= minSize && room.size <= maxSize);
        
        this.setState({
            sortedRooms: filtered
        });
    }

    handleChange(event) {
        const target = event.target;
        const name = event.target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value ;
    
        this.setState({
            [name]: value
        }, this.filterRooms) 
    }

    render(){
        return (
            <div>
            <section className="filter-container">
            <Title title="Search Rooms"/>
            <form className="filter-form">
                
                <div className="form-groupe">
                    <label htmlFor="type">Room Type</label>
                    <select name="type" id="type" value={this.state.type} className="form-control" onChange={this.handleChange}>
                        {
                            this.state.typeSelect.map((item, index) => {
                                return (<option value={item} key={index}>{item}</option>)
                            })
                        }
                    </select>
                </div>

                <div className="form-groupe">
                    <label htmlFor="capacity">Guests</label>
                    <select name="capacity" id="capacity" value={this.state.capacity} className="form-control" onChange={this.handleChange}>
                        {
                            this.state.guestsSelect.map((item, index) => {
                                return (<option value={item} key={index}>{item}</option>)
                            })
                        }
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="price">Room Price: ${this.state.price}</label>
                    <input type="range" name="price" id="price" min={this.state.minPrice} max={this.state.maxPrice} value={this.state.price} className="form-control" onChange={this.handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="size">Size</label>
                    <div className="size-inputs">
                        <input type="number" name="minSize" id="size" value={this.state.minSize} className="size-input" onChange={this.handleChange} />
                        <input type="number" name="maxSize" id="size" value={this.state.maxSize} className="size-input" onChange={this.handleChange} />
                    </div>
                </div>

                <div className="form-group">
                    <div className="single-extra">
                        <input type="checkbox" name="breakfast" id="breakfast" checked={this.state.breakfast} onChange={this.handleChange}></input>
                        <label htmlFor="breakfast">Breakfast</label>
                    </div>
                    <div className="single-extra">
                        <input type="checkbox" name="pets" id="pets" checked={this.state.pets} onChange={this.handleChange}></input>
                        <label htmlFor="pets">Pets</label>
                    </div>
                </div>

            </form>
        </section>
        
        <RoomsList rooms={ this.state.sortedRooms } link="Featured" />
        </div>
        )
    }
}

export default RoomsFilter