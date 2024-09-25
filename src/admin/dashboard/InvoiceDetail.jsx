import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import Firebase Storage functions
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const InvoiceDetail = () => {
    const location = useLocation();
    const [data, setData] = useState(location.state);
    console.log(data.UserID)
    // Retrieve user data from localStorage
    const user = JSON.parse(localStorage.getItem('user'));

    // Firebase storage instance
    const storage = getStorage();

    const printAndUploadInvoice = () => {
        const input = document.getElementById('invoice');
        html2canvas(input, { useCORS: true })
            .then((canvas) => {
                const imageData = canvas.toDataURL('image/png', 1.0);
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'pt',
                    format: [712, 992]
                });

                pdf.internal.scaleFactor = 1;
                const imageProps = pdf.getImageProperties(imageData);
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (imageProps.height * pdfWidth) / imageProps.width;

                pdf.addImage(imageData, 'PNG', 0, 0, pdfWidth, pdfHeight);

                // Save the PDF to a Blob and upload it
                const pdfBlob = pdf.output('blob');

                // Create a reference to Firebase Storage in the "invoices" folder using only the user's ID as the filename
                const receiptRef = ref(storage, `invoices/${data.UserID}.pdf`);

                // Upload the Blob to Firebase
                uploadBytes(receiptRef, pdfBlob)
                    .then((snapshot) => {
                        console.log('Uploaded PDF to Firebase!');

                        // Get the download URL after the file is uploaded
                        return getDownloadURL(receiptRef);
                    })
                    .then((downloadURL) => {
                        console.log('Download URL:', downloadURL);
                        alert('Invoice uploaded successfully. Here is the download URL: ' + downloadURL);
                        // You can store this URL in Firestore or use it elsewhere in your application
                    })
                    .catch((error) => {
                        console.error('Error uploading PDF to Firebase:', error);
                    });
            });
    };

    return (
        <div>
            <button onClick={printAndUploadInvoice}>Print & Upload</button>

            <div id='invoice' className='invoice-wrapper'>
                <div className='invoice-header'>
                    <div className='company-detail'>
                        {user?.avatar && (
                            <img className='company-logo' src={user.avatar} alt="User Avatar" />
                        )}
                        <h2>{user.username}</h2>
                        <p>Email: {user.email}</p>
                    </div>
                    <div className='customer-detail'>
                        <h2>Invoice</h2>
                        <p>Invoice Number: {data.id}</p>
                        <p>Date: {new Date().toLocaleDateString()}</p>
                        <p>To: {data.BuyerName}</p>
                    </div>
                </div>

                <div className='invoice-body'>
                    <table className='invoice-table'>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Material</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.Products.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.ProductName}</td>
                                    <td>{item.materialName}</td>
                                    <td>{item.qty}</td>
                                    <td>${item.ProductPrice}</td>
                                    <td>${(item.qty * item.ProductPrice)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className='invoice-footer'>
                    <h3>Total: ${data.BuyerPayment}</h3>
                    <p>Thank you for your purchase!</p>
                </div>
            </div>
        </div>
    );
};

export default InvoiceDetail;
