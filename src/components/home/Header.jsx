import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.jpg';
import '../styles/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../../lib/firebase';
import { useUserStore } from '../../lib/userStore';

const Header = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { currentUser } = useUserStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className={scrollPosition > 100 ? 'header-scroll' : ''}>
      <div className="logo">
        <Link to="/"><img src={logo} alt="Logo" /></Link>
      </div>
      <nav>
        <ul className="nav-links">
          <li><Link to="/about">about</Link></li>
          <li><Link to="/solutions">solutions</Link></li>
          <li><Link to="/contact">contact</Link></li>
          <li><Link to="/JobSearch">career</Link></li>
          <li><Link to="/customize">customize</Link></li>
          {/*<li><Link to="/upload">ADD</Link></li>*/}
          <li><Link to="/shop">shop</Link></li>
          <li>
            <div className="detail">
              <div className="user">
                <img src={currentUser?.avatar || "./avatar.png"} alt={currentUser?.username || "User Avatar"} />
                <h2>{currentUser?.username || "Your Name"}</h2>
              </div>
            </div>
          </li>
          <li>
            <Link to="/login">
              <button className='logout' style={{ backgroundColor: 'green' }}>Register/LogIn</button>
            </Link>
          </li>
          <li>
            <button className='logout' onClick={() => auth.signOut()}>Logout</button>
          </li>
        </ul>
      </nav>
      <div className="menu-toggle" onClick={toggleDropdown}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <div className={`dropdown-menu ${isDropdownOpen ? 'active' : ''}`}>
        <ul>
          <li>
            <div className="detail">
              <div className="user">
                <img src={currentUser?.avatar || "./avatar.png"} alt={currentUser?.username || "User Avatar"} />
                <h2>{currentUser?.username || "Your Name"}</h2>
              </div>
            </div>
          </li>
          <li><Link to="/about">about</Link></li>
          <li><Link to="/solutions">solutions</Link></li>
          <li><Link to="/contact">contact</Link></li>
          <li><Link to="/JobSearch">career</Link></li>
          <li><Link to="/customize">customize</Link></li>
          <li><Link to="/shop">shop</Link></li>
          <li>
            <Link to="/login">
              <button className='logout' style={{ backgroundColor: 'green' }}>Register/LogIn</button>
            </Link>
          </li>
          <li>
            <button className='logout' onClick={() => auth.signOut()}>Logout</button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
