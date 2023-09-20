import { useState } from 'react';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Section from './Section/Section';
import Statistics from './Statistics/Statistics';
import Notification from './Notification/Notification';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleFeedback = evName => {
    switch (evName) {
      case 'good':
        setGood(prevState => prevState + 1);
        return;
      case 'neutral':
        setNeutral(prevState => prevState + 1);
        return;
      case 'bad':
        setBad(prevState => prevState + 1);
        return;
      default:
        return;
    }
  };

  const total = good + neutral + bad;

  const countPositiveFeedbackPercentage = () => {
    // Відсоток позитивних відгуків // good/total*100
    const positivePercentage = (good / total) * 100;
    return Math.round(positivePercentage);
  };

  return (
    <div className="container">
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={handleFeedback}
        />
      </Section>
      <Section title="Statistics">
        {total === 0 ? (
          <Notification message="There is no feedback" />
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            percentage={countPositiveFeedbackPercentage()}
          />
        )}
      </Section>
    </div>
  );
};

//======= Рефакторинг хуки useState задано об'єкт
//
// const App = () => {
//   const [state, setState] = useState({ good: 0, neutral: 0, bad: 0 }); //для одного state задано об'єкт
//   const { good, neutral, bad } = state;

//   const handleFeedback = option => {
//     setState(prevState => ({
//       ...prevState,
//       [option]: prevState[option] + 1,
//     }));
//   };

//   const countTotalFeedback = () => {
//     let total = 0;
//     // return Object.values(state).reduce((total, value) => total + value, 0);  // reduce - попереднє значення + поточне значення
//     // Підрахунок загальної кількість відгуків
//     const values = Object.values(state);
//     for (let value of values) {
//       total += value;
//     }
//     return total;
//   };

//   const countPositiveFeedbackPercentage = () => {
//     // Відсоток позитивних відгуків // good/total*100
//     const positivePercentage = (good / countTotalFeedback()) * 100;
//     return Math.round(positivePercentage);
//   };

//   const total = countTotalFeedback();
//   return (
//     <div className="container">
//       <Section title="Please leave feedback">
//         <FeedbackOptions
//           options={[...Object.keys(state)]}
//           onLeaveFeedback={handleFeedback}
//         />
//       </Section>
//       <Section title="Statistics">
//         {total === 0 ? (
//           <Notification message="There is no feedback" />
//         ) : (
//           <Statistics
//             good={good}
//             neutral={neutral}
//             bad={bad}
//             total={total}
//             percentage={countPositiveFeedbackPercentage()}
//           />
//         )}
//       </Section>
//     </div>
//   );
// };
export default App;
