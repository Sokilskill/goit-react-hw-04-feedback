import { Component } from 'react';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Section from './Section/Section';
import Statistics from './Statistics/Statistics';
import Notification from './Notification/Notification';

class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  handleFeedback = option => {
    this.setState(prevState => {
      // console.log('prevState', prevState);
      // console.log('option', [option]);
      return {
        [option]: prevState[option] + 1,
      };
    });
  };

  countTotalFeedback() {
    // Підрахунок загальної кількість відгуків

    let total = 0;
    const values = Object.values(this.state);
    for (let value of values) {
      total += value;
    }
    return total;
  }

  countPositiveFeedbackPercentage() {
    // Відсоток позитивних відгуків // good/total*100
    const positivePercentage =
      (this.state.good / this.countTotalFeedback()) * 100;

    return Math.round(positivePercentage);
  }

  render() {
    const { good, neutral, bad } = this.state;
    const total = this.countTotalFeedback(); // два і більше раз повторюється - винось в змінну

    return (
      <div className="container">
        <Section title="Please leave feedback">
          <FeedbackOptions
            // options={['good', 'neutral', 'bad']}
            options={[...Object.keys(this.state)]}
            onLeaveFeedback={this.handleFeedback}
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
              percentage={this.countPositiveFeedbackPercentage()}
            />
          )}
        </Section>
      </div>
    );
  }
}

export default App;
