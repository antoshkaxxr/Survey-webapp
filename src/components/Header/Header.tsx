import { Link } from 'react-router-dom';
import { AppRoute } from "../../const/AppRoute.ts";
import { deleteAllCookies, getEmail } from "../../sendResponseWhenLogged.ts";
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faList, faSignOutAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';

export function Header() {
    const email = getEmail();

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
                        <Link to={AppRoute.Login}>
                            <button className="WelcomeTransparent-btn" onClick={deleteAllCookies}>
                                <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: "8px" }} />
                                Выйти
                            </button>
                        </Link>
                    </div>
                    <h2>
                        <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: "8px" }} />
                        {email}
                    </h2>
                </div>
            )}
        </div>
    );
}
