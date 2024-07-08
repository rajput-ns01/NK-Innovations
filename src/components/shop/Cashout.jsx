import React, { useState, useEffect, useContext } from 'react';
import { auth, db } from '../../lib/firebase';
import { CartContext } from './CartContext';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, addDoc, updateDoc } from 'firebase/firestore';
import NavBar from './NavBar';
import { toast } from 'react-toastify';

export const Cashout = (props) => {
    const navigate = useNavigate();
    const { shoppingCart, totalPrice, totalQty, dispatch } = useContext(CartContext);

    // Defining state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cell, setCell] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

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

    const purchaseProduct = async (productId, purchaseQuantity) => {
        const productRef = doc(db, 'Products', productId);
        try {
            const productDoc = await getDoc(productRef);
            const currentStock = productDoc.data().ProductStock;

            if (currentStock >= purchaseQuantity) {
                await updateDoc(productRef, {
                    ProductStock: currentStock - purchaseQuantity,
                });
                return true; // Indicates successful purchase
            } else {
                return false; // Indicates insufficient stock
            }
        } catch (err) {
            console.error('Error purchasing product: ', err);
            return false; // Indicates error
        }
    };

    const cashoutSubmit = async (e) => {
        e.preventDefault();
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const date = new Date();
                const time = date.getTime();
                const orderCollectionRef = collection(db, 'Buyer-info ' + user.uid);

                // Prepare an array of products with necessary details including ProductID
                const products = shoppingCart.map(product => ({
                    ProductID: product.ProductID,
                    ProductName: product.ProductName,
                    ProductPrice: product.ProductPrice,
                    qty: product.qty,
                    TotalProductPrice: product.TotalProductPrice
                }));

                // Deduct stock for each product in the shopping cart
                let allSuccessful = true;
                for (const product of products) {
                    const success = await purchaseProduct(product.ProductID, product.qty);
                    if (!success) {
                        allSuccessful = false;
                        break;
                    }
                }

                if (allSuccessful) {
                    // Proceed with order if all stock deductions were successful
                    addDoc(orderCollectionRef, {
                        BuyerName: name,
                        BuyerEmail: email,
                        BuyerCell: cell,
                        BuyerAddress: address,
                        BuyerPayment: totalPrice,
                        BuyerQuantity: totalQty,
                        Products: products, // Include the array of products
                        Timestamp: time
                    }).then(() => {
                        setCell('');
                        setAddress('');
                        dispatch({ type: 'EMPTY' });
                        toast.success('Your order has been placed successfully. Thanks for visiting us. You will be redirected to home page after 5 seconds', {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: false,
                            progress: undefined,
                          });
                        setTimeout(() => {
                            navigate('/');
                        }, 5000);
                    }).catch(err => setError(err.message));
                } else {
                    toast.error('Some items in your cart are out of stock.', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                      });
                }
            }
        });
    };

    return (
        <>
            <NavBar user={props.user} />
            <div className='container mt-4'>
                <h2 className='text-center mb-4'>Cashout Details</h2>
                {successMsg && <div className='alert alert-success'>{successMsg}</div>}
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
                        <input type="number" className='form-control' required placeholder='e.g. 03123456789' value={cell} onChange={(e) => setCell(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="deliveryAddress" className='form-label'>Delivery Address</label>
                        <input type="text" className='form-control' required value={address} onChange={(e) => setAddress(e.target.value)} />
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
        </>
    );
};
