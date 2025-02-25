import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/background.png';
import '../styles/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useUserStore } from '../../lib/userStore';

const Header = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { currentUser } = useUserStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate(); // Use navigate hook for redirection

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

  const handleUserClick = () => {
    navigate('/user-details'); // Redirect to the UserDetails page
  };
  useEffect(() => {
    console.log("Current User:", currentUser);
  }, [currentUser]);
  
  return (
    <header className={scrollPosition > 100 ? 'header-scroll' : ''}>
      <div className="logo">
        <Link to="/"><img src={logo} alt="Logo" /></Link>
      </div>
      <nav>
        <ul className="nav-links">
          <li><Link to="/about">ABOUT</Link></li>
          <li><Link to="/solutions">SOLUTIONS</Link></li>
          <li><Link to="/contact">CONTACT</Link></li>
          <li><Link to="/JobSearch">CAREER</Link></li>
          <li><Link to="/customize">CUSTOMIZE</Link></li>
          <li><Link to="/shop">SHOP</Link></li>
          {/* Render login option based on user authentication state */}
          {!currentUser && (
            <li>
              <Link to="/login">
                <button className='logout' style={{ backgroundColor: 'green' }}>Register/LogIn</button>
              </Link>
            </li>
          )}
          <li onClick={handleUserClick} style={{ cursor: 'pointer' }}>
            <div className="detail separate-detail">
              <div className="user">
                <img src={currentUser?.avatar || "./avatar.png"} alt={currentUser?.username || "User Avatar"} />
                <h2 style={{color:'cyan'}}>{currentUser?.username || "Your Name"}</h2>
              </div>
            </div>
          </li>
          

        </ul>
      </nav>
      
      <div className="menu-toggle" onClick={toggleDropdown}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <div className={`dropdown-menu ${isDropdownOpen ? 'active' : ''}`}>
        <ul>
          <li onClick={handleUserClick} style={{ cursor: 'pointer' }}>
            <div className="detail">
              <div className="user user1">
                <img src={currentUser?.avatar || "./avatar.png"} alt={currentUser?.username || "User Avatar"} />
                <h2 style={{color:'cyan'}}>{currentUser?.username || "Your Name"}</h2>
              </div>
            </div>
          </li>
          <li><Link to="/about">ABOUT</Link></li>
          <li><Link to="/solutions">SOLUTIONS</Link></li>
          <li><Link to="/contact">CONTACT</Link></li>
          <li><Link to="/JobSearch">CAREER</Link></li>
          <li><Link to="/customize">CUSTOMIZE</Link></li>
          <li><Link to="/shop">SHOP</Link></li>
          {/* Render login option in the dropdown menu */}
          {!currentUser && (
            <li>
              <Link to="/login">
                <button className='logout' style={{ backgroundColor: 'green' }}>Register/LogIn</button>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
