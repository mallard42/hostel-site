import React from 'react';
import { Link } from 'react-router-dom';

import defaultImg from '../images/room-1.jpeg';

const Room = ({ room, link, deleteRoom}) => {
    return (
        <article className="room" >
            <div className="img-container">
                <img src={ defaultImg } alt={room.path} />
                <div className="price-top" >
                    <h6>${ room.price }</h6>
                    <p>Per Night</p>
                </div>
                <Link to={link === "Edit" ? `/rooms/edit/${room.path}` : `/rooms/${room.path}`} className="btn-primary room-link" >{link}</Link>
                {/* {link === "Edit" ? <button key={room._id} className="btn-primary room-link" onClick={() => deleteRoom(room)}> Delete </button> : null} */}
            </div>
            <p className="room-info">{room.name}</p>
            {link === "Edit" ? <button key={room._id} className="btn-primary" onClick={() => deleteRoom(room)}> Delete </button> : null}
        </article>
    )
}

export default Room;
