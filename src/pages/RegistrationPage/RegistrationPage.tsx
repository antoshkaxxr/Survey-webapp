import { useState } from 'react';
import './RegistrationPage.css';
import { BACK_ADDRESS } from "../../config.ts";
import { AppRoute } from "../../const/AppRoute.ts";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export function RegistrationPage() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const validateEmail = (email: string) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const validatePassword = (password: string) => {
        // Пример валидации: минимум 6 символов
        return password.length >= 6;
    };

    const handleRegistration = async () => {
        if (!validateEmail(email)) {
            toast.error('Введите корректный email.');
            return;
        }

        if (!validatePassword(password)) {
            toast.error('Пароль должен содержать минимум 6 символов.');
            return;
        }

        try {
            const response = await fetch(`http://${BACK_ADDRESS}/user/registration`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.text();

            if (result === 'Пользователь с таким email уже существует') {
                toast.error('Пользователь с таким email уже существует.');
                return;
            }

            console.log('Success:', result);
            navigate(AppRoute.Login)
            toast.success('Вы успешно зарегистрированы!')

        } catch (error) {
            console.error('Error:', error);
            toast.error('Произошла ошибка при регистрации.');
        }
    };

    const redirectOnLogin = () => {
        navigate(AppRoute.Login);
    };

    return (
        <div>
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
            <ToastContainer
                position="bottom-right"
                autoClose={3000} // Уведомление будет закрываться через 3 секунды
                hideProgressBar={true} // Скрыть индикатор прогресса
                closeOnClick
                pauseOnHover
                draggable
            />
        </div>
    );
}
