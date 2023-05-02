import React, { useState } from 'react';
import './App.css';

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState([]);

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplayValue(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit);
    }
  }

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplayValue('.');
      setWaitingForOperand(false);
    } else if (displayValue.indexOf('.') === -1) {
      setDisplayValue(displayValue + '.');
    }
  }

  const clearDisplay = () => {
    setDisplayValue('0');
  }

  const toggleSign = () => {
    const newValue = parseFloat(displayValue) * -1;
    setDisplayValue(String(newValue));
  }

  const inputPercent = () => {
    const currentValue = parseFloat(displayValue);
    if (currentValue === 0) return;
    const fixedDigits = displayValue.replace(/^-?\d*\.?/, '');
    const newValue = parseFloat(displayValue) / 100;
    setDisplayValue(String(newValue.toFixed(fixedDigits.length + 2)));
  }

  const performOperation = (nextOperator) => {
    if (nextOperator === 'sin' || nextOperator === 'cos' || nextOperator === 'tan' || nextOperator === 'log' || nextOperator === 'sqrt') {
      const inputValue = parseFloat(displayValue);
      const newValue = calculate[nextOperator](inputValue);
      setDisplayValue(String(newValue));
      setWaitingForOperand(true);
    } else if (nextOperator === '=') {
      const inputValue = parseFloat(displayValue);

      if (previousValue == null) return;

      if (operator) {
        const currentValue = previousValue || 0;
        const newValue = calculate[operator](currentValue, inputValue);

        setDisplayValue(String(newValue));
        setPreviousValue(null);
        setOperator(null);
        setWaitingForOperand(true);

        setHistory([...history, `${currentValue} ${operator} ${inputValue} = ${newValue}`]);
      } else {
        setPreviousValue(inputValue);
      }
    } else {
      const inputValue = parseFloat(displayValue);

      if (previousValue != null && operator) {
        const currentValue = previousValue || 0;
        const newValue = calculate[operator](currentValue, inputValue);

        setDisplayValue(String(newValue));
        setPreviousValue(newValue);
      } else {
        setPreviousValue(inputValue);
      }

      setWaitingForOperand(true);
      setOperator(nextOperator);
    }
  }

  const calculate = {
    '/': (prevValue, nextValue) => prevValue / nextValue,
    '*': (prevValue, nextValue) => prevValue * nextValue,
    '+': (prevValue, nextValue) => prevValue + nextValue,
    '-': (prevValue, nextValue) => prevValue - nextValue,
    '=': (prevValue, nextValue) => nextValue,
    'sin': (value) => Math.sin(value),
    'cos': (value) => Math.cos(value),
    'tan': (value) => Math.tan(value),
    'log': (value) => Math.log(value),
    'sqrt': (value) => Math.sqrt(value),
  };

  return (
    <>
    <div className="heading">
      <h1>SIMPLE CALCULATOR</h1>
    </div>
    <div className="calculator">
      <div className="calculator-display">{displayValue}</div>
      <div className="calculator-keypad">
        <div className="input-keys">
          <div className="function-keys">
            <button className="calculator-key key-clear" onClick={() => clearDisplay()}>AC</button>
            <button className="calculator-key key-sign" onClick={() => toggleSign()}>±</button>
            <button className="calculator-key key-percent" onClick={() => inputPercent()}>%</button>
          </div>
          <div className="digit-keys">
            <button className="calculator-key key-1" onClick={() => inputDigit(1)}>1</button>
            <button className="calculator-key key-2" onClick={() => inputDigit(2)}>2</button>
            <button className="calculator-key key-3" onClick={() => inputDigit(3)}>3</button>
            <button className="calculator-key key-4" onClick={() => inputDigit(4)}>4</button>
            <button className="calculator-key key-5" onClick={() => inputDigit(5)}>5</button>
            <button className="calculator-key key-6" onClick={() => inputDigit(6)}>6</button>
            <button className="calculator-key key-7" onClick={() => inputDigit(7)}>7</button>
            <button className="calculator-key key-8" onClick={() => inputDigit(8)}>8</button>
            <button className="calculator-key key-9" onClick={() => inputDigit(9)}>9</button>
            <button className="calculator-key key-dot" onClick={() => inputDot()}>.</button>
            <button className="calculator-key key-0" onClick={() => inputDigit(0)}>0</button>
            <button className="calculator-key key-equals" onClick={() => performOperation('=')}>=</button>
          </div>
        </div>

        <div className="operator-keys">
          <button className="calculator-key key-divide" onClick={() => performOperation('/')}>÷</button>
          <button className="calculator-key key-multiply" onClick={() => performOperation('*')}>×</button>
          <button className="calculator-key key-subtract" onClick={() => performOperation('-')}>−</button>
          <button className="calculator-key key-add" onClick={() => performOperation('+')}>+</button>
          
          <button className="calculator-key key-sin" onClick={() => performOperation('sin')}>sin</button>
          <button className="calculator-key key-cos" onClick={() => performOperation('cos')}>cos</button>
          <button className="calculator-key key-tan" onClick={() => performOperation('tan')}>tan</button>
          <button className="calculator-key key-log" onClick={() => performOperation('log')}>log</button>
          <button className="calculator-key key-sqrt" onClick={() => performOperation('sqrt')}>√</button>
        </div>
      </div>
    </div><div className="history">
        <h2><b>HISTORY</b></h2>
        <ul>
          {history.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      </div></>
  );
}

export default Calculator;