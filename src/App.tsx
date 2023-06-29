import * as React from 'react';
import './style.css';
import ToneButton from './components/ToneButton/ToneButton';
import Dropdown from './components/Dropdown/Dropdown';

export default function App() {
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
      <ToneButton />
      <Dropdown />
    </div>
  );
}
