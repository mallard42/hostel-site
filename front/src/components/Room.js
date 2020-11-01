import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import defaultImg from '../images/room-1.jpeg';

const Room = ({ room }) => {
    return (
        <article className="room" >
            <div className="img-container">
                <img src={ defaultImg } alt={room.path} />
                <div className="price-top" >
                    <h6>${ room.price }</h6>
                    <p>Per Night</p>
                </div>
                <Link to={`/rooms/${room.path}`} className="btn-primary room-link" >Features</Link>
            </div>
            <p className="room-info">{room.name}</p>
        </article>
    )
}

Room.propTypes = {
    room: PropTypes.shape({
        name: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
        price: PropTypes.number.isRequired,
        path: PropTypes.string.isRequired,
    })
}

export default Room;
