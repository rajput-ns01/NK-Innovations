import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase'; // Adjust path as needed

const Header = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    avatar: '',
    email: ''
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserInfo(userDoc.data());
        }
      } else {
        setUserInfo({ username: '', avatar: '', email: '' });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="header1">
      <div className="profile-section1">
        <span>{userInfo.username || 'Admin'}</span>
        <img 
          src={userInfo.avatar || '/path-to-default-avatar.png'} 
          alt="Profile" 
        />
      </div>
      <div className="notifications1">
        <i className="icon-bell"></i> {/* Add your notification icon library */}
      </div>
    </div>
  );
};

export default Header;
