import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../images/icons/logo.png';
import { UserContext } from '../../App';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    console.log(loggedInUser.name);
    return (
        <div className="header">
            <div className="logo">
                <img src={logo} alt="" />
                <h1>Ready Rides</h1>
            </div>
            <nav className="nav">
                <ul>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/destination">Destination</Link>
                    </li>
                    <li>
                        <Link to="/blog">Blog</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li>
                    {
                        loggedInUser === true ? <Link>{loggedInUser.name}</Link> :
                        <Link className="btn-book" to="/login">Login</Link>
                    }
                    </li>

                </ul>
            </nav>
            
        </div>
    );
};

export default Header;