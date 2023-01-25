import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    bpm: 120,
    beat: [
      {
        instrument: 1,
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
        instrument: 3,
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
        instrument: 6,
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

const defaultChannel = {
  instrument: 3,
  data: [
    { on: false, velocity: 1.0 },
    { on: false, velocity: 1.0 },
    { on: false, velocity: 1.0 },
    { on: false, velocity: 1.0 },
    { on: false, velocity: 1.0 },
    { on: false, velocity: 1.0 },
    { on: false, velocity: 1.0 },
    { on: false, velocity: 1.0 },
    { on: false, velocity: 1.0 },
    { on: false, velocity: 1.0 },
    { on: false, velocity: 1.0 },
    { on: false, velocity: 1.0 },
    { on: false, velocity: 1.0 },
    { on: false, velocity: 1.0 },
    { on: false, velocity: 1.0 },
    { on: false, velocity: 1.0 },
  ],
};

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
    setInstrument: (state, action) => {
      const beat = action.payload.beatIndex;
      const channel = action.payload.channelIndex;
      state[beat].beat[channel].instrument = action.payload.instrument;
    },
    addChannel: (state, action) => {
      const beat = action.payload.beatIndex;
      state[beat].beat.push(defaultChannel);
    },
    removeChannel: (state, action) => {
      const beat = action.payload.beatIndex;
      const channel = action.payload.channelIndex;
      state[beat].beat.splice(channel, 1);
    },
  },
});

export const {
  toggleBeat,
  setVelocity,
  setBpm,
  setInstrument,
  addChannel,
  removeChannel,
} = beatSlice.actions;
export default beatSlice.reducer;
