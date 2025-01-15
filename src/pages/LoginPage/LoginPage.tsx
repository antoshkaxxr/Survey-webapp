import { useState } from 'react';
import './LoginPage.css';
import { BACK_ADDRESS } from "../../config.ts";
import { useNavigate } from 'react-router-dom';
import { AppRoute } from "../../const/AppRoute.ts";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from "react-helmet-async";
import { Tooltip } from 'react-tooltip';

export function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch(`https://${BACK_ADDRESS}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "email": email,
                    "password": password,
                })
            });

            const result = await response.text();

            if (!response.ok) {
                toast.error('Network response was not ok');
                return;
            }

            if (result !== "") {
                document.cookie = `Token=${result}; path=/`;
                document.cookie = `Email=${email}; path=/`;

                navigate(AppRoute.MySurveys);
                toast.success('Вы успешно вошли в систему!');
            } else {
                toast.error('Неправильный логин или пароль.');
            }

        } catch (error) {
            toast.error('Произошла ошибка при входе в систему.');
        }
    };

    const handleGoogleLogin = () => {
        // Логика для входа через Google
        console.log('Login with Google');
    };

    const handleGithubLogin = () => {
        // Логика для входа через GitHub
        console.log('Login with GitHub');
    };

    const handleVkLogin = () => {
        // Логика для входа через VK
        console.log('Login with VK');
    };

    const redirectOnRegistration = () => {
        navigate(AppRoute.Registration);
    };

    return (
        <div>
            <Helmet>
                <title>Войти - 66Бит.Опросы</title>
            </Helmet>
            <div className="login-box">
                <h1 className="login-h1">Введите e-mail и пароль</h1>
                <input
                    className='login-input'
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className='login-input'
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="login-submit" onClick={handleLogin}>Войти</button>
                <button className="redirect-registration" onClick={redirectOnRegistration}>Зарегистрироваться</button>

                <div className="social-login">
                    <h2 className="login-h2">Или войдите через:</h2>
                    <button
                        className="google-login-submit"
                        onClick={handleGoogleLogin}
                        data-tooltip-id="google-tooltip"
                        data-tooltip-content="В разработке"
                    >
                        <img
                            src="/icons/google-svgrepo-com.svg"
                            alt="google"
                            className="login-icon"
                        />
                    </button>
                    <button
                        className="github-login-submit"
                        onClick={handleGithubLogin}
                        data-tooltip-id="github-tooltip"
                        data-tooltip-content="В разработке"
                    >
                        <img
                            src="/icons/github-color-svgrepo-com.svg"
                            alt="github"
                            className="login-icon"
                        />
                    </button>
                    <button
                        className="vk-login-submit"
                        onClick={handleVkLogin}
                        data-tooltip-id="vk-tooltip"
                        data-tooltip-content="В разработке"
                    >
                        <img
                            src="/icons/vk-svgrepo-com.svg"
                            alt="github"
                            className="login-icon"
                        />
                    </button>
                </div>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={true}
                closeOnClick
                pauseOnHover
                draggable
            />
            <Tooltip id="google-tooltip" />
            <Tooltip id="github-tooltip" />
            <Tooltip id="vk-tooltip" />
        </div>
    );
}
