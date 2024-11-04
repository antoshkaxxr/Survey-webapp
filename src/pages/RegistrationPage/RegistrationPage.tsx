import { useState } from 'react';
import './RegistrationPage.css';
import {IP_ADDRESS} from "../../config.ts";
import {AppRoute} from "../../const/AppRoute.ts";
import { useNavigate } from 'react-router-dom';


export function RegistrationPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegistration = async () => {
        try {
            const response = await fetch(`http://${IP_ADDRESS}:8080/user/registration`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        "email": email,
                        "password": password,
                    })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Success:', result);
            navigate(AppRoute.Login);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const redirectOnLogin = () => {
        navigate(AppRoute.Login);
    };

    return (
        <>
            <div className="registration-box">
                <h1 className="registration-h1">Введите e-mail и пароль</h1>
                <input
                    className='registration-input'
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className='registration-input'
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="registration-submit" onClick={handleRegistration}>Зарегистрироваться</button>
                <button className="registration-submit" onClick={redirectOnLogin}>Уже зарегистрирован</button>
            </div>


            {/* ну можно попробовать но анимация скорей раздражает -_- */}
            {/* <div className="login-box2">
                <div className='main'>

                        <h1 className="login-h1"> This is a login page</h1>
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

                        <div className="social-login">
                            <h2 className="login-h2">Или войдите через:</h2>
                            <button className="google-login-submit" onClick={handleGoogleLogin}>Google</button>
                            <button className="github-login-submit" onClick={handleGithubLogin}>GitHub</button>
                            <button className="vk-login-submit" onClick={handleVkLogin}>VK</button>
                        </div>

                </div>
            </div> */}
        </>
    );
}
