import React from 'react';
import { Link } from 'react-router-dom';

import defaultImg from '../images/room-1.jpeg';

const Room = ({ room , link}) => {
    return (
        <article className="room" >
            <div className="img-container">
                <img src={ defaultImg } alt={room.path} />
                <div className="price-top" >
                    <h6>${ room.price }</h6>
                    <p>Per Night</p>
                </div>
                <Link to={link === "Edit" ? `/rooms/edit/${room.path}` : `/rooms/${room.path}`} className="btn-primary room-link" >{link}</Link>
            </div>
            <p className="room-info">{room.name}</p>
        </article>
    )
}

export default Room;
