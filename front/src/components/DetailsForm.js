import React, { Component } from 'react';
import axios from 'axios';

import Title from './Title';
import Alert from './Alert';

class DetailsForm extends Component {
    constructor(props){
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);

        this.state = {
            formName: props.formName,
            status: props.status,
            content: "",
            message: "",
            err: false
        }
    }

    onChangeHandler(event) {
        const value = event.target.value;

        this.setState({ content: value });
    }

    onSubmit(e){
        e.preventDefault();

        const content = {
            [this.state.formName]: this.state.content 
        }
        axios.post(`http://localhost:5000/${this.state.formName}/${this.state.status}`, content)
             .then(response => this.setState({message: response.data, content: "", err: false}))
             .catch(err => {
                const message = (err.response.data.indexOf("duplicate key") > -1) ? `The ${this.state.formName} already exists` : err.response.data;
                this.setState({err: true, message: message});
            });
    }
    
    render() {
        return (
            <section>
                <Title title={`Add ${this.state.formName}`} />

                {this.state.message ? <Alert message={this.state.message} status={this.state.err ? "error": "success"} /> : null}
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>{`Add ${this.state.formName}`} :</label>
                        <input type="text" name="content" className="form-control" value={this.state.content} onChange={this.onChangeHandler}></input>
                    </div>
                    <div className="form-group add-btn">
                        <input type="submit" value={`Add ${this.state.formName}`} className="btn-primary" />
                    </div>
                </form>
            </section>
        )
    }
}

export default DetailsForm;