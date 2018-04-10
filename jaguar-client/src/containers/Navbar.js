import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Logo from '../images/jaguarwhite.png';
import './Navbar.css';

class Navbar extends Component {
    render() {
        return (
            <nav>
                <div className="nav-wrapper indigo accent-2">
                    <Link to='/' className="brand-logo"><img id='logo' src={Logo} alt="Logo"/></Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><Link to='/signup'>Sign Up</Link></li>
                        <li><Link to='/signin'>Sign In</Link></li>
                        <li><Link to='/logout'>Log Out</Link></li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Navbar;