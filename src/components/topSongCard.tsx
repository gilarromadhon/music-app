"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BsArrowDownCircle, BsArrowDownCircleFill } from "react-icons/bs";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { TbDotsVertical } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { likedSong, unlikedSong } from "../store/likedSlice";
import { RootState } from "../store/store";
import { Song } from "../lib/types/song";

export default function TopCardSong({ title, list }: { title: string; list: Array<Song> }) {
  const dispatch = useDispatch();
  const likedTrack = useSelector((state: RootState) => state.liked.list);
  const [globalList, setGlobalList] = useState<Song[]>(list); 

  const handleLike = (track: Song) => {
    setGlobalList((prevList) => prevList.map((item) => (item.id === track.id ? { ...item, isLike: !item.isLike } : item)));
    dispatch(likedSong(track));
  };

  const handleUnlike = (track: Song) => {
    setGlobalList((prevList) => prevList.map((item) => (item.id === track.id ? { ...item, isLike: !item.isLike } : item)));
    dispatch(unlikedSong(track.id));
  };

  useEffect(() => {
    const updatedList = list.map(item => ({
      ...item,
      isLike: likedTrack.some(likedItem => likedItem.id === item.id)
    }));
    setGlobalList(updatedList); 
  }, [list, likedTrack]);

  return (
    <div className="flex flex-col bg-white dark:bg-zinc-950 rounded-2xl shadow-lg">
      <div className="flex items-center justify-between w-full mb-4 px-4 pt-4">
        <h1 className="font-bold text-xl tracking-tighter text-black dark:text-white">{title}</h1>
        <p className="text-orange-400 text-xs font-medium cursor-pointer">See All</p>
      </div>
      {globalList.map((item, index) => (
        <div key={index} className={`select-none flex flex-row flex-wrap items-center gap-4 p-2 px-4 hover:bg-zinc-100 dark:hover:bg-zinc-900 ${index === globalList.length - 1 ? "" : "border-b border-zinc-100 dark:border-zinc-800"}`}>
          <h1 className="text-orange-400 font-bold">{`0${index + 1}`}</h1>
          <Image src={item.image} alt="album" className="rounded-md" width={48} height={48} />
          <div className="flex-1 overflow-hidden whitespace-nowrap">
            <h1 className="font-bold text-sm text-ellipsis text-black dark:text-white">{item.title}</h1>
            <h4 className="font-medium text-zinc-400 text-xs">{item.artist}</h4>
          </div>
          <div className="flex gap-2 text-black dark:text-zinc-500">
            {item.isDownload ? <BsArrowDownCircleFill className="cursor-pointer text-blue-500" /> : <BsArrowDownCircle className="cursor-pointer" />}
            {item.isLike ? <IoMdHeart className="cursor-pointer text-red-500" onClick={() => handleUnlike(item)} /> : <IoMdHeartEmpty className="cursor-pointer" onClick={() => handleLike(item)} />}
            <TbDotsVertical className="cursor-pointer" />
          </div>
        </div>
      ))}
    </div>
  );
}
