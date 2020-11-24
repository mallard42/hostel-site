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
            <section>
                <Title title={`${this.state.formName} List`} />
                {this.state.alert ? <Alert message={this.state.message} 
                                           status={this.state.err ? "error": "success"}/>: null}
                <table>
                    <tbody>
                        {
                            this.state.content.map(item => {
                                return (
                                    <tr key={item._id}>
                                        <td>
                                            {item.name}
                                        </td>
                                        <td><Link className="btn-primary" to={`/${this.state.formName}/${item.path}`}>Edit</Link></td>
                                        <td>
                                            <button key={item._id} 
                                                    className="btn-primary" 
                                                    onClick={() => this.deleteDetail(item._id)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </section>
        )
    }
}

export default DetailsList