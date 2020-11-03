import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

import defaultBcg from '../images/room-1.jpeg';
import Banner from '../components/Banner';
import StyledHero from '../components/StyledHero'

class SingleRoom extends Component {
    constructor(props){
        super(props);
        this.state = {
            rooms: [],
            path: this.props.match.params.path,
            defaultBcg
        };
    }

    componentDidMount(){
        axios.get("http://localhost:5000/room").then(response => {
        if (response.data.length > 0){
            this.setState({
                rooms: response.data
            })
        }
        });
    }

    getRoom(path) {
        if (this.state.rooms.length > 0){
            const room = this.state.rooms.find((room) => room.path === path);
            return (room);
        }
    }

    render() {
        const room = this.getRoom(this.state.path);
        if (!room){
            return (
            <div className="error"> 
                <h3>No such room could be found ...</h3>
                <Link to="/rooms" className="btn-primary">Back to Rooms</Link>
            </div>
            )
        }
        
        // const [mainImg, ...defaultImg] = room.images

        return (
            <div>
                <StyledHero img={this.state.defaultBcg} >
                    <Banner title={`${room.name} rooms`} >
                        <Link to='/rooms' className='btn-primary'>Back to Rooms</Link>
                    </Banner>
                </StyledHero>
                <section className="single-room">
                    <div className="single-room-images" >

                    <img key="1" src={defaultBcg} alt={room.name} />
                    <img key="2" src={defaultBcg} alt={room.name} />
                    <img key="3" src={defaultBcg} alt={room.name} />

                        {/* {defaultImg.map((item, index) => {
                            return (<img key={index} src={item} alt={room.name} />)
                        })} */}
                    </div>
                    <div className="single-room-info">
                        <article className="desc">
                            <h3>Details</h3>
                            <p>{room.description}</p>
                        </article>
                        <article className="info">
                            <h3>Info</h3>
                            <h6>Price: ${room.price}</h6>
                            <h6>Size: {room.size} SQFT</h6>
                            <h6>Max capacity: {room.capacity > 1 ? `${room.capacity} people` : `${room.capacity} person`} </h6>
                            <h6>{room.pet ? "Pets allowed" : "Pets not allowed" }</h6>
                            <h6>{room.breakfast && "free breakfast included"}</h6>
                        </article>
                    </div>
                </section>
                {/* <section className="room-extras">
                    <h3>Extras</h3>
                    <ul className="extras">
                        {room.extras.map((item, index) => { 
                            return (<li key={index} >- {item}</li>)
                        })}
                    </ul>
                </section> */}
             </div>
        )
     }
}

export default SingleRoom
