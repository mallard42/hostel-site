import React, { Component } from 'react'

import items from './data';

const RoomContext = React.createContext();

class RoomProvider extends Component {
    constructor(props){
        super(props);
        
        this.getRoom = this.getRoom.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.filterRooms = this.filterRooms.bind(this);

        this.state = {
            rooms: [],
            sortedRooms: [],
            featuredRooms: [],
            loading: true,
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
        let rooms = this.formatData(items);
        let featuredRooms = rooms.filter(room => room.featured === true);
        let maxPrice = Math.max(...rooms.map(item => item.price));
        let minPrice = Math.min(...rooms.map(item => item.price));
        let maxSize = Math.max(...rooms.map(item => item.size));

        this.setState({
            rooms: rooms,
            sortedRooms: rooms,
            featuredRooms: featuredRooms,
            loading: false,
            price: maxPrice,
            maxPrice: maxPrice,
            minPrice: minPrice,
            maxSize: maxSize
        });
    }

    formatData(items){
        let tempItems = items.map(item => {
            let id = item.sys.id;
            let images = item.fields.images.map(image => image.fields.file.url);

            let room = { ...item.fields, images, id };
            
            return (room);
        })
        return (tempItems);
    }

    getRoom(slug) {
        if (this.state.rooms.length > 0){
            const room = this.state.rooms.find((room) => room.slug === slug);
            return (room);
        }
    }

    handleChange(event){
        const target = event.target;
        const name = event.target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value ;

        this.setState({
            [name]: value
        }, this.filterRooms) 
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
        
        this.setState(state => ({
            sortedRooms: filtered
        }));
    }

    render() {
        return (
            <RoomContext.Provider value={{ ...this.state, getRoom: this.getRoom, handleChange: this.handleChange }}>
                <p>{this.state.loading}</p>
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}

const RoomConsumer = RoomContext.Consumer

export function withRoomConsumer(Component){
    return function ConsumerWrapper(props){
        return (
            <RoomConsumer> 
                { value => <Component {...props} context={value} /> }
            </RoomConsumer>)
    }
}

export { RoomProvider, RoomConsumer, RoomContext }