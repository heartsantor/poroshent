import React, { useState } from 'react';
import { evaluate } from 'mathjs';

const Calculator = () => {
 const [input, setInput] = useState('');

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput('');
  };

  const handleNegate = () => {
    setInput((prev) => {
      if (prev) {
        return String(evaluate(`${prev} * -1`));
      }
      return '';
    });
  };

  const handlePercentage = () => {
    setInput((prev) => {
      if (prev) {
        return String(evaluate(`${prev} / 100`));
      }
      return '';
    });
  };

  const handleCalculate = () => {
    try {
      const result = evaluate(input);
      setInput(String(result));
    } catch (error) {
      setInput('Error');
    }
  };

  return (
    <div className="calculator">
      <div className="display">
        <div>{input || '0'}</div>
      </div>
      <div className="buttons">
        <button className="button-operator" onClick={handleClear}>
          AC
        </button>
        <button className="button-operator" onClick={handleNegate}>
          +/-
        </button>
        <button className="button-operator" onClick={handlePercentage}>
          %
        </button>
        <button className="button-operator" onClick={() => handleClick('/')}>
          /
        </button>

        <button className="button-number" onClick={() => handleClick('7')}>
          7
        </button>
        <button className="button-number" onClick={() => handleClick('8')}>
          8
        </button>
        <button className="button-number" onClick={() => handleClick('9')}>
          9
        </button>
        <button className="button-operator" onClick={() => handleClick('*')}>
          *
        </button>

        <button className="button-number" onClick={() => handleClick('4')}>
          4
        </button>
        <button className="button-number" onClick={() => handleClick('5')}>
          5
        </button>
        <button className="button-number" onClick={() => handleClick('6')}>
          6
        </button>
        <button className="button-operator" onClick={() => handleClick('-')}>
          -
        </button>

        <button className="button-number" onClick={() => handleClick('1')}>
          1
        </button>
        <button className="button-number" onClick={() => handleClick('2')}>
          2
        </button>
        <button className="button-number" onClick={() => handleClick('3')}>
          3
        </button>
        <button className="button-operator" onClick={() => handleClick('+')}>
          +
        </button>

        <button className="button-number button-zero" onClick={() => handleClick('0')}>
          0
        </button>
        <button className="button-number" onClick={() => handleClick('.')}>
          .
        </button>
        <button className="button-operator" onClick={handleCalculate}>
          =
        </button>
      </div>
    </div>
  );
};

export default Calculator;
