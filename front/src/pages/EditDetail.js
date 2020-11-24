import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

import DetailsForm from '../components/DetailsForm';
import Hero from '../components/Hero';
import Banner from '../components/Banner';

class EditDetail extends Component {
    constructor(props){
        super(props);

        this.state = {
            type: props.match.params.type,
            content: "",
            contentId: "",
            path: props.match.params.id,
            err: true
        }
    }

    componentDidMount(){
        axios.get(`http://localhost:5000/${this.state.type}/${this.state.path}`)
             .then(response => {
                 if (response.data.length > 0){
                    this.setState({
                        content: response.data[0].name,
                        contentId:response.data[0]._id,
                        err: false
                    });
                 }
             })
    }

    render() {
        if (this.state.err){
            return (
                <div className="error"> 
                    <h3>No such {this.state.type} could be found ...</h3>
                    <Link to="/add-detail" className="btn-primary">Back to Detail</Link>
                </div>
            )
        }
        return (
            <div>
                <Hero hero="roomsHero">
                    <Banner title={`Edit ${this.state.type}`}>
                        <Link to='/add-detail' className="btn-primary">Add Detail</Link>
                    </Banner>
                </Hero>
                <DetailsForm content={this.state.content} 
                             contentId={this.state.contentId} 
                             status="update"
                             formName={this.state.type}
                />
            </div>
        )
    }
}

export default EditDetail