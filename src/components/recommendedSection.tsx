"use client"
import { Song } from '@/lib/types/song';
import { RootState } from '@/store/store';
import { setHardcodedTracks, togglePlayPause as togglePlay } from "@/store/listSong/recommendSlice";
import { setTrack, togglePlayPause as togglePlayPauseMusic } from "@/store/trackSlice";
import { Flex } from '@radix-ui/themes';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react'
import { FaPauseCircle } from 'react-icons/fa';
import { FaCirclePlay } from 'react-icons/fa6';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';

export default function RecommendedSection() {
  const dispatch = useDispatch();
  const recommendList = useSelector((state: RootState) => state.song.songs);

  useEffect(() => {
    dispatch(setHardcodedTracks());
  }, [dispatch]);

  const handlePlay = (track: Song) => {
    dispatch(togglePlay(track.id));
    dispatch(setTrack(track));
  };

  const handlePause = (track: Song) => {
    dispatch(togglePlayPauseMusic());
    dispatch(togglePlay(track.id));
  };

  const scrollContainerRef = useRef<any>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col">
      <Flex direction={"row"} justify={"between"} className="px-4">
        <h1 className="font-bold text-xl mb-2 tracking-tighter text-black dark:text-white">Recommended for you</h1>
        <div className="flex justify-between items-center mb-2 text-orange-500">
          <IoIosArrowBack onClick={scrollLeft} />
          <IoIosArrowForward onClick={scrollRight} />
        </div>
      </Flex>

      <div className="scroll-container flex overflow-x-auto gap-4 px-4 pb-4" ref={scrollContainerRef} style={{ scrollBehavior: "smooth" }}>
        {recommendList.map((item, index) => (
          <div key={item.id} className="bg-white dark:bg-zinc-950 shadow-lg flex flex-col p-1 rounded-2xl min-w-44 max-w-44 h-56 select-none">
            <div className="relative rounded-xl aspect-square w-full overflow-hidden bg-cover bg-no-repeat">
              <Image src={item.image} alt="album" className="transition duration-300 ease-in-out hover:scale-110" />
            </div>
            <div className="flex justify-between items-center p-1 py-2 gap-2">
              <div className="w-10/12 overflow-hidden whitespace-nowrap">
                <h1 className="font-bold text-sm truncate text-black dark:text-white running-text">{item.title}</h1>
                <h4 className="font-medium text-zinc-400 text-xs text-ellipsis">{item.artist}</h4>
              </div>
              <div className="w-2/12 text-black dark:text-white">{item.isPlay ? <FaPauseCircle size={24} className="cursor-pointer" onClick={() => handlePause(item)} /> : <FaCirclePlay size={24} className="cursor-pointer" onClick={() => handlePlay(item)} />}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
