import logo from '../../assets/logo.png'
import booksIcon from '../../assets/books-icon.svg'
import loginIcon from '../../assets/login-icon.svg'
import logoutIcon from '../../assets/logout-icon.svg'
import style from './NavBar.module.css'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { jwtDecode } from "jwt-decode";
import api from '../../api/axios';

const NavBar = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState(null);
    const [userName, setUserName] = useState("");
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            try {
                const decoded = jwtDecode(token);
                setRole(decoded.role);

                if (decoded.role === "student") {
                    fetchUserName(decoded.id);
                } else if (decoded.role === "admin") {
                    setUserName("Admin");
                }
            } catch {
                console.error("Invalid token");
            }
        }
    }, []);

    const fetchUserName = async (id) => {
        try {
            const res = await api.get(`/users/${id}`);
            setUserName(`${res.data.firstName} ${res.data.lastName}`);
        } catch {
            setUserName("Student");
        }
    };

    const handleLogoutClick = () => setShowLogoutModal(true);

    const confirmLogout = () => {
        localStorage.removeItem("token");
        setRole(null);
        setUserName("");
        setShowLogoutModal(false);
        navigate('/');
        window.location.reload();
    };

    const cancelLogout = () => setShowLogoutModal(false);

    return (
        <div className={style.container}>
            <img onClick={() => navigate('/')} src={logo} alt="logo" />
            <div className={style.boxes}>
                <div className={style.box}>
                    <img src={booksIcon} alt="" />
                    {role === "admin"
                        ? <p onClick={() => navigate('/admin')}>Manage Courses</p>
                        : <p onClick={() => navigate('/student')}>My Courses</p>
                    }
                </div>
                <div className={style.box}>
                    {localStorage.getItem("token")
                        ? <img onClick={handleLogoutClick} src={logoutIcon} alt="logout" style={{ cursor: 'pointer' }} />
                        : <img onClick={() => navigate('/login')} src={loginIcon} alt="login" style={{ cursor: 'pointer' }} />
                    }

                    {localStorage.getItem("token")
                        ? <p onClick={handleLogoutClick} style={{ cursor: 'pointer' }}>{userName}</p>
                        : <p onClick={() => navigate('/login')} style={{ cursor: 'pointer' }}>Login</p>
                    }
                </div>
            </div>

            {showLogoutModal && (
                <div className={style.modalOverlay}>
                    <div className={style.modalContent}>
                        <h3>Are you sure you want to logout?</h3>
                        <div className={style.modalButtons}>
                            <button className={style.cancelBtn} onClick={cancelLogout}>Cancel</button>
                            <button className={style.confirmBtn} onClick={confirmLogout}>Logout</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default NavBar
