import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Title from './Title';
import Alert from './Alert'

class DetailsList extends Component {
    constructor(props){
        super(props);
        
        this.deleteDetail = this.deleteDetail.bind(this);

        this.state = {
            formName: props.formName,
            content: [],
            alert: false,
            err: false,
            message: ""
        }
    }

    deleteDetail (id){
        axios.delete(`http://localhost:5000/${this.state.formName}/delete/${id}`)
             .then(response => this.setState({message: response.data, err: false}))
             .catch(err => this.setState({message: err.response.data, err: true}))

        this.setState({
            content: this.state.content.filter(item => item._id !== id),
            alert: true
        })
    }

    componentDidMount(){
        axios.get(`http://localhost:5000/${this.state.formName}`)
             .then(response => {
                if (response.data.length > 0){
                    this.setState({ content: response.data })
                }
             });
    }

    render() {
        return (
            <section className="detail-list-center">
                <Title title={`${this.state.formName} List`} />
                {this.state.alert ? <Alert message={this.state.message} status={this.state.err ? "error": "success"}/>: null}
                        {
                            this.state.content.map(item => {
                                return (
                                    <div key={item._id} className="detail-list">
                                        <div className="detail-name"> {item.name} </div>
                                        <div className="detail-button-container">
                                            <Link className="btn-primary detail-button" to={`/${this.state.formName}/${item.path}`}>Edit</Link>
                                            <button key={item._id} className="btn-primary detail-button" onClick={() => this.deleteDetail(item._id)}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                        }
            </section>
        )
    }
}

export default DetailsList