import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  playing: false,
  activeBeatIndex: 0,
  currentBeat: 0, // beats: [
  //   {
  //     bpm: 120,
  //     beat: [
  //       [
  //         { on: true, velocity: 1.0 },
  //         { on: false, velocity: 1.0 },
  //         { on: true, velocity: 1.0 },
  //         { on: false, velocity: 1.0 },
  //         { on: true, velocity: 1.0 },
  //         { on: false, velocity: 1.0 },
  //         { on: true, velocity: 1.0 },
  //         { on: false, velocity: 1.0 },
  //         { on: true, velocity: 1.0 },
  //         { on: false, velocity: 1.0 },
  //         { on: true, velocity: 1.0 },
  //         { on: false, velocity: 1.0 },
  //         { on: true, velocity: 1.0 },
  //         { on: false, velocity: 1.0 },
  //         { on: true, velocity: 1.0 },
  //         { on: false, velocity: 1.0 },
  //       ],
  //       [
  //         { on: false, velocity: 1.0 },
  //         { on: false, velocity: 1.0 },
  //         { on: false, velocity: 1.0 },
  //         { on: false, velocity: 1.0 },
  //         { on: true, velocity: 1.0 },
  //         { on: false, velocity: 1.0 },
  //         { on: false, velocity: 1.0 },
  //         { on: false, velocity: 1.0 },
  //         { on: false, velocity: 1.0 },
  //         { on: false, velocity: 1.0 },
  //         { on: false, velocity: 1.0 },
  //         { on: false, velocity: 1.0 },
  //         { on: true, velocity: 1.0 },
  //         { on: false, velocity: 1.0 },
  //         { on: false, velocity: 1.0 },
  //         { on: false, velocity: 1.0 },
  //       ],
  //       [
  //         { on: true, velocity: 1.0 },
  //         { on: false, velocity: 1.0 },
  //         { on: false, velocity: 1.0 },
  //         { on: false, velocity: 1.0 },
  //         { on: true, velocity: 1.0 },
  //         { on: false, velocity: 1.0 },
  //         { on: false, velocity: 1.0 },
  //         { on: false, velocity: 1.0 },
  //         { on: true, velocity: 1.0 },
  //         { on: false, velocity: 1.0 },
  //         { on: false, velocity: 1.0 },
  //         { on: false, velocity: 1.0 },
  //         { on: true, velocity: 1.0 },
  //         { on: false, velocity: 1.0 },
  //         { on: false, velocity: 1.0 },
  //         { on: false, velocity: 1.0 },
  //       ],
  //     ],
  //   },
  // ],
};
export const controllerSlice = createSlice({
  name: "controller",
  initialState,
  reducers: {
    setSelectedBeat: (state, action) => {
      state.currentBeat = action.payload;
    },
    playBeat: (state) => {
      state.playing = true;
    },
    pauseBeat: (state) => {
      state.playing = false;
    },
    stopBeat: (state) => {
      state.playing = false;
      state.activeBeatIndex = 0;
    },
    setActiveBeatIndex: (state, action) => {
      state.activeBeatIndex = action.payload;
    },
  },
});
export const {
  setSelectedBeat,
  playBeat,
  pauseBeat,
  stopBeat,
  setActiveBeatIndex,
} = controllerSlice.actions;
export default controllerSlice.reducer;
