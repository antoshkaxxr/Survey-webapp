import { useState } from 'react';
import './LoginPage.css';
import { BACK_ADDRESS } from "../../config.ts";
import { useNavigate } from 'react-router-dom';
import { AppRoute } from "../../const/AppRoute.ts";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch(`http://${BACK_ADDRESS}/user/login`, {
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
                throw new Error('Network response was not ok');
            }

            // Успешный вход
            if (result !== "") {
                document.cookie = `Token=${result}; path=/`;
                document.cookie = `Email=${email}; path=/`;

                console.log('Success:', result);
                navigate(AppRoute.MySurveys);
                toast.success('Вы успешно вошли в систему!');

            } else {
                // Неправильный логин или пароль
                toast.error('Неправильный логин или пароль.');
            }

        } catch (error) {
            console.error('Error:', error);
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
                    <button className="google-login-submit" onClick={handleGoogleLogin}>
                        <img
                            src="/icons/google-svgrepo-com.svg"
                            alt="google"
                            className="login-icon"
                        />
                    </button>
                    <button className="github-login-submit" onClick={handleGithubLogin}>
                        <img
                            src="/icons/github-color-svgrepo-com.svg"
                            alt="github"
                            className="login-icon"
                        />
                    </button>
                    <button className="vk-login-submit" onClick={handleVkLogin}>
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
        </div>
    );
}
