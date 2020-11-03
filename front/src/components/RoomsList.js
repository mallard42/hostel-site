import React from 'react'

import Room from './Room'

const RoomsList = ({rooms , link}) => {
    if (rooms.length === 0){
        return (
            <div className="empty-search">
                <h3>Unfortunately no rooms matched your search parameters</h3>
            </div>
        )
    }

    return (
        <section className="roomslist">
            <div className="roomslist-center">
                {
                    rooms.map(item => {
                        return (
                            <Room key={item._id} room={item} link={link} />
                        )
                    })
                }
            </div>
        </section>
    )
}

export default RoomsList