import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useUserData } from '../../context/UserDataContext';

const Sidebar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { userData } = useUserData();
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };


    const navigation = useLocation();
    
    return (
        <nav className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
        <div className="logo">
            <h2>BestIT</h2>
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
            <li className={navigation.pathname === "/messages" ? "active" : ""}>
                <Link to="/messages">
                    <i className="fas fa-envelope"></i>
                    <span>Wiadomości</span>
                </Link>
            </li>
            <li className={navigation.pathname === "/experts" ? "active" : ""}>
                <Link to="/experts">
                    <i className="fas fa-user-tie"></i>
                    <span>Eksperci</span>
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
            <Link to="/login" className="logout-button">
                <i className="fas fa-sign-out-alt"></i>
                <span>Wyloguj</span>
            </Link>
        </div>
    </nav>
    );
};

export default Sidebar;
