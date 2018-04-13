import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { AUTH_TOKEN } from '../constants'
import Logo from '../images/jaguarwhite.png';
import './Navbar.css';

class Navbar extends Component {
    render() {
        const authToken = localStorage.getItem(AUTH_TOKEN);
        return (
            <nav>
                <div className="nav-wrapper indigo accent-2">
                    <Link to='/' className="brand-logo"><img id='logo' src={Logo} alt="Logo"/></Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        {!authToken ? (
                            <li><Link to='/login' >login</Link></li>
                        ):(
                            <li><Link to='/logout' onClick={() => {
                                localStorage.removeItem(AUTH_TOKEN)
                                this.props.history.push(`/`)
                            }}>log out</Link></li>
                        )}
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Navbar;