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

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cell, setCell] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');

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

    const purchaseProduct = async (productId, purchaseQuantity, isCustomProduct) => {
        try {
            // Handling ready-made product stock update
            if (!isCustomProduct) {
                const productRef = doc(db, 'Products', productId);
                const productDoc = await getDoc(productRef);

                if (productDoc.exists()) {
                    const currentStock = productDoc.data().ProductStock;
                    if (currentStock >= purchaseQuantity) {
                        await updateDoc(productRef, {
                            ProductStock: currentStock - purchaseQuantity,
                        });
                        return 'ReadyMadeProductOrders';  // Store in ready-made products collection
                    } else {
                        console.warn('Insufficient stock in ReadyMadeProducts');
                        return false;
                    }
                }
            }

            // Custom product orders don't involve stock checks as it's raw materials
            return 'CustomizeProductOrders';  // Store in custom orders collection
        } catch (err) {
            console.error('Error purchasing product: ', err);
            return false;
        }
    };

    const cashoutSubmit = async (e) => {
        e.preventDefault();
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const date = new Date();
                const time = date.getTime();

                const products = shoppingCart.map(product => ({
                    ProductID: product.ProductID,
                    ProductName: product.ProductName,
                    ProductPrice: product.ProductPrice,
                    qty: product.qty,
                    TotalProductPrice: product.TotalProductPrice,
                    isCustomProduct: product.isCustomProduct || false // Flag to determine product type
                }));

                let allSuccessful = true;

                // ReadyMadeProducts or CustomizeProductOrders collection decision per product
                let orderData = {
                    BuyerName: name,
                    BuyerEmail: email,
                    BuyerCell: cell,
                    BuyerAddress: address,
                    BuyerPayment: totalPrice,
                    BuyerQuantity: totalQty,
                    Products: [],
                    Timestamp: time
                };

                for (const product of products) {
                    const result = await purchaseProduct(product.ProductID, product.qty, product.isCustomProduct);
                    if (result === false) {
                        allSuccessful = false;
                        break;
                    }
                    product.collection = result; // Store which collection this product belongs to
                    orderData.Products.push(product);
                }

                if (allSuccessful) {
                    // Separate orders into two collections: ReadyMadeProducts and CustomizeProductOrders
                    const readyMadeProducts = orderData.Products.filter(p => p.collection === 'ReadyMadeProductOrders');
                    const customProducts = orderData.Products.filter(p => p.collection === 'CustomizeProductOrders');

                    // Handle ReadyMadeProducts orders
                    if (readyMadeProducts.length > 0) {
                        const readyMadeOrdersRef = collection(db, 'ReadyMadeProductOrders', user.uid, 'Orders');
                        await addDoc(readyMadeOrdersRef, {
                            ...orderData,
                            Products: readyMadeProducts
                        });
                    }

                    // Handle CustomizeProductOrders
                    if (customProducts.length > 0) {
                        const customOrdersRef = collection(db, 'CustomizeProductOrders', user.uid, 'Orders');
                        await addDoc(customOrdersRef, {
                            ...orderData,
                            Products: customProducts
                        });
                    }

                    // Reset form, clear cart, and show success message
                    setCell('');
                    setAddress('');
                    dispatch({ type: 'EMPTY' });
                    toast.success('Your order has been placed successfully. Thanks for visiting us. You will be redirected to the home page after 5 seconds', {
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
