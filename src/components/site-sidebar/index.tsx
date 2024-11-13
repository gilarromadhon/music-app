"use client"

import React, { useRef } from "react";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { TbDotsVertical } from "react-icons/tb";
import { VscSettings } from "react-icons/vsc";
import { PiBellSimple } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { splitArray } from "../../lib/utils/misc";
import Slider from "react-slick";
import MusicPlayer from "../musicPlayer";
import { Flex, Tooltip } from "@radix-ui/themes";
import { useTheme } from "next-themes";
import { IoSunnyOutline } from "react-icons/io5";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { Song } from "@/lib/types/song";
import { togglePlayPause as togglePlay } from "@/store/listSong/recommendSlice";
import { setTrack } from "@/store/trackSlice";

export default function Sidebar() {
  const dispatch = useDispatch();
  const likedTrack = useSelector((state: RootState) => state.liked.list);
  const { theme, setTheme } = useTheme();

  const itemGroups = splitArray(likedTrack, 3);

  const sliderRef = useRef<Slider>(null);
  const next = () => {
    sliderRef.current?.slickNext();
  };
  const previous = () => {
    sliderRef.current?.slickPrev();
  };
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handlePlay = (track: Song) => {
    dispatch(togglePlay(track.id));
    dispatch(setTrack(track));
  };

  return (
    <div className="w-72 py-4 bg-zinc-50 dark:bg-zinc-950 flex flex-col items-start justify-start border-l border-zinc-200 dark:border-zinc-800">
      <div className="flex px-4 justify-between items-center mb-4 w-full">
        <div className="flex gap-2">
          <Tooltip content="Settings">
            <div className="text-black dark:text-white rounded-full border border-zinc-200 dark:border-zinc-700 p-2">
              <VscSettings className="cursor-pointer" />
            </div>
          </Tooltip>
          <Tooltip content="Notification">
            <div className="text-black dark:text-white rounded-full border border-zinc-200 dark:border-zinc-700 p-2">
              <PiBellSimple className="cursor-pointer" />
            </div>
          </Tooltip>
        </div>
        <Tooltip content={theme === "dark" ? "Light Mode" : "Dark Mode"}>
          {theme === "dark" ? <IoSunnyOutline className="cursor-pointer" size={18} onClick={() => setTheme("light")} /> : <BsFillMoonStarsFill className="cursor-pointer text-black" onClick={() => setTheme("dark")} />}
        </Tooltip>
      </div>
      <div className="flex flex-col justify-between w-full h-full">
        <div className="flex flex-col text-black dark:text-white min-w-full max-w-full min-h-64 max-h-64">
          <Flex direction={"row"} justify={"between"} className="w-full px-4 mb-4">
            <h1 className="font-bold text-xl tracking-tighter select-none">Liked Songs</h1>
            <div className="flex justify-between items-center mb-2 text-orange-500">
              <IoIosArrowBack onClick={previous} />
              <IoIosArrowForward onClick={next} />
            </div>
          </Flex>
          {!likedTrack || likedTrack.length == 0 ? (
            <div className="px-4 text-xs">No Favorite Song</div>
          ) : (
            <div className="scroll-container flex overflow-x-auto overflow-y-hidden">
              <Slider className="w-full" ref={sliderRef} {...settings}>
                {itemGroups.map((group, index) => (
                  <div key={index} className="min-w-full h-56">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {group.map((item: any, index: number) => (
                      <div
                        key={index}
                        onClick={() => handlePlay(item)}
                        className={`flex flex-row flex-wrap items-center gap-4 px-4 py-2 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-900 ${index === likedTrack.length - 1 ? "" : "border-b-2 border-zinc-100 dark:border-zinc-900"}`}
                      >
                        <Image src={item.image} alt="album" className="rounded-md" width={48} height={48} />
                        <div className="flex-1 truncate">
                          <h1 className="font-semibold text-sm leading-tight">{item.title}</h1>
                          <h4 className="font-medium text-zinc-400 text-xs">{item.artist}</h4>
                        </div>
                        <div className="flex gap-2">
                          <TbDotsVertical className="cursor-pointer" />
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </Slider>
            </div>
          )}
        </div>

        <MusicPlayer />
      </div>
    </div>
  );
}
