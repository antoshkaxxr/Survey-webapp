function FormBuilderPage() {
    const handleSubmit = async () => {
        const data = {
            Name: "Преподаватели Радиофака",
            Survey: [
                {
                    type: "single-choice-question",
                    questionId: 1111,
                    question: "Кто такой Хлопин?",
                    options: ["Историк", "Физик", "Математик", "Биолог"]
                },
                {
                    type: "multiple-choice-question",
                    questionId: 2222,
                    question: "Кто такой Косолобов?",
                    options: ["Машина", "Математик", "Физик", "Препод"]
                },
                {
                    type: "text-question",
                    questionId: 3333,
                    question: "Что Вы думаете о практиках по терверу/матстату?"
                },
                {
                    type: "number-question",
                    questionId: 4444,
                    question: "На каком Вы курсе? Введите только цифру"
                },
                {
                    type: "yes-no-question",
                    questionId: 5555,
                    question: "Вам нравится Ваша секция по физкультуре?"
                },
                {
                    type: "date-question",
                    questionId: 6666,
                    question: "Укажите Вашу дату рождения:"
                },
                {
                    type: "url-question",
                    questionId: 7777,
                    question: "Предоставьте ссылку на Ваш проект на GitLab"
                },
                {
                    type: "file-question",
                    questionId: 8888,
                    question: "Прикрепите базу ответов по БЖД"
                },
                {
                    type: "select-question",
                    questionId: 9999,
                    question: "Выберите Вашу страну проживания",
                    options: ["Россия", "США", "Япония", "Китай", "Франция"]
                },
                {
                    type: "slider-question",
                    questionId: 11111,
                    question: "Оцените от 1 до 10 МатМех",
                    min: 1,
                    max: 10
                }
            ]
        };

        try {
            const response = await fetch('http://localhost:8080/user/jenoshima42@despair.com/survey', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
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
            <h1>This is a page where forms will be created</h1>
            <button onClick={handleSubmit}>Отправить опрос</button>
        </>
    );
}

export default FormBuilderPage;
