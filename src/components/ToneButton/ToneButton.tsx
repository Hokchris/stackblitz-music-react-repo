import * as React from 'react';
import * as Tone from 'tone';
import { useState, useRef, useEffect } from 'react';
import './ToneButton.css';
import { Note, NoteLetter } from '../../types/Types';

// Array of all notes with name and octave
const notes = [
  { name: 'C', pitch: 'C' },
  { name: 'C#', pitch: 'C#' },
  { name: 'D', pitch: 'D' },
  { name: 'D#', pitch: 'D#' },
  { name: 'E', pitch: 'E' },
  { name: 'F', pitch: 'F' },
  { name: 'F#', pitch: 'F#' },
  { name: 'G', pitch: 'G' },
  { name: 'G#', pitch: 'G#' },
  { name: 'A', pitch: 'A' },
  { name: 'A#', pitch: 'A#' },
  { name: 'B', pitch: 'B' },
];

export default function ToneButton() {
  // const [counter, setCounter] = useState<number>(0);
  const synth = new Tone.Synth().toDestination();
  const polysynth = new Tone.PolySynth(Tone.Synth).toDestination();

  function playNote(note: string = 'C#4', duration: string = '4n'): void {
    if (!isNoteValid(note)) {
      console.log(`Invalid note ${note}`);
      return;
    }
    if (!isDurationValid(duration)) {
      console.log(`Invalid duration ${duration}`);
      return;
    }

    synth.triggerAttackRelease(note, duration);
  }

  function playChord(
    root: string = 'C4',
    mode: string = 'major',
    numNotes: number = 4
  ): void {
    const notes = getChordNotes(root, mode).slice(0, numNotes);

    console.log(notes);
    const now = Tone.now();

    notes.map((note, idx) => {
      polysynth.triggerAttack(note, now + idx * 0.5);
    });

    polysynth.triggerRelease(notes, now + notes.length * 0.7);
  }

  function arpeggiateChord(
    root: string = 'C2',
    mode: string = 'major',
    numNotes: number = 8
  ) {
    const notes = getChordNotes(root, mode).slice(0, numNotes);
    const now = Tone.now();

    notes.map((note, idx) => {
      synth.triggerAttackRelease(note, '16n', now + idx * 0.3);
    });
  }

  function getChordNotes(rootNote: string, mode: string) {
    const modes = {
      major: [0, 2, 4, 5, 7, 9, 11], // Major scale intervals
      naturalMinor: [0, 2, 3, 5, 7, 8, 10], // Natural minor scale intervals
      harmonicMinor: [0, 2, 3, 5, 7, 8, 11], // Harmonic minor scale intervals
      melodicMinor: [0, 2, 3, 5, 7, 9, 11], // Melodic minor scale intervals
      dorian: [0, 2, 3, 5, 7, 9, 10], // Dorian mode intervals
      phrygian: [0, 1, 3, 5, 7, 8, 10], // Phrygian mode intervals
      lydian: [0, 2, 4, 6, 7, 9, 11], // Lydian mode intervals
      mixolydian: [0, 2, 4, 5, 7, 9, 10], // Mixolydian mode intervals
      locrian: [0, 1, 3, 5, 6, 8, 10], // Locrian mode intervals
    };

    const rootNoteParts = rootNote.match(/^([A-G]#?)(\d)$/i);
    if (!rootNoteParts) {
      console.error('Invalid root note:', rootNote);
      return [];
    }

    const [, rootName, rootOctave] = rootNoteParts;
    const rootIndex = notes.findIndex(
      (note) => note.name === rootName.toUpperCase()
    );
    if (rootIndex === -1) {
      console.error('Invalid root note:', rootNote);
      return [];
    }

    const chordIntervals = modes[mode.toLowerCase()];
    if (!chordIntervals) {
      console.error('Invalid mode:', mode);
      return [];
    }

    const chordNotes = chordIntervals.map((interval) => {
      let noteIndex = (rootIndex + interval) % 12;
      let noteOctave =
        Number(rootOctave) + Math.floor((rootIndex + interval) / 12);
      const noteName = notes[noteIndex].name;

      return noteName + noteOctave;
    });

    return chordNotes;
  }

  function isNoteValid(note: string): boolean {
    const l = note.length;
    const letter = note.slice(0, l - 1);
    const pitch = Number(note[l - 1]);

    console.log(letter, pitch);

    if (!(letter in NoteLetter)) {
      return false;
    }

    if (pitch < 0 || pitch > 8) {
      return false;
    }

    return true;
  }

  function isDurationValid(duration: string): boolean {
    const validDurations = ['1n', '2n', '4n', '8n', '16n', '32n', '64n'];
    return validDurations.indexOf(duration) > -1;
  }

  return (
    <div className="tone-button-container">
      {/* <button onClick={() => setCounter(counter + 1)}>Increment</button>
      <button onClick={() => setCounter(counter - 1)}>Decrement</button> */}
      <button onClick={() => playNote()}>Play note</button>
      <button onClick={() => playChord()}>Play chord</button>
      <button onClick={() => arpeggiateChord()}>Arpeggio</button>
    </div>
  );
}
