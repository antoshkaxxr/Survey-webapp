import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {AppRoute} from "../../const/AppRoute.ts";
import {MainPage} from "../../pages/MainPage/MainPage.tsx";
import {LoginPage} from "../../pages/LoginPage/LoginPage.tsx";
import {RegistrationPage} from "../../pages/RegistrationPage/RegistrationPage.tsx";
import {SurveyBuilderPage} from "../../pages/SurveyBuilderPage/SurveyBuilderPage.tsx";
import {SurveyPage} from "../../pages/SurveyPage/SurveyPage.tsx";
import {MySurveysPage} from "../../pages/MySurveysPage/MySurveysPage.tsx";
import {getEmail} from "../../sendResponseWhenLogged.ts";

function RequireAuth({ children } : { children: React.ReactNode }) {
    const email = getEmail();
    if (email === null) {
        // Не авторизован
        return <Navigate to="/login" replace />;
    }
    return children;
}

export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path={AppRoute.Root}
                    element={<MainPage/>}
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
                    element={<RequireAuth><MySurveysPage /></RequireAuth>}
                />
                <Route
                    path={AppRoute.FormBuilder}
                    element={<RequireAuth><SurveyBuilderPage /></RequireAuth>}
                />
                <Route
                    path={AppRoute.FormBuilderEdit}
                    element={<RequireAuth><SurveyBuilderPage /></RequireAuth>}
                />
                <Route
                    path={AppRoute.SurveyId}
                    element={<RequireAuth><SurveyPage /></RequireAuth>}
                />
            </Routes>
        </BrowserRouter>
    );
}
