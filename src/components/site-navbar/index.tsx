"use client"
import React from 'react'
import Link from "next/link";
import { GoGear, GoHomeFill } from 'react-icons/go';
import { RiCompassDiscoverLine } from 'react-icons/ri';
import { LuLibrary } from 'react-icons/lu';
import { IoMdHeartEmpty } from 'react-icons/io';
import { usePathname } from 'next/navigation';
import { TiPlus } from 'react-icons/ti';
import { BiLogoSoundcloud } from 'react-icons/bi';
import { Em } from '@radix-ui/themes';

export default function Navbar() {
  const location = usePathname();

  const navList = [
    {
      icon: <GoHomeFill className='text-black dark:text-white' />,
      label: "Home",
      link: "/",
    },
    {
      icon: <RiCompassDiscoverLine className='text-black dark:text-white' />,
      label: "Discover",
      link: "/discover",
    },
    {
      icon: <LuLibrary className='text-black dark:text-white' />,
      label: "Library",
      link: "/library",
    },
    {
      icon: <IoMdHeartEmpty className='text-black dark:text-white' />,
      label: "Liked Songs",
      link: "/liked",
    },
    {
      icon: <GoGear className='text-black dark:text-white' />,
      label: "Settings",
      link: "/settings",
    },
  ];

  const playList = [
    {
      album: <div className="w-5 h-5 bg-gradient-to-tr from-slate-900 to-purple-500 rounded-md"></div>,
      label: "Mei Playlist",
      link: "/mei-playlist",
    },
    {
      album: <div className="w-5 h-5 bg-gradient-to-tr from-blue-600 to-lime-500 rounded-md"></div>,
      label: "Juni Playlist",
      link: "/juni-playlist",
    },
    {
      album: <div className="w-5 h-5 bg-gradient-to-tr from-red-600 to-pink-100 rounded-md"></div>,
      label: "July Playlist",
      link: "/july-playlist",
    },
    {
      album: "",
      label: <div className='text-orange-500 flex gap-2'>Create new playlist <TiPlus size={16} /></div>,
      link: "/add-playlist",
    },
  ]; 

  return (
    <div className="w-60 py-4 bg-zinc-100 dark:bg-zinc-950 flex flex-col items-start border-r-2 border-zinc-200 dark:border-zinc-800">
      {/* <Image src={Logo} alt="logo" className="mb-8 ml-4" /> */}
      <div className="flex items-center gap-2 text-orange-500">
        <BiLogoSoundcloud className="mb-8 ml-4" size={48} />
        <div className="h-14 font-bold">
          Sound<Em>Bank</Em>
        </div>
      </div>
      <h5 className="text-zinc-400 ml-4 mb-2 font-semibold text-sm">Menu</h5>
      <nav className="flex flex-col w-full">
        {navList.map((item) => (
          <Link href={item.link} key={item.label} className={`flex items-center gap-2 p-2 px-4 ${item.link === location ? "bg-zinc-200 dark:bg-zinc-900 font-semibold" : "hover:bg-zinc-200 dark:hover:bg-zinc-900"}`}>
            <div>{item.icon}</div>
            <h6 className="text-xs text-black dark:text-white">{item.label}</h6>
          </Link>
        ))}
      </nav>

      <div className="p-2 px-4 w-full">
        <div className="border-b border-zinc-200 dark:border-gray-950 w-full"></div>
      </div>
      <h5 className="text-zinc-400 ml-4 my-2 font-semibold text-sm">Playlists</h5>
      <nav className="flex flex-col w-full">
        {playList.map((item, index) => (
          <div key={index} className="flex items-center gap-2 hover:bg-zinc-200 dark:hover:bg-zinc-900 p-2 px-4 hover:font-semibold">
            {item.album}
            <Link href={item.link} className="text-xs text-black dark:text-white">
              <span>{item.label}</span>
            </Link>
          </div>
        ))}
      </nav>
    </div>
  );
}
