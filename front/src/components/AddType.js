import React, { Component } from 'react'
import axios from 'axios'

class AddType extends Component {
    constructor(props){
        super(props);

        this.state = {
            status: props.status,
            type: "",
            types: []
        }
    }
    
    componentDidMount(){
        axios.get("http://localhost:5000/type").then(response => {
            if (response.data.length > 0){
                this.state({ type: response.data })
            }
        })
    }
    
    onsubmit(e) {
        e.preventDefault();

        if (this.state.status === 'add') {
            axios.post("http://localhost:5000/type/add", this.state.type);
        }

        if (this.state.status === 'update') {
            axios.post("http://localhost:5000/type/update", this.state.type);
        }
    }

    render() {
        return (
            <div>
                coucou
            </div>
        )
    }
}

export default AddType