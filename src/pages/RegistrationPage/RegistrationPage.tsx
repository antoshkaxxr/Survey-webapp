import { useState } from 'react';
import './RegistrationPage.css';
import { BACK_ADDRESS } from "../../config.ts";
import { AppRoute } from "../../const/AppRoute.ts";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

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
            Swal.fire({
                icon: 'error',
                title: 'Ошибка!',
                text: 'Введите корректный email.',
            });
            return;
        }

        if (!validatePassword(password)) {
            Swal.fire({
                icon: 'error',
                title: 'Ошибка!',
                text: 'Пароль должен содержать минимум 6 символов.',
            });
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
                Swal.fire({
                    icon: 'error',
                    title: 'Ошибка!',
                    text: 'Пользователь с таким email уже существует.',
                });
                return;
            }

            console.log('Success:', result);
            Swal.fire({
                icon: 'success',
                title: 'Успех!',
                text: 'Вы успешно зарегистрированы!',
            }).then(() => {
                navigate(AppRoute.Login);
            });
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Ошибка!',
                text: 'Произошла ошибка при регистрации.',
            });
        }
    };

    const redirectOnLogin = () => {
        navigate(AppRoute.Login);
    };

    return (
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
    );
}
