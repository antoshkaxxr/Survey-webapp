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

            const result = await response.text();
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
        </>
    );
}
