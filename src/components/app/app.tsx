import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AppRoute} from "../../const";
import {MainPage} from "../../pages/main-page/main-page";
import {LoginPage} from "../../pages/login-page/login-page";
import {SurveyBuilderPage} from "../../pages/survey-builder-page/survey-builder-page.tsx";
import {SurveyPage} from "../../pages/survey-page/survey-page";
import {MySurveysPage} from "../../pages/my-surveys-page/my-surveys-page";

export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path={AppRoute.Root}
                    element={<MainPage />}
                />
                <Route
                    path={AppRoute.Login}
                    element={<LoginPage />}
                />
                <Route
                    path={AppRoute.MySurveys}
                    element={<MySurveysPage />}
                />
                <Route
                    path={AppRoute.FormBuilder}
                    element={<SurveyBuilderPage />}
                />
                <Route
                    path={AppRoute.FormBuilderEdit}
                    element={<SurveyBuilderPage />}
                />
                <Route
                    path={AppRoute.SurveyId}
                    element={<SurveyPage />}
                />
            </Routes>
        </BrowserRouter>
    );
}
