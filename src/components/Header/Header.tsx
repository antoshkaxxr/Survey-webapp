import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { AppRoute } from "../../const/AppRoute.ts";
import { deleteAllCookies, getEmail } from "../../sendResponseWhenLogged.ts";
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faList, faSignOutAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {LogoutModal} from "../modals/LogoutModal/LogoutModal.tsx";

export function Header() {
    const email = getEmail();
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        setIsLogoutModalOpen(true);
    };

    const handleConfirmLogout = () => {
        deleteAllCookies();
        setIsLogoutModalOpen(false);
        navigate(AppRoute.Login);
    };

    const handleCancelLogout = () => {
        setIsLogoutModalOpen(false);
    };

    return (
        <div className="menu-container">
            <div className="logo-container">
                <Link to={AppRoute.Root}>
                    <img src={'/images/logo.png'} alt="Logo" className="logo" />
                </Link>
            </div>
            {email && (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", width: "100%" }}>
                    <div style={{ display: "flex", marginRight: "20px" }}>
                        <Link to={AppRoute.Root}>
                            <button className="WelcomeTransparent-btn">
                                <FontAwesomeIcon icon={faHome} style={{ marginRight: "8px" }} />
                                На главную
                            </button>
                        </Link>
                        <Link to={AppRoute.MySurveys}>
                            <button className="WelcomeTransparent-btn">
                                <FontAwesomeIcon icon={faList} style={{ marginRight: "8px" }} />
                                Мои опросы
                            </button>
                        </Link>
                        <button className="WelcomeTransparent-btn" onClick={handleLogoutClick}>
                            <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: "8px" }} />
                            Выйти
                        </button>
                    </div>
                    <h2>
                        <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: "8px" }} />
                        {email}
                    </h2>
                </div>
            )}

            {isLogoutModalOpen && (
                <LogoutModal
                    onCancel={handleCancelLogout}
                    onConfirm={handleConfirmLogout}
                />
            )}
        </div>
    );
}
