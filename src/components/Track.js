import { Howl } from "howler";
import { IoAddSharp } from "react-icons/io5";
import { isMobile } from "react-device-detect";

import { useEffect, useState } from "react";
import { useSetInterval } from "../hooks/useSetInterval";

import { useSelector, useDispatch } from "react-redux";
import { setActiveBeatIndex } from "../store/slices/controllerSlice";
import { setBpm, addChannel } from "../store/slices/beatSlice";

import sampleLibrary from "../utils/samplesLibrary";
import Channel from "./Channel";
import Controls from "./Controls";
import BeatSelector from "./BeatSelector";
import Button from "./Button";

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
  // CPU usage goes THROUGH THE ROOF if I setup the default state here. Work useEffect though.
  const [instruments, setInstruments] = useState(null);

  const handleStep = () => {
    if (playing && bpm && bpm > 0) {
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

  useEffect(() => {
    setChannels(beatData.beat.map((b) => b));
    setInstruments(
      beatData.beat.map((b) => {
        return new Howl({
          src: [sampleLibrary[b.instrument].sample],
          // html5: true,
        });
      })
    );
  }, [selectedBeat, beatData]);

  const handleChangeBpm = (e) => {
    dispatch(setBpm({ beatIndex: selectedBeat, bpm: e.target.value }));
  };

  const renderedChannels = channels.map((channel, i) => (
    <Channel
      key={i + channel.instrument.toString()}
      instrument={channel.instrument}
      channelData={channel.data}
      channelIndex={i}
      activeBeatIndex={activeBeatIndex}
    />
  ));

  let renderedContent =
    channels.length > 0 ? (
      renderedChannels
    ) : (
      <div className="text-sm font-bold bg-gray-100 p-8 rounded mb-2 px-28">
        Well how are you going to make a beat without any instruments?
      </div>
    );

  if (isMobile) {
    renderedContent = (
      <div className="text-sm font-bold bg-gray-100 p-8 rounded mb-2">
        Sorry, there are some ~technical issues~ with playing lots of sounds
        really quickly on a phone that I haven't explored yet.
      </div>
    );
  }

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
        <div>{renderedContent}</div>
        <Button
          onClick={() => dispatch(addChannel({ beatIndex: selectedBeat }))}
          square
          className="ml-4"
        >
          <IoAddSharp size={16} />
        </Button>
      </div>
      {/* For dev */}
      {/* <button onClick={() => console.log(JSON.stringify(beatData))}>
        Print
      </button> */}
    </div>
  );
}

export default Track;
