import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import DetailsForm from '../components/DetailsForm';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import DetailsList from '../components/DetailsList'

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
                <DetailsForm formName="type" status="add" content=""/>
                <DetailsList formName="type" />
                <DetailsForm formName="extra" status="add" content=""/>
                <DetailsList formName="extra" />
            </div>
        )
    }
}

export default AddDetailsRoom