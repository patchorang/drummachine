import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  playing: false,
  activeBeatIndex: 0,
  currentBeat: 0,
  activeVelocityChannel: -1,
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
    setActiveVelocityChannel: (state, action) => {
      state.activeVelocityChannel = action.payload;
    },
    hideVelocity: (state, action) => {
      state.activeVelocityChannel = -1;
    },
  },
});
export const {
  setSelectedBeat,
  playBeat,
  pauseBeat,
  stopBeat,
  setActiveBeatIndex,
  setActiveVelocityChannel,
  hideVelocity,
} = controllerSlice.actions;
export default controllerSlice.reducer;
