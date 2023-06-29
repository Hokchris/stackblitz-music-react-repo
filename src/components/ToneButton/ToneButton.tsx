import * as React from 'react';
import * as Tone from 'tone';
import { useState, useRef, useEffect } from 'react';
import './ToneButton.css';

export default function ToneButton() {
  const [counter, setCounter] = useState<number>(0);
  const synth = new Tone.Synth().toDestination();

  function playNote(note: string = 'C4', duration: string = '8n'): void {
    if (!isNoteValid(note)) {
      console.log(`Invalid note ${note}`);
      return;
    }
    if (!isDurationValid(duration)) {
      console.log(`Invalid note ${duration}`);
      return;
    }

    synth.triggerAttackRelease('C4', '8n');
  }

  function isNoteValid(note: string): boolean {
    return true;
  }

  function isDurationValid(duration: string): boolean {
    return true;
  }

  return (
    <div className="tone-button-container">
      <div className="text-lg">{counter}</div>
      {/* <button onClick={() => setCounter(counter + 1)}>Increment</button>
      <button onClick={() => setCounter(counter - 1)}>Decrement</button> */}
      <button onClick={() => playNote()}>Play note</button>
    </div>
  );
}
