import * as React from 'react';

export type Note = {
  note: NoteLetter;
  pitch: string;
};

export enum NoteLetter {
  'A',
  'A#',
  'Bb',
  'B',
  'Cb',
  'C',
  'C#',
  'Db',
  'D',
  'D#',
  'Eb',
  'E',
  'Fb',
  'F',
  'F#',
  'Gb',
  'G',
  'G#',
}
