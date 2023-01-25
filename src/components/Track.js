import { Howl } from "howler";

import { useEffect, useState } from "react";
import { useSetInterval } from "../hooks/useSetInterval";

import { useSelector, useDispatch } from "react-redux";
import { setActiveBeatIndex } from "../store/slices/controllerSlice";
import { setBpm } from "../store/slices/beatSlice";

import sampleLibrary from "../utils/samplesLibrary";
import Channel from "./Channel";
import Controls from "./Controls";
import BeatSelector from "./BeatSelector";

function Track() {
  const selectedBeat = useSelector((state) => state.controller.currentBeat);
  const playing = useSelector((state) => state.controller.playing);
  const beatData = useSelector((state) => state.beat)[selectedBeat];
  const bpm = useSelector((state) => state.beat[selectedBeat].bpm);
  const activeBeatIndex = useSelector(
    (state) => state.controller.activeBeatIndex
  );
  const dispatch = useDispatch();

  const [numBars, beatsPerBar, baseNote] = [1, 4, 4];
  const numBeats = numBars * beatsPerBar * baseNote;

  const [channels, setChannels] = useState(beatData.beat.map((b) => b));
  const [instruments, setInstruments] = useState(
    beatData.beat.map((b) => {
      return new Howl({
        src: [sampleLibrary[b.instrument].sample],
      });
    })
  );

  const setupChannelsAndInstruments = () => {
    setChannels(beatData.beat.map((b) => b));
    setInstruments(
      beatData.beat.map((b) => {
        return new Howl({
          src: [sampleLibrary[b.instrument].sample],
        });
      })
    );
  };

  useEffect(() => {
    setupChannelsAndInstruments();
  }, [selectedBeat, beatData]);

  const handleStep = () => {
    if (playing) {
      const beat = (activeBeatIndex + 1) % numBeats;
      channels.forEach((channel) => {
        if (channel.data[beat].on) {
          instruments[channel.instrument].volume(channel.data[beat].velocity);
          instruments[channel.instrument].play();
        }
      });
      dispatch(setActiveBeatIndex((activeBeatIndex + 1) % numBeats));
    }
  };

  useSetInterval(handleStep, 60000 / (bpm * baseNote));

  const handleChangeBpm = (e) => {
    dispatch(setBpm({ beatIndex: selectedBeat, bpm: e.target.value }));
  };

  const renderedChannels = channels.map((channel, i) => (
    <Channel
      key={i + channel.instrument}
      channelData={channel.data}
      channelIndex={i}
      label={sampleLibrary[channel.instrument].label}
    />
  ));

  return (
    <div className="flex flex-col items-center">
      <div className="mt-4">
        <div className="flex space-x-24 mb-4 ml-16">
          <Controls />
          <input
            className="border-black border-2 text-black font-bold py-1 px-3 rounded text-sm w-24"
            type="number"
            value={bpm}
            onChange={handleChangeBpm}
          />
          <BeatSelector />
        </div>
        <div>{renderedChannels}</div>
      </div>
    </div>
  );
}

export default Track;
