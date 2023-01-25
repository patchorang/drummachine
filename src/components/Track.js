import { Howl } from "howler";
import { IoAddSharp } from "react-icons/io5";

import { useEffect, useState } from "react";
import { useSetInterval } from "../hooks/useSetInterval";

import { useSelector, useDispatch } from "react-redux";
import { setActiveBeatIndex } from "../store/slices/controllerSlice";
import { setBpm, addChannel } from "../store/slices/beatSlice";

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
      channels.forEach((channel, channelIndex) => {
        if (channel.data[beat].on) {
          instruments[channelIndex].volume(channel.data[beat].velocity);
          instruments[channelIndex].play();
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
      key={i + channel.instrument.toString()}
      instrument={channel.instrument}
      channelData={channel.data}
      channelIndex={i}
      label={sampleLibrary[channel.instrument].label}
    />
  ));

  return (
    <div className="flex flex-col items-center">
      <div className="mt-4">
        <div className="flex justify-between mb-4 ">
          <Controls />
          <div className="flex space-x-1 items-center">
            <input
              className="border-black border-2 text-black font-bold py-1 pl-1 rounded text-sm w-16"
              type="number"
              value={bpm}
              onChange={handleChangeBpm}
            />
            <div className="font-bold text-sm">bpm</div>
          </div>
          <BeatSelector />
        </div>
        <div>{renderedChannels}</div>
        <button
          className="border-black border-2 text-black font-bold rounded w-8 h-8"
          onClick={() => dispatch(addChannel({ beatIndex: selectedBeat }))}
        >
          <IoAddSharp className="mx-auto" size={16} />
        </button>
        <button onClick={() => console.log(JSON.stringify(beatData))}>
          print
        </button>
      </div>
    </div>
  );
}

export default Track;
