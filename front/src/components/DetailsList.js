import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Title from './Title';

class DetailsList extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            formName: props.formName,
            content: []
        }
    }

    componentDidMount(){
        axios.get(`http://localhost:5000/${this.state.formName}`).then(response => {
            if (response.data.length > 0){
                this.setState({
                    content: response.data
                })
            }
        });
    }

    render() {
        return (
            <section>
                <Title title={`${this.state.formName} List`} />
                <table>
                    <tbody>
                        {
                            this.state.content.map(item => {
                                return (
                                    <tr> 
                                        <td>
                                            {item[this.state.formName]}
                                        </td>
                                        <Link className="btn-primary" to="">Edit</Link>
                                        <button className="btn-primary">Delete</button>
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