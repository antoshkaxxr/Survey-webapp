import './MainPage.css';
import "../../work-with-emojis/add_emojis.js";
import {AppRoute} from "../../const/AppRoute.ts";

export function MainPage() {
    return (
        <>
            <div className="WelcomeButton-container">
                <a href={AppRoute.Registration}>
                    <button className="WelcomeTransparent-btn">Регистрация</button>
                </a>
                <a href={AppRoute.Login}>
                    <button className="WelcomeTransparent-btn">Войти</button>
                </a>
                <a href={AppRoute.MySurveys}>
                    <button className="WelcomeTransparent-btn">Мои опросы</button>
                </a>
                <a href={AppRoute.FormBuilder}>
                    <button className="WelcomeWhite-btn">Создать опрос</button>
                </a>
            </div>
            <h1 className="WelcomeText">Welcome!</h1>
            <h2 className="WelcomeText">This is a main page</h2>

            <div className="info-box">
                <p>Information</p>
                <p>Information</p>
                <p>Information</p>
                <p>Information</p>
                <p>Information</p>
            </div>
            <div className="info-box">
                <p>Information</p>
                <p>Information</p>
                <p>Information</p>
                <p>Information</p>
                <p>Information</p>
                <p>Information</p>
                <p>Information</p>
            </div>
            <div className="info-box">
                <p>Information</p>
                <p>Information</p>
                <p>Information</p>

            </div>

        </>
    );
}


