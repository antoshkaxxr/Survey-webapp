import { useState } from 'react';
import './RegistrationPage.css';
import { BACK_ADDRESS } from "../../config.ts";
import { AppRoute } from "../../const/AppRoute.ts";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Helmet } from "react-helmet-async";

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
            const response = await fetch(`https://${BACK_ADDRESS}/user/registration`, {
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
                toast.error('Произошла ошибка при обращении к серверу');
                return;
            }

            const result = await response.text();

            if (result === 'Пользователь с таким email уже существует') {
                toast.error('Пользователь с таким email уже существует.');
                return;
            }

            toast.success('Вы успешно зарегистрированы!', {
                autoClose: 2000,
                onClose: () => {
                    navigate(AppRoute.Login);
                }
            });

        } catch (error) {
            toast.error('Произошла ошибка при регистрации.');
        }
    };

    const redirectOnLogin = () => {
        navigate(AppRoute.Login);
    };

    return (
        <div>
            <Helmet>
                <title>Регистрация - 66Бит.Опросы</title>
            </Helmet>
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
                autoClose={3000}
                hideProgressBar={true}
                closeOnClick
                pauseOnHover
                draggable
            />
        </div>
    );
}
