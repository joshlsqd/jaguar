import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Navbar extends Component {
    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link to='/'><a className="brand-logo">Logo</a></Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><Link to='/signup'><a href="">Sign Up</a></Link></li>
                        <li><Link to='/signin'><a href="">Sign In</a></Link></li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Navbar;