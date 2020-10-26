import React, { Component } from 'react';
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from 'react-icons/fa';

import Title from './Title';

class Services extends Component {
    constructor(props){
        super(props);
        this.state={
            services: [
                {
                    icon: <FaCocktail/>,
                    title: "Free cocktails",
                    info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel.'
                },
                {
                    icon: <FaHiking/>,
                    title: "Endless hiking",
                    info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel.'
                },
                {
                    icon: <FaShuttleVan/>,
                    title: "Free shuttle",
                    info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel.'
                },
                {
                    icon: <FaBeer/>,
                    title: "Strongest beer",
                    info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel.'
                }
            ]
        }
    }

    render() {
        return (
            <section className="services">
                <Title title="Services"/>
                <div className="services-center">
                    {this.state.services.map((item,index) => {
                        return (<article key={index} className="services">
                            <span>{item.icon}</span>
                            <h6>{item.title}</h6>
                            <p>{item.info}</p>
                        </article>)
                    })}
                </div>
            </section>
        )
    }
}

export default Services;