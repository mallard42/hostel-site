import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import DetailsForm from '../components/DetailsForm';
import Hero from '../components/Hero';
import Banner from '../components/Banner';

class AddDetailsRoom extends Component {
    constructor(props){
        super(props);

        this.state = {
        }
    }
    
    render() {
        return (
            <div>
                <Hero hero="roomsHero">
                    <Banner title="Edit Room">
                        <Link to='/' className="btn-primary">Return Home</Link>
                    </Banner>
                </Hero>
                <section>
                    <DetailsForm formName="type" />
                </section>

                <section>
                    <DetailsForm formName="extras" />
                </section>
            </div>
        )
    }
}

export default AddDetailsRoom