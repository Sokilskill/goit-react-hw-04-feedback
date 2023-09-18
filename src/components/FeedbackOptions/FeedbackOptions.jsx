import React from 'react';
import PropTypes from 'prop-types';
import css from './Feedback.module.css';

const FeedbackOptions = ({ options, onLeaveFeedback }) => {
  return (
    <ul className={css.ul}>
      {options.map(option => (
        <li key={option}>
          <button
            onClick={() => onLeaveFeedback(option)}
            className={`${css.btn}`}
            // className={css['btn-btn']}
          >
            {option}
          </button>
        </li>
      ))}
    </ul>
  );
};
FeedbackOptions.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onLeaveFeedback: PropTypes.func.isRequired,
};

export default FeedbackOptions;
