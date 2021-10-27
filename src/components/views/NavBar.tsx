import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <div>
      <nav className="navBar">
        <div className="links">
          <ul>
            <li><Link className="link" to="/">Home</Link></li>
            <li><Link className="link" to="/networkPolicy">Network Policies</Link></li>
          </ul>
        </div>
      </nav>
    </div>
  )
}
