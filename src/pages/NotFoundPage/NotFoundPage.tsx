import './NotFoundPage.scss';
import {Helmet} from "react-helmet-async";

export function NotFoundPage() {
    return (
        <div className="not-found-page">
            <Helmet>
                <title>Страница не найдена - 66Бит.Опросы</title>
            </Helmet>
            <h1 className="not-found-page__title">404</h1>
            <p className="not-found-page__message">Страница не найдена</p>
        </div>
    );
}
