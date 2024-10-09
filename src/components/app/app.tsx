import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AppRoute} from "../../const";
import MainPage from "../../pages/main-page/main-page";
import LoginPage from "../../pages/login-page/login-page";
import FormBuilderPage from "../../pages/form-builder-page/form-builder-page";
import SurveyPage from "../../pages/survey-page/survey-page";
import MySurveysPage from "../../pages/my-surveys-page/my-surveys-page";


function App() {
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
                    element={<FormBuilderPage />}
                />
                <Route
                    path={AppRoute.Survey}
                    element={<SurveyPage />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
