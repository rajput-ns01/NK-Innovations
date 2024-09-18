import React from "react";
import { Link,  useNavigate } from "react-router-dom";
import './dashboard.css';


const Dashboard = () => {
    const navigate=useNavigate();
    const logoutHandler=()=>{
        localStorage.clear();
        navigate('/login');
    }
    return(
        <div className="container">
            <div className="sideNav">
                <div className="logoContainer">
                    <img alt="logo" className="logo" src=''/>
                    <h1 className="logo-heading">hello</h1>
                    <button onClick={logoutHandler} style={{border:'none',padding:'5px',borderRadius:'5px'}} >Logout</button>
                </div>

                <Link to='' style={{backgroundColor:'orange'}} className="link"><span style={{marginLeft:'10px'}}>Dashboard</span></Link>
                <Link to='' className="link"><span style={{marginLeft:'10px'}}>Blog List</span></Link>
                <Link to='' className="link"><span style={{marginLeft:'10px'}}>Add Blog</span></Link>
                <Link to='' className="link"><span style={{marginLeft:'10px'}}>Category List</span></Link>
                <Link to='' className="link"><span style={{marginLeft:'10px'}}>Add Category</span></Link>
                <Link to='' className="link"><span style={{marginLeft:'10px'}}>Comments</span></Link>

            </div>
            <div className="mainContent">
               
            </div>
        </div>
    )
}
export default Dashboard