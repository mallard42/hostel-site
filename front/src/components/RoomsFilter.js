import React, { useContext } from 'react'

import { RoomContext } from '../context'

import Title from './Title'

const getUnique = (items, value) => {
    return [...new Set(items.map(item => item[value]))]
}

const RoomsFilter = () => {
    const context = useContext(RoomContext);
    const {handleChange, type, capacity, price, minPrice, maxPrice, minSize, maxSize, breakfast, pets} = context;
    
    let guestsSelect = getUnique(context.rooms, "capacity")
    let typeSelect = getUnique(context.rooms, "type");
    typeSelect = ['all', ...typeSelect];

    return (
        <section className="filter-container">
            <Title title="Search Rooms"/>
            <form className="filter-form">
                
                <div className="form-groupe">
                    <label htmlFor="type">Room Type</label>
                    <select name="type" id="type" value={type} className="form-control" onChange={handleChange}>
                        {
                            typeSelect.map((item, index) => {
                                return (<option value={item} key={index}>{item}</option>)
                            })
                        }
                    </select>
                </div>

                <div className="form-groupe">
                    <label htmlFor="capacity">Guests</label>
                    <select name="capacity" id="capacity" value={capacity} className="form-control" onChange={handleChange}>
                        {
                            guestsSelect.map((item, index) => {
                                return (<option value={item} key={index}>{item}</option>)
                            })
                        }
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="price">Room Price: ${price}</label>
                    <input type="range" name="price" id="price" min={minPrice} max={maxPrice} value={price} className="form-control" onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="size">Size</label>
                    <div className="size-inputs">
                        <input type="number" name="minSize" id="size" value={minSize} className="size-input" onChange={handleChange} />
                        <input type="number" name="maxSize" id="size" value={maxSize} className="size-input" onChange={handleChange} />
                    </div>
                </div>

                <div className="form-group">
                    <div className="single-extra">
                        <input type="checkbox" name="breakfast" id="breakfast" checked={breakfast} onChange={handleChange}></input>
                        <label htmlFor="size">Breakfast</label>
                    </div>
                    <div className="single-extra">
                        <input type="checkbox" name="pets" id="pets" checked={pets} onChange={handleChange}></input>
                        <label htmlFor="size">Pets</label>
                    </div>
                </div>

            </form>
        </section>
    )
}

export default RoomsFilter