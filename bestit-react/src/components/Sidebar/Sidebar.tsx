import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useUserData } from '../../context/UserDataContext';
import logo from '../../assets/logo.png';

const Sidebar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { userData, logout } = useUserData();
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };


    const navigation = useLocation();
    
    return (
        <nav className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
        <div className="logo">
            <div className="logo__coins">

                <span>100 SC</span>
            </div>
            <img src={logo} style={{height: "96px"}} />
        </div>
        <button className="menu-toggle" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
        </button>
        <ul className="nav-links">
            <li className={navigation.pathname === "/dashboard" ? "active" : ""}>
                <Link to="/dashboard">
                    <i className="fas fa-home"></i>
                    <span>Strona główna</span>
                </Link>
            </li>
            <li className={navigation.pathname === "/profil" ? "active" : ""}>
                <Link to="/profil">
                    <i className="fas fa-user"></i>
                    <span>Profil</span>
                </Link>
            </li>
            <li className={navigation.pathname === "/chat" ? "active" : ""}>
                <Link to="/chat">
                    <i className="fas fa-briefcase"></i>
                    <span>Chat</span>
                </Link>
            </li>
            <li className={navigation.pathname === "/experts" ? "active" : ""}>
                <Link to="/experts">
                    <i className="fas fa-share-alt"></i>
                    <span>Transfer wiedzy</span>
                </Link>
            </li>
            <li className={navigation.pathname === "/health" ? "active" : ""}>
                <Link to="/health">
                    <i className="fas fa-heart"></i>
                    <span>Wdzięcznopis</span>
                </Link>
            </li>

        </ul>
        <div className="user-section">
            <Link to="/profil" className="user-info">
                <div className="user-avatar">
                    <i className="fas fa-user-circle"></i>
                </div>
                <div className="user-details">
                    <span className="user-name">{userData?.first_name} {userData?.last_name}</span>
                    <span className="user-role">Użytkownik</span>
                </div>
            </Link>
            <div onClick={() => logout()} className="logout-button">
                <i className="fas fa-sign-out-alt"></i>
                <span>Wyloguj</span>
            </div>
        </div>
    </nav>
    );
};

export default Sidebar;
