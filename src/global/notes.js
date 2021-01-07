export type NoteType = {
  midi: Number,
  ansi: String,
  type: String,
  lightId: Number
}

export const notes : NoteType[] = [
  {midi: 21, ansi: 'A0', type: 'white', lightId: 1},
  {midi: 22, ansi: 'A#0', type: 'black', lightId: 2},
  {midi: 23, ansi: 'B0', type: 'white', lightId: 1},
  {midi: 24, ansi: 'C1', type: 'white', lightId: 0},
  {midi: 25, ansi: 'C#1', type: 'black', lightId: 1},
  {midi: 26, ansi: 'D1', type: 'white', lightId: 2},
  {midi: 27, ansi: 'D#1', type: 'black', lightId: 1},
  {midi: 28, ansi: 'E1', type: 'white', lightId: 0},
  {midi: 29, ansi: 'F1', type: 'white', lightId: 1},
  {midi: 30, ansi: 'F#1', type: 'black', lightId: 2},
  {midi: 31, ansi: 'G1', type: 'white', lightId: 1},
  {midi: 32, ansi: 'G#1', type: 'black', lightId: 0},
  {midi: 33, ansi: 'A1', type: 'white', lightId: 1},
  {midi: 34, ansi: 'A#1', type: 'black', lightId: 2},
  {midi: 35, ansi: 'B1', type: 'white', lightId: 1},
  {midi: 36, ansi: 'C2', type: 'white', lightId: 0},
  {midi: 37, ansi: 'C#2', type: 'black', lightId: 1},
  {midi: 38, ansi: 'D2', type: 'white', lightId: 2},
  {midi: 39, ansi: 'D#2', type: 'black', lightId: 1},
  {midi: 40, ansi: 'E2', type: 'white', lightId: 0},
  {midi: 41, ansi: 'F2', type: 'white', lightId: 1},
  {midi: 42, ansi: 'F#2', type: 'black', lightId: 2},
  {midi: 43, ansi: 'G2', type: 'white', lightId: 1},
  {midi: 44, ansi: 'G#2', type: 'black', lightId: 0},
  {midi: 45, ansi: 'A2', type: 'white', lightId: 1},
  {midi: 46, ansi: 'A#2', type: 'black', lightId: 2},
  {midi: 47, ansi: 'B2', type: 'white', lightId: 1},
  {midi: 48, ansi: 'C3', type: 'white', lightId: 0},
  {midi: 49, ansi: 'C#3', type: 'black', lightId: 1},
  {midi: 50, ansi: 'D3', type: 'white', lightId: 2},
  {midi: 51, ansi: 'D#3', type: 'black', lightId: 1},
  {midi: 52, ansi: 'E3', type: 'white', lightId: 0},
  {midi: 53, ansi: 'F3', type: 'white', lightId: 1},
  {midi: 54, ansi: 'F#3', type: 'black', lightId: 2},
  {midi: 55, ansi: 'G3', type: 'white', lightId: 1},
  {midi: 56, ansi: 'G#3', type: 'black', lightId: 0},
  {midi: 57, ansi: 'A3', type: 'white', lightId: 1},
  {midi: 58, ansi: 'A#3', type: 'black', lightId: 2},
  {midi: 59, ansi: 'B3', type: 'white', lightId: 1},
  {midi: 60, ansi: 'C4', type: 'white', lightId: 0},
  {midi: 61, ansi: 'C#4', type: 'black', lightId: 1},
  {midi: 62, ansi: 'D4', type: 'white', lightId: 2},
  {midi: 63, ansi: 'D#4', type: 'black', lightId: 1},
  {midi: 64, ansi: 'E4', type: 'white', lightId: 0},
  {midi: 65, ansi: 'F4', type: 'white', lightId: 1},
  {midi: 66, ansi: 'F#4', type: 'black', lightId: 2},
  {midi: 67, ansi: 'G4', type: 'white', lightId: 1},
  {midi: 68, ansi: 'G#4', type: 'black', lightId: 0},
  {midi: 69, ansi: 'A4', type: 'white', lightId: 1},
  {midi: 70, ansi: 'A#4', type: 'black', lightId: 2},
  {midi: 71, ansi: 'B4', type: 'white', lightId: 1},
  {midi: 72, ansi: 'C5', type: 'white', lightId: 0},
  {midi: 73, ansi: 'C#5', type: 'black', lightId: 1},
  {midi: 74, ansi: 'D5', type: 'white', lightId: 2},
  {midi: 75, ansi: 'D#5', type: 'black', lightId: 1},
  {midi: 76, ansi: 'E5', type: 'white', lightId: 0},
  {midi: 77, ansi: 'F5', type: 'white', lightId: 1},
  {midi: 78, ansi: 'F#5', type: 'black', lightId: 2},
  {midi: 79, ansi: 'G5', type: 'white', lightId: 1},
  {midi: 80, ansi: 'G#5', type: 'black', lightId: 0},
  {midi: 81, ansi: 'A5', type: 'white', lightId: 1},
  {midi: 82, ansi: 'A#5', type: 'black', lightId: 2},
  {midi: 83, ansi: 'B5', type: 'white', lightId: 1},
  {midi: 84, ansi: 'C6', type: 'white', lightId: 0},
  {midi: 85, ansi: 'C#6', type: 'black', lightId: 1},
  {midi: 86, ansi: 'D6', type: 'white', lightId: 2},
  {midi: 87, ansi: 'D#6', type: 'black', lightId: 1},
  {midi: 88, ansi: 'E6', type: 'white', lightId: 0},
  {midi: 89, ansi: 'F6', type: 'white', lightId: 1},
  {midi: 90, ansi: 'F#6', type: 'black', lightId: 2},
  {midi: 91, ansi: 'G6', type: 'white', lightId: 1},
  {midi: 92, ansi: 'G#6', type: 'black', lightId: 0},
  {midi: 93, ansi: 'A6', type: 'white', lightId: 1},
  {midi: 94, ansi: 'A#6', type: 'black', lightId: 2},
  {midi: 95, ansi: 'B6', type: 'white', lightId: 1},
  {midi: 96, ansi: 'C7', type: 'white', lightId: 0},
  
  {midi: 97, ansi: 'C#7', type: 'black', lightId: 1},
  {midi: 98, ansi: 'D7', type: 'white', lightId: 2},
  {midi: 99, ansi: 'D#7', type: 'black', lightId: 1},
  {midi: 100, ansi: 'E7', type: 'white', lightId: 0},
  {midi: 101, ansi: 'F7', type: 'white', lightId: 1},
  {midi: 102, ansi: 'F#7', type: 'black', lightId: 2},
  {midi: 103, ansi: 'G7', type: 'white', lightId: 1},
  {midi: 104, ansi: 'G#7', type: 'black', lightId: 0},
  {midi: 105, ansi: 'A7', type: 'white', lightId: 1},
  {midi: 106, ansi: 'A#7', type: 'black', lightId: 2},
  {midi: 107, ansi: 'B7', type: 'white', lightId: 1},
  {midi: 108, ansi: 'C8', type: 'white', lightId: 0},
];

export type NotePlayInfo = {
  lightId: Number,
  trackId: Number,
  playType: String, 	// "click", "press"
  duration: Number,
}

export const PLAY_TYPE_CLICK = "click";
export const PLAY_TYPE_PRESS = "press";

