import React from 'react'
import { Link } from 'react-router-dom'
import './css/Header.css';

function Header() {
    return (
        <div>
            <nav className="nav-container">
                <Link to="/">Home</Link>
                <Link to="/explore">Explore</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>    
            </nav>
        </div>
    )
}

export default Header