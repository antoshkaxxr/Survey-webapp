import './app.css';
import SingleChoiceQuestion from "../questions/single-choice-question/single-choice-question.tsx";

function App() {
  return (
    <>
      <h1>Hello World!</h1>
      <SingleChoiceQuestion
        question={'Кто такой Хлопин?'}
        options={['Историк', 'Физик', 'Математик', 'Биолог']}
      />
      <SingleChoiceQuestion
        question={'Кто такой Хлопин?'}
        options={['Историк', 'Физик', 'Математик', 'Биолог']}
      />
    </>
  );
}

export default App;
