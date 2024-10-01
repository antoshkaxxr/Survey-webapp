function LoginPage() {
    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8080/user/jenoshima42@despair.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({})
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Success:', result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <h1>This is a login page</h1>
            <button onClick={handleLogin}>Войти</button>
        </>
    );
}

export default LoginPage;
