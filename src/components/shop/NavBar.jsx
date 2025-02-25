import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/ecommerce.svg';
import homelogo from "../assets/images/background.png";
import './Home.css';
import { Icon } from 'react-icons-kit';
import { cart } from 'react-icons-kit/entypo/cart';
import { CartContext } from './CartContext';
import { auth } from '../../lib/firebase';
import { useUserStore } from '../../lib/userStore';


export const NavBar = () => {
    const { totalQty } = useContext(CartContext);
    const { currentUser } = useUserStore(); // Correctly invoke the useUserStore hook


    return (
        <div className='navbox'>
            <div className="leftside">
                <Link to="/"><img className='homelogo' src={homelogo} alt=''/></Link>
            </div>
           
            <div className="rightside">
            <div className="detail">
              <div className="user">
                <img src={currentUser?.avatar || "./avatar.png"} alt={currentUser?.username || "User Avatar"} />
                <h2 className='jane'>{currentUser?.username || "Jane Doe"}</h2>
              </div>
            </div>
                <span>
                    <Link to="cartproducts" className='navlink'>
                        <Icon icon={cart} size={32} /> {/* Increase the size as needed */}
                    </Link>
                </span>
                <div className='relative'>
                    <span className='no-of-products'>{totalQty}</span>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
