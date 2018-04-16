import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../images/jaguarwhite.png';
import { Menu, Image, Dropdown} from 'semantic-ui-react';
import './Navbar.css';

const Navbar = () => {
    const authToken = localStorage.getItem('token');
    return (
        <Menu fixed='top' inverted>
            <Menu.Item header>
                <Link to='/'>
                <Image
                    size='mini'
                    src={Logo}
                />
                </Link>
            </Menu.Item>
            <Menu.Menu position='right'>
            <Dropdown item simple text='Account'>
                <Dropdown.Menu id='navbarDropdown'>
                    {!authToken ? (
                        <Dropdown.Item><Link to='/login'>login</Link></Dropdown.Item>
                        ):(
                        <Dropdown.Item><Link to='/' onClick={() => {
                            localStorage.removeItem('token');
                            this.props.history.push(`/`)
                        }}>log out</Link></Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown>
            </Menu.Menu>
        </Menu>
    );
};

export default Navbar;