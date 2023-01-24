import { useEffect, useState } from "react";
import { useSetInterval } from "../hooks/useSetInterval";
import Channel from "./Channel";
import Controls from "./Controls";
import kickSample from "../clips/kick.wav";
import snareSample from "../clips/snare.wav";
import hihatSample from "../clips/hihat.wav";
import { Howl } from "howler";
import BeatSelector from "./BeatSelector";
import presetTracks from "../utils/presetTracks";

function Track() {
  const [bpm, setBpm] = useState(120);
  const [activeBeat, setActiveBeat] = useState(0);

  const [numBars, setNumBars] = useState(1);
  const [beatsPerBar, setBeatsPerBar] = useState(4);
  const [baseNote, setBaseNote] = useState(4);
  const [trackNumber, setTrackNumber] = useState(0);
  const numBeats = numBars * beatsPerBar * baseNote;
  const [hiHatTrack, setHiHatTrack] = useState(presetTracks[trackNumber][0]);
  const [snareTrack, setSnareTrack] = useState(presetTracks[trackNumber][1]);
  const [kickTrack, setKickTrack] = useState(presetTracks[trackNumber][2]);
  const [playing, setPlaying] = useState(true);
  const [swing, setSwing] = useState(0);
  const [showVelocityForChannel, setShowVelocityForChannel] = useState(-1);
  var hihat = new Howl({
    src: [hihatSample],
  });
  var snare = new Howl({
    src: [snareSample],
  });
  var kick = new Howl({
    src: [kickSample],
  });

  useEffect(() => {
    setHiHatTrack(presetTracks[trackNumber][0]);
    setSnareTrack(presetTracks[trackNumber][1]);
    setKickTrack(presetTracks[trackNumber][2]);
  }, [trackNumber]);

  const handleStep = () => {
    if (playing) {
      setSwing(swing * -1);
      const beat = (activeBeat + 1) % numBeats;
      if (hiHatTrack[beat].on) {
        hihat.volume(hiHatTrack[beat].velocity);
        hihat.play();
      }
      if (snareTrack[beat].on) {
        snare.volume(snareTrack[beat].velocity);
        snare.play();
      }
      if (kickTrack[beat].on) {
        kick.volume(kickTrack[beat].velocity);
        kick.play();
      }
      setActiveBeat((activeBeat + 1) % numBeats);
    }
  };

  useSetInterval(handleStep, (60000 + swing) / (bpm * baseNote));

  const toggleBeat = (track, index) => {
    if (track === 0) {
      const tempTrack = [...hiHatTrack];
      tempTrack[index].on = !tempTrack[index].on;
      setHiHatTrack(tempTrack);
    } else if (track === 1) {
      const tempTrack = [...snareTrack];
      tempTrack[index].on = !tempTrack[index].on;
      setSnareTrack(tempTrack);
    } else if (track === 2) {
      const tempTrack = [...kickTrack];
      tempTrack[index].on = !tempTrack[index].on;
      setKickTrack(tempTrack);
    }
  };

  const toggleHiHatBeat = (index) => {
    toggleBeat(0, index);
  };
  const toggleSnareBeat = (index) => {
    toggleBeat(1, index);
  };
  const toggleKickBeat = (index) => {
    toggleBeat(2, index);
  };

  const setVelocity = (track, index, newVelocity) => {
    if (track === 0) {
      const tempTrack = [...hiHatTrack];
      tempTrack[index].velocity = newVelocity;
      setHiHatTrack(tempTrack);
    } else if (track === 1) {
      const tempTrack = [...snareTrack];
      tempTrack[index].velocity = newVelocity;
      setSnareTrack(tempTrack);
    } else if (track === 2) {
      const tempTrack = [...kickTrack];
      tempTrack[index].velocity = newVelocity;
      setKickTrack(tempTrack);
    }
  };

  const setHiHatVelocity = (index, newVelocity) => {
    setVelocity(0, index, newVelocity);
  };
  const setSnareVelocity = (index, newVelocity) => {
    setVelocity(1, index, newVelocity);
  };
  const setKickVelocity = (index, newVelocity) => {
    setVelocity(2, index, newVelocity);
  };

  const setSelection = (num) => {
    if (num >= 0 && num < presetTracks.length) {
      setTrackNumber(num);
    }
  };

  const handleChangeBpm = (e) => {
    const newBpm = e.target.value;
    setBpm(newBpm);
  };

  const handleOnPlay = () => {
    setPlaying(true);
  };

  const handleOnPause = () => {
    setPlaying(false);
  };

  const handleOnStop = () => {
    setPlaying(false);
    setActiveBeat(0);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mt-4">
        <div className="flex space-x-24 mb-4 ml-16">
          <Controls
            onPlay={handleOnPlay}
            onPause={handleOnPause}
            onStop={handleOnStop}
            playing={playing}
          />
          <input
            className="border-black border-2 text-black font-bold py-1 px-3 rounded text-sm w-24"
            type="number"
            value={bpm}
            onChange={handleChangeBpm}
          />
          <BeatSelector
            currentSelection={trackNumber}
            setSelection={setSelection}
          />
        </div>
        <div>
          <Channel
            sample={hihat}
            numBeats={numBeats}
            track={hiHatTrack}
            activeBeat={activeBeat}
            label="Hi hat"
            toggleBeat={toggleHiHatBeat}
            onVelocityChange={setHiHatVelocity}
          />
          <Channel
            sample={snare}
            numBeats={numBeats}
            track={snareTrack}
            activeBeat={activeBeat}
            label="Snare"
            toggleBeat={toggleSnareBeat}
            onVelocityChange={setSnareVelocity}
          />
          <Channel
            sample={kick}
            numBeats={numBeats}
            track={kickTrack}
            activeBeat={activeBeat}
            label="Kick"
            toggleBeat={toggleKickBeat}
            onVelocityChange={setKickVelocity}
          />
        </div>
      </div>
    </div>
  );
}

export default Track;
