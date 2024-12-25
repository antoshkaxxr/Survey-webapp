import './MainPage.css';
import { AppRoute } from "../../const/AppRoute.ts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faSignInAlt, faList, faPlusCircle, faChartBar, faUsers, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

export function MainPage() {
    return (
        <div className="main-page">
            <div className="logo-container">
                <Link to={AppRoute.Root}>
                    <img src={'/images/logo.png'} alt="Логотип" className="logo2" />
                </Link>
            </div>

            <div className="WelcomeButton-container">
                <Link to={AppRoute.Registration}>
                    <button className="WelcomeTransparent-btn">
                        <FontAwesomeIcon icon={faUserPlus} style={{ marginRight: "8px" }} />
                        Регистрация
                    </button>
                </Link>
                <Link to={AppRoute.Login}>
                    <button className="WelcomeTransparent-btn">
                        <FontAwesomeIcon icon={faSignInAlt} style={{ marginRight: "8px" }} />
                        Войти
                    </button>
                </Link>
                <Link to={AppRoute.MySurveys}>
                    <button className="WelcomeTransparent-btn">
                        <FontAwesomeIcon icon={faList} style={{ marginRight: "8px" }} />
                        Мои опросы
                    </button>
                </Link>
                <Link to={AppRoute.FormBuilder}>
                    <button className="WelcomeWhite-btn">
                        <FontAwesomeIcon icon={faPlusCircle} style={{ marginRight: "8px" }} />
                        Создать опрос
                    </button>
                </Link>
            </div>

            <div className="welcome-section">
                <h2 className="WelcomeSubText">
                    Создавайте, проводите и анализируйте опросы легко и быстро.
                </h2>
            </div>

            <div className="info-section">
                <div className="info-box">
                    <h3>
                        <FontAwesomeIcon icon={faChartBar} style={{ marginRight: "8px" }} />
                        Анализируйте результаты
                    </h3>
                    <p>
                        Получайте детальную статистику и графики по результатам ваших опросов.
                    </p>
                </div>
                <div className="info-box">
                    <h3>
                        <FontAwesomeIcon icon={faUsers} style={{ marginRight: "8px" }} />
                        Привлекайте участников
                    </h3>
                    <p>
                        Делитесь ссылками на опросы в социальных сетях и привлекайте больше участников.
                    </p>
                </div>
                <div className="info-box">
                    <h3>
                        <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: "8px" }} />
                        Простота использования
                    </h3>
                    <p>
                        Интуитивно понятный интерфейс позволяет создавать опросы за несколько минут.
                    </p>
                </div>
            </div>

            <div className="cta-section">
                <h2>Начните прямо сейчас!</h2>
                <Link to={AppRoute.Registration}>
                    <button className="WelcomeWhite-btn">
                        <FontAwesomeIcon icon={faUserPlus} style={{ marginRight: "8px" }} />
                        Зарегистрироваться
                    </button>
                </Link>
            </div>
        </div>
    );
}
