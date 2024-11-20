import { Link } from 'react-router-dom';
import { AppRoute } from "../../const/AppRoute.ts";
import { deleteAllCookies, getEmail } from "../../sendResponseWhenLogged.ts";
import './Header.css';

export function Header() {
    const email = getEmail();

    return (
        <div className="menu-container">
            {email && (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", width: "100%" }}>
                    <div style={{ display: "flex", marginRight: "20px" }}>
                        <Link to={AppRoute.Root}>
                            <button className="WelcomeTransparent-btn">Home</button>
                        </Link>
                        <Link to={AppRoute.MySurveys}>
                            <button className="WelcomeTransparent-btn">My Surveys</button>
                        </Link>
                        <Link to={AppRoute.Login}>
                            <button className="WelcomeTransparent-btn" onClick={deleteAllCookies}>Logout</button>
                        </Link>
                    </div>
                    <h1>{email}</h1>
                </div>
            )}
        </div>
    );
}
