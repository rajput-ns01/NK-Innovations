import React, { useEffect, useState } from 'react';
import { useUserStore } from '../../lib/userStore';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { db } from '../../lib/firebase';
import { auth } from '../../lib/firebase'; // Import auth for sign out
import '../../components/styles/styles.css';
import { useNavigate } from 'react-router-dom';

const UserDetails = () => {
    const { currentUser } = useUserStore();
    const [customizedOrders, setCustomizedOrders] = useState([]);
    const [readyMadeOrders, setReadyMadeOrders] = useState([]);
    const [jobApplications, setJobApplications] = useState([]);
    const [receiptURL, setReceiptURL] = useState(null);
    const [activeSection, setActiveSection] = useState(null); // State to control which section is open
    const user = JSON.parse(localStorage.getItem('user'));

    const navigate=useNavigate();

    useEffect(() => {
        const fetchCustomizedOrders = async () => {
            if (currentUser) {
                const q = query(collection(db, 'CustomizeProductOrders'),where('UserID','==',user.id));
                const snapshot = await getDocs(q);
                setCustomizedOrders(snapshot.docs.map(doc => doc.data()));
            }
        };

        const fetchReadyMadeOrders = async () => {
            if (currentUser) {
                const q = query(collection(db, 'ReadyMadeProductOrders'),where('UserID','==',user.id));
                const snapshot = await getDocs(q);
                setReadyMadeOrders(snapshot.docs.map(doc => doc.data()));
            }
        };

        const fetchJobApplications = async () => {
            if (currentUser) {
                const q = query(collection(db, 'applicants'), where('email', '==', currentUser.email));
                const snapshot = await getDocs(q);
                setJobApplications(snapshot.docs.map(doc => doc.data()));
            }
        };

        const fetchInvoiceReceipt = async () => {
            if (currentUser) {
                const storage = getStorage();
                const receiptRef = ref(storage, `invoices/${user.id}.pdf`);

                try {
                    const url = await getDownloadURL(receiptRef);
                    setReceiptURL(url);
                } catch (error) {
                    console.error("No receipt found for user:", error);
                    setReceiptURL(null);
                }
            }
        };

        fetchCustomizedOrders();
        fetchReadyMadeOrders();
        fetchJobApplications();
        fetchInvoiceReceipt();
    }, [currentUser]);

    const toggleSection = (section) => {
        setActiveSection(prevSection => (prevSection === section ? null : section));
    };

    const handleLogout = async () => {
        try {
            await auth.signOut(); // Sign out the user
        } catch (error) {
            console.error("Error signing out:", error);
        }
        navigate('/login')
    };

    if (!currentUser) {
        return (
            <div className="user-details">
                <h2>Please log in to view your details.</h2>
            </div>
        );
    }

    return (
        <div className="user-details">
            <div className="user-info">
                <h2>User Information</h2>
                <img src={currentUser?.avatar || './avatar.png'} alt={currentUser?.username || 'User Avatar'} className="user-image" />
                <p className="user-name">Username: {currentUser?.username || 'Your Name'}</p>
                <p className="user-email">Email: {currentUser?.email}</p>
                <button className='logout' onClick={handleLogout}>Logout</button> {/* Logout Button */}
            </div>

            {/* Customized Orders Section */}
            <div className="orders-section">
                <h2 onClick={() => toggleSection('customizedOrders')} className="section-title">
                    Customized Product Orders {activeSection === 'customizedOrders' ? '▲' : '▼'}
                </h2>
                {activeSection === 'customizedOrders' && (
                    customizedOrders.length > 0 ? (
                        <ul className="order-list">
                            {customizedOrders.map((order, index) => {
                                if (order.userid === currentUser.uid) {
                                    return (
                                        <li key={index} className="order-item">
                                            <p>Product Details:</p>
                                            <ul className="product-list">
                                                {order.Products.map((product, productIndex) => (
                                                    <li key={productIndex} className="product-item">
                                                        <p>Product Name: {product.ProductName}</p>
                                                        <p>Price: ₹{product.ProductPrice}</p>
                                                        <p>Category: {product.category}</p>
                                                        <p>Material: {product.materialName}</p>
                                                        <p>Quantity: {product.qty}</p>
                                                        {product.ProductImg && (
                                                            <img src={product.ProductImg} alt={product.ProductName} className="product-image" />
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    );
                                }
                                return null;
                            })}

                        </ul>
                    ) : (
                        <p>No customized orders found.</p>
                    )
                )}
            </div>

            {/* Ready-Made Orders Section */}
            <div className="orders-section">
                <h2 onClick={() => toggleSection('readyMadeOrders')} className="section-title">
                    Ready-Made Product Orders {activeSection === 'readyMadeOrders' ? '▲' : '▼'}
                </h2>
                {activeSection === 'readyMadeOrders' && (
                    readyMadeOrders.length > 0 ? (
                        <ul className="order-list">
                            {readyMadeOrders.map((order, index) => {
                                if (order.userid === currentUser.uid) {
                                    return (
                                        <li key={index} className="order-item">
                                            <p>Product Details:</p>
                                            <ul className="product-list">
                                                {order.Products.map((product, productIndex) => (
                                                    <li key={productIndex} className="product-item">
                                                        <p>Product Name: {product.ProductName}</p>
                                                        <p>Price: ₹{product.ProductPrice}</p>
                                                        <p>Quantity: {product.qty}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    );
                                }
                                return null;
                            })}
                        </ul>
                    ) : (
                        <p>No ready-made orders found.</p>
                    )
                )}
            </div>

            {/* Job Applications Section */}
            <div className="applications-section">
                <h2 onClick={() => toggleSection('jobApplications')} className="section-title">
                    Job Applications {activeSection === 'jobApplications' ? '▲' : '▼'}
                </h2>
                {activeSection === 'jobApplications' && (
                    jobApplications.length > 0 ? (
                        <ul className="application-list">
                            {jobApplications.map((application, index) => (
                                <li key={index} className="application-item">
                                    <h3>Job Title: {application.jobTitle}</h3>
                                    <h4>Job Location: {application.jobLocation}</h4>
                                    <p>Application Date: {application.timestamp instanceof Timestamp ?
                                        new Date(application.timestamp.seconds * 1000).toLocaleDateString() :
                                        'No Date Available'}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No job applications found.</p>
                    )
                )}
            </div>

            {/* Receipt Section */}
            <div className="receipt-section">
                <h2 onClick={() => toggleSection('receipt')} className="section-title">
                    Receipt {activeSection === 'receipt' ? '▲' : '▼'}
                </h2>
                {activeSection === 'receipt' && (
                    receiptURL ? (
                        <a href={receiptURL} target="_blank" rel="noopener noreferrer" className="download-link">
                            View/Download Receipt
                        </a>
                    ) : (
                        <p>No receipt found.</p>
                    )
                )}
            </div>
        </div>
    );
};

export default UserDetails;
