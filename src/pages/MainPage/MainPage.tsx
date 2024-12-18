import './MainPage.css';
import { AppRoute } from "../../const/AppRoute.ts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faSignInAlt, faList, faPlusCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

export function MainPage() {
    return (
        <>
            <div className="WelcomeButton-container">
                <a href={AppRoute.Registration}>
                    <button className="WelcomeTransparent-btn">
                        <FontAwesomeIcon icon={faUserPlus} style={{ marginRight: "8px" }} />
                        Регистрация
                    </button>
                </a>
                <a href={AppRoute.Login}>
                    <button className="WelcomeTransparent-btn">
                        <FontAwesomeIcon icon={faSignInAlt} style={{ marginRight: "8px" }} />
                        Войти
                    </button>
                </a>
                <a href={AppRoute.MySurveys}>
                    <button className="WelcomeTransparent-btn">
                        <FontAwesomeIcon icon={faList} style={{ marginRight: "8px" }} />
                        Мои опросы
                    </button>
                </a>
                <a href={AppRoute.FormBuilder}>
                    <button className="WelcomeWhite-btn">
                        <FontAwesomeIcon icon={faPlusCircle} style={{ marginRight: "8px" }} />
                        Создать опрос
                    </button>
                </a>
            </div>
            <h1 className="WelcomeText">
                Welcome!
            </h1>
            <h2 className="WelcomeText">
                This is a main page
            </h2>

            <div className="info-box">
                <p>
                    <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: "8px" }} />
                    Information
                </p>
                <p>
                    <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: "8px" }} />
                    Information
                </p>
                <p>
                    <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: "8px" }} />
                    Information
                </p>
                <p>
                    <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: "8px" }} />
                    Information
                </p>
                <p>
                    <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: "8px" }} />
                    Information
                </p>
            </div>
            <div className="info-box">
                <p>
                    <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: "8px" }} />
                    Information
                </p>
                <p>
                    <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: "8px" }} />
                    Information
                </p>
                <p>
                    <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: "8px" }} />
                    Information
                </p>
                <p>
                    <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: "8px" }} />
                    Information
                </p>
                <p>
                    <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: "8px" }} />
                    Information
                </p>
                <p>
                    <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: "8px" }} />
                    Information
                </p>
                <p>
                    <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: "8px" }} />
                    Information
                </p>
            </div>
            <div className="info-box">
                <p>
                    <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: "8px" }} />
                    Information
                </p>
                <p>
                    <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: "8px" }} />
                    Information
                </p>
                <p>
                    <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: "8px" }} />
                    Information
                </p>
            </div>
        </>
    );
}
