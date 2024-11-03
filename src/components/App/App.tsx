import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AppRoute} from "../../const/AppRoute.ts";
import {MainPage} from "../../pages/MainPage/MainPage.tsx";
import {LoginPage} from "../../pages/LoginPage/LoginPage.tsx";
import {RegistrationPage} from "../../pages/RegistrationPage/RegistrationPage.tsx";
import {SurveyBuilderPage} from "../../pages/SurveyBuilderPage/SurveyBuilderPage.tsx";
import {SurveyPage} from "../../pages/SurveyPage/SurveyPage.tsx";
import {MySurveysPage} from "../../pages/MySurveysPage/MySurveysPage.tsx";

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
                    path={AppRoute.Registration}
                    element={<RegistrationPage />}
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
