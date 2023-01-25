import kickSample from "../clips/kick.wav";
import snareSample from "../clips/snare.wav";
import hiHatSample from "../clips/hihat.wav";

const HIHAT = 0;
const SNARE = 1;
const KICK = 2;

const sampleLibrary = {
  [KICK]: { sample: kickSample, label: "Kick" },
  [SNARE]: { sample: snareSample, label: "Snare" },
  [HIHAT]: { sample: hiHatSample, label: "HiHat" },
};

export { HIHAT, SNARE, KICK };
export default sampleLibrary;
