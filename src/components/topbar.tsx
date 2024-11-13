"use client"
import { Avatar } from '@radix-ui/themes';
import React from 'react'

export default function Topbar() {

  return (
    <div className="flex justify-between items-center p-4">
      <div>
        <input placeholder="Search by artist, song or albums" className="text-black dark:text-white rounded-3xl border border-zinc-200 dark:border-zinc-700 w-60 p-2 px-4 text-xs bg-zinc-100 dark:bg-zinc-900" />
      </div>
      <div className="flex items-center gap-2 p-1 rounded-3xl border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 text-xs w-24 text-black dark:text-white">
        <Avatar 
          src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop" 
          fallback="A" 
          size="1"
          radius="full"
        />
        <h1>Gilar</h1>
      </div>
    </div>
  );
}
