"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { IoCloseCircle, IoRepeat, IoShuffle } from "react-icons/io5";
import { RxTrackNext, RxTrackPrevious } from "react-icons/rx";
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { removeTrack, togglePlayPause as togglePlayPauseRedux } from "../store/trackSlice";
import { likedSong, unlikedSong } from "../store/likedSlice";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import { formatDuration } from "../lib/utils/misc";
import { Progress, Slider, Tooltip } from "@radix-ui/themes";
import { Song } from "../lib/types/song";
import { togglePlayPause as togglePlay } from "../store/listSong/recommendSlice";


export default function MusicPlayer() {
  const dispatch = useDispatch();
  const currentTrack = useSelector((state: RootState) => state.track.currentTrack);

  const likedTrack = useSelector((state: RootState) => state.liked.list);


  const { togglePlayPause, play, stop, duration, seek, playing, getPosition, load } = useGlobalAudioPlayer();
  const [position, setPosition] = useState<number>(0);
  const frameRef = useRef<number>();

  const handleLike = (track: Song) => {
    dispatch(likedSong(track));
  };

  const handleUnlike = (track: Song) => {
    dispatch(unlikedSong(track.id));
  };

  const handleTogglePlay = (track: Song) => {
    dispatch(togglePlay(track.id));
    togglePlayPause();
    dispatch(togglePlayPauseRedux());
  };

  const handleRemoveTrack = () => {
    dispatch(removeTrack());
  };

  useEffect(() => {
    if (currentTrack?.title) {
      console.log(currentTrack.music);
      load(currentTrack.music || "audio/bernadya.mp3", {
        autoplay: true,
        format: "mp3",
        
      });
    }
  }, [currentTrack?.title]);

  useEffect(() => {
    if (currentTrack?.isPlay) {
      play();
    } else {
      stop();
    }
  }, [currentTrack?.isPlay]);

  useEffect(() => {
    getPosition && setPosition(getPosition());
  }, [getPosition]);

  useEffect(() => {
    const animate = () => {
      setPosition(getPosition());
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [getPosition, duration]);

  return (
    <div className="px-4 h-[340px] w-full">
      <div className="bg-zinc-800 shadow-lg flex flex-col p-1 rounded-2xl h-full w-full relative">
        <div className="absolute top-2 right-2">{!currentTrack ? "" : <IoCloseCircle className="shadow-lg rounded-full text-black" size={28} onClick={handleRemoveTrack} />}</div>
        {!currentTrack ? (
          <div className="rounded-xl aspect-video h-full w-full object-cover object-top bg-black grid place-items-center text-xs">No Track Playing</div>
        ) : (
          <Image src={currentTrack.image} alt="album" className="rounded-xl aspect-video h-full w-full object-cover object-top" />
        )}
        <div className="flex flex-col justify-between">
          <div className="flex justify-between items-center p-2 gap-2 mb-2">
            <div className="w-11/12 overflow-hidden whitespace-nowrap">
              <h1 className="font-bold text-sm mt-2 truncate running-text">{!currentTrack ? "No Title" : currentTrack.title}</h1>
              <h4 className="font-medium text-zinc-400 text-xs">{!currentTrack ? "No Artist" : currentTrack.artist}</h4>
            </div>
            <div className="w-1/12">
              {currentTrack && likedTrack.some((track) => track.id === currentTrack.id) ? (
                <IoMdHeart className="cursor-pointer text-red-500" onClick={() => handleUnlike(currentTrack)} />
              ) : (
                <IoMdHeartEmpty className="cursor-pointer" onClick={() => currentTrack && handleLike(currentTrack)} />
              )}
            </div>
          </div>
          <div className="w-full px-2">
            <Slider
              value={[position]}
              max={duration}
              size="1"
              variant="soft"
              color="orange"
              onValueChange={([values]) => {
                setPosition(values);
                seek(values);
              }}
              className="w-full"
            />
            <div className="flex flex-row justify-between text-xs mt-1">
              <p>{formatDuration(position, position > 3600 ? "hh:mm:ss" : "mm:ss")}</p>
              <p>{formatDuration(duration, duration > 3600 ? "hh:mm:ss" : "mm:ss")}</p>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between p-2">
            <Tooltip content="Shuffle">
              <IoShuffle />
            </Tooltip>
            <Tooltip content="Previous">
              <RxTrackPrevious />
            </Tooltip>

            {!currentTrack ? (
              <FaPlayCircle size={28} onClick={() => currentTrack && handleTogglePlay(currentTrack)} />
            ) : currentTrack.isPlay || playing ? (
              <FaPauseCircle size={28} onClick={() => handleTogglePlay(currentTrack)} />
            ) : (
              <FaPlayCircle size={28} onClick={() => handleTogglePlay(currentTrack)} />
            )}

            <Tooltip content="Next">
              <RxTrackNext />
            </Tooltip>
            <Tooltip content="Repeat">
              <IoRepeat />
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}
