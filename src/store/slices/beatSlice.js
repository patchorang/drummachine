import { createSlice } from "@reduxjs/toolkit";
import { HIHAT, SNARE, KICK } from "../../utils/samplesLibrary";

const initialState = [
  {
    bpm: 120,
    beat: [
      {
        instrument: HIHAT,
        data: [
          { on: true, velocity: 1.0 },
          { on: false, velocity: 1.0 },
          { on: true, velocity: 1.0 },
          { on: false, velocity: 1.0 },
          { on: true, velocity: 1.0 },
          { on: false, velocity: 1.0 },
          { on: true, velocity: 1.0 },
          { on: false, velocity: 1.0 },
          { on: true, velocity: 1.0 },
          { on: false, velocity: 1.0 },
          { on: true, velocity: 1.0 },
          { on: false, velocity: 1.0 },
          { on: true, velocity: 1.0 },
          { on: false, velocity: 1.0 },
          { on: true, velocity: 1.0 },
          { on: false, velocity: 1.0 },
        ],
      },
      {
        instrument: SNARE,
        data: [
          { on: false, velocity: 1.0 },
          { on: false, velocity: 1.0 },
          { on: false, velocity: 1.0 },
          { on: false, velocity: 1.0 },
          { on: true, velocity: 1.0 },
          { on: false, velocity: 1.0 },
          { on: false, velocity: 1.0 },
          { on: false, velocity: 1.0 },
          { on: false, velocity: 1.0 },
          { on: false, velocity: 1.0 },
          { on: false, velocity: 1.0 },
          { on: false, velocity: 1.0 },
          { on: true, velocity: 1.0 },
          { on: false, velocity: 1.0 },
          { on: false, velocity: 1.0 },
          { on: false, velocity: 1.0 },
        ],
      },
      {
        instrument: KICK,
        data: [
          { on: true, velocity: 1.0 },
          { on: false, velocity: 1.0 },
          { on: false, velocity: 1.0 },
          { on: false, velocity: 1.0 },
          { on: true, velocity: 1.0 },
          { on: false, velocity: 1.0 },
          { on: false, velocity: 1.0 },
          { on: false, velocity: 1.0 },
          { on: true, velocity: 1.0 },
          { on: false, velocity: 1.0 },
          { on: false, velocity: 1.0 },
          { on: false, velocity: 1.0 },
          { on: true, velocity: 1.0 },
          { on: false, velocity: 1.0 },
          { on: false, velocity: 1.0 },
          { on: false, velocity: 1.0 },
        ],
      },
    ],
  },
];

export const beatSlice = createSlice({
  name: "beat",
  initialState,
  reducers: {
    toggleBeat: (state, action) => {
      const beat = action.payload.beatIndex;
      const channel = action.payload.channelIndex;
      const note = action.payload.noteIndex;
      state[beat].beat[channel].data[note].on =
        !state[beat].beat[channel].data[note].on;
    },
    setVelocity: (state, action) => {
      const beat = action.payload.beatIndex;
      const channel = action.payload.channelIndex;
      const note = action.payload.noteIndex;
      state[beat].beat[channel].data[note].velocity = action.payload.velocity;
    },
    setBpm: (state, action) => {
      const beat = action.payload.beatIndex;
      state[beat].bpm = action.payload.bpm;
    },
  },
});

export const { toggleBeat, setVelocity, setBpm } = beatSlice.actions;
export default beatSlice.reducer;
