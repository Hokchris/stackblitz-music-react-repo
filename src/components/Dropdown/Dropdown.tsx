import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { NoteLetter } from '../../types/Types';

export default function Dropdown() {
  const [selectedNote, setSelectedNote] = useState<string>('');
  const [selectedPitch, setSelectedPitch] = useState<string>('');

  const notes = Object.keys(NoteLetter).filter((k) => isNaN(Number(k)));
  const pitches = [...Array(9).keys()];

  return (
    <div>
      <select
        value={selectedNote}
        onChange={(e) => setSelectedNote(e.target.value)}
      >
        {notes.map((note, idx) => (
          <option key={idx} value={note}>
            {note}
          </option>
        ))}
      </select>

      <select
        value={selectedPitch}
        onChange={(e) => setSelectedPitch(e.target.value)}
      >
        {pitches.map((pitch, idx) => (
          <option key={idx} value={pitch}>
            {pitch}
          </option>
        ))}
      </select>

      <p>
        Selected Value: {selectedNote}
        {selectedPitch}
      </p>
    </div>
  );
}
