import React, { useEffect } from 'react'
import { NavBar } from './NavBar';

import './Home.css';
import ProductList from './ProductList';

export const ShopHome = () => {

    return (
        <div className='wrapper'>
            <NavBar />
            <ProductList/>
        </div>
    )
}
export default ShopHome;
