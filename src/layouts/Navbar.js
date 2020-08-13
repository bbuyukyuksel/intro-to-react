import React from 'react'
import propTypes from 'prop-types';
import {Link} from 'react-router-dom';
function Navbar({title}) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">Home</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/users" className="nav-link">Users</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/add-user" className="nav-link">Add User</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/contribute" className="nav-link">Contribute</Link>
                    </li>
                </ul>

            </div>
        </nav>
    )
}
/*
const Navbar = () => {
    return (
        <div>
            <h3>User App</h3>
        </div>
    )
}
*/
Navbar.propTypes = {
    title : propTypes.string.isRequired

}
Navbar.defaultProps = {
    title : "Default App"
}

export default Navbar;