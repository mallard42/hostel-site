import React, { Component } from 'react';
import Logo from '../images/logo.svg';
import { FaAlignRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    constructor(props) {
        super(props);
        
        this.state = {isToggleOn: false};

        this.handleClick = this.handleClick.bind(this);
      }
    
      handleClick() {
        this.setState(state => ({
          isToggleOn: !state.isToggleOn
        }));
      }

    render () {
        return(
            <nav className="navbar">
                <div className="nav-center">
                    <div className="nav-header">
                        <Link to="/">
                            <img className="nav-icon" src={ Logo } alt="Beach Resort"/>
                        </Link>
                        <button type="button" className="nav-btn" onClick={this.handleClick}>
                            <FaAlignRight className="nav-icon" />
                        </button>
                    </div>
                    <ul className={this.state.isToggleOn? "nav-links show-nav" : "nav-links" }>
                        <li><Link to="/" onClick={this.handleClick}>Home</Link></li>
                        <li><Link to="/rooms" onClick={this.handleClick}>Rooms</Link></li>
                        <li><Link to="/edit-room" onClick={this.handleClick}>Edit Rooms</Link></li>
                        <li><Link to="/add-detail" onClick={this.handleClick}>Add Detail</Link></li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Navbar
