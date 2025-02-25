import React, { useState, useEffect, useContext } from 'react';
import { auth, db } from '../../lib/firebase';
import { CartContext } from './CartContext';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, addDoc, updateDoc } from 'firebase/firestore';
import NavBar from './NavBar';
import { toast } from 'react-toastify';
import useCheckoutStore from '../../lib/checkoutStore';

export const Cashout = (props) => {

    const navigate = useNavigate();
    const { shoppingCart, totalPrice, totalQty, dispatch } = useContext(CartContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cell, setCell] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [cellError, setCellError] = useState('');
    const [addressError, setAddressError] = useState('');
    const { specification } = useCheckoutStore();

    console.log('Specification:', specification);
    useEffect(() => {
        const fetchUserData = async (user) => {
            const userDoc = doc(db, 'users', user.uid);
            const userData = await getDoc(userDoc);
            if (userData.exists()) {
                setName(userData.data().username);
                setEmail(userData.data().email);
            } else {
                console.log("No such document!");
            }
        };

        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                fetchUserData(user);
            } else {
                navigate('/login');
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const validateInputs = () => {
        let isValid = true;

        // Validate cell number (Pakistan-specific)
        const cellRegex = /^[6-9][0-9]{9}$/;;
        if (!cellRegex.test(cell)) {
            setCellError('Please enter a valid cell number (e.g., 03123456789).');
            isValid = false;
        } else {
            setCellError('');
        }

        // Validate address
        if (!address.trim()) {
            setAddressError('Address cannot be empty.');
            isValid = false;
        } else if (address.length < 10) {
            setAddressError('Address should be at least 10 characters long.');
            isValid = false;
        } else {
            setAddressError('');
        }

        return isValid;
    };
    console.log(props);
    const purchaseProduct = async (productId, purchaseQuantity, isCustomProduct) => {
        try {
            if (!isCustomProduct) {
                const productRef = doc(db, 'Products', productId);
                const productDoc = await getDoc(productRef);

                if (productDoc.exists()) {
                    const currentStock = productDoc.data().ProductStock;
                    if (currentStock >= purchaseQuantity) {
                        await updateDoc(productRef, {
                            ProductStock: currentStock - purchaseQuantity,
                        });
                        return 'ReadyMadeProductOrders';
                    } else {
                        console.warn('Insufficient stock in ReadyMadeProducts');
                        return false;
                    }
                }
            }

            return 'CustomizeProductOrders';
        } catch (err) {
            console.error('Error purchasing product: ', err);
            return false;
        }
    };

    const cashoutSubmit = async (e) => {
        e.preventDefault();
        if (!validateInputs()) return;

        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const date = new Date();
                const orderData = {
                    BuyerName: name,
                    BuyerEmail: email,
                    BuyerCell: cell,
                    BuyerAddress: address,
                    BuyerPayment: totalPrice,
                    BuyerQuantity: totalQty,
                    Timestamp: date.getTime(),
                    specifications: specification || '',
                };

                let allSuccessful = true;

                const readyMadeProducts = [];
                const customProducts = [];

                for (const product of shoppingCart) {
                    const result = await purchaseProduct(product.ProductID, product.qty, product.isCustomProduct);
                    if (result === false) {
                        allSuccessful = false;
                        break;
                    }
                    if (result === 'ReadyMadeProductOrders') {
                        readyMadeProducts.push(product);
                    } else {
                        const { category, materialName } = product;
                        if (!category || !materialName) {
                            console.error('Category or materialName is undefined:', product);
                            allSuccessful = false;
                            break;
                        }
                        customProducts.push({
                            ...product,
                            category,
                            materialName,
                               
                        });
                    }
                }

                if (allSuccessful) {
                    if (readyMadeProducts.length > 0) {
                        const readyMadeOrdersRef = collection(db, 'ReadyMadeProductOrders');
                        await addDoc(readyMadeOrdersRef, {
                            ...orderData,
                            UserID: user.uid,
                            Products: readyMadeProducts,
                        });
                    }

                    if (customProducts.length > 0) {
                        const customOrdersRef = collection(db, 'CustomizeProductOrders');
                        await addDoc(customOrdersRef, {
                            ...orderData,
                            UserID: user.uid,
                            Products: customProducts,
                        });
                    }

                    setCell('');
                    setAddress('');
                    dispatch({ type: 'EMPTY' });
                    toast.success('Your order has been placed successfully. Redirecting to the home page.', {
                        position: "top-right",
                        autoClose: 5000,
                    });

                    setTimeout(() => navigate('/'), 5000);
                } else {
                    toast.error('Some items in your cart are out of stock.', {
                        position: "top-right",
                        autoClose: 2000,
                    });
                }
            }
        });
    };

    return (
        <div className='cashout'>
            <NavBar user={props.user} />
            <div className='container mt-4'>
                <h2 className='text-center mb-4'>Cashout Details</h2>
                {error && <div className='alert alert-danger'>{error}</div>}
                <form autoComplete="off" className='form-group' onSubmit={cashoutSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className='form-label'>Name</label>
                        <input type="text" className='form-control' value={name} disabled />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className='form-label'>Email</label>
                        <input type="email" className='form-control' value={email} disabled />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cellNo" className='form-label'>Cell No</label>
                        <input
                            type="number"
                            className={`form-control ${cellError ? 'is-invalid' : ''}`}
                            required
                            placeholder='e.g. 03123456789'
                            value={cell}
                            onChange={(e) => setCell(e.target.value)}
                        />
                        {cellError && <div className="invalid-feedback">{cellError}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="deliveryAddress" className='form-label'>Delivery Address</label>
                        <input
                            type="text"
                            className={`form-control ${addressError ? 'is-invalid' : ''}`}
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        {addressError && <div className="invalid-feedback">{addressError}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="priceToPay" className='form-label'>Price To Pay</label>
                        <input type="number" className='form-control' value={totalPrice} disabled />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="totalNoOfProducts" className='form-label'>Total No of Products</label>
                        <input type="number" className='form-control' value={totalQty} disabled />
                    </div>
                    

                    <button type="submit" className='btn btn-success btn-md mybtn'>SUBMIT</button>
                </form>
            </div>
        </div>
    );
};
