"use client";

import Terlintas from "../../public/album/terdalam.jpeg"
import Topbar from "../components/topbar";
import TopCardSong from "../components/topSongCard";
import RecommendedSection from "@/components/recommendedSection";

export default function Home() {
  const globalList = [
    {
      id: 1,
      image: Terlintas,
      title: "Sialnya, hidup terus berjalan",
      artist: "Bernadya",
      isDownload: false,
      isLike: true,
    },
    {
      id: 2,
      image: Terlintas,
      title: "Terlintas",
      artist: "Bernadya",
      isDownload: false,
      isLike: false,
    },
    {
      id: 3,
      image: Terlintas,
      title: "Lama - lama",
      artist: "Bernadya",
      isDownload: false,
      isLike: true,
    },
    {
      id: 4,
      image: Terlintas,
      title: "Satu Bulan",
      artist: "Bernadya",
      isDownload: false,
      isLike: false,
    },
  ];

  const indonesiaList = [
    {
      id: 4,
      image: Terlintas,
      title: "Satu Bulan",
      artist: "Bernadya",
      isDownload: false,
      isLike: false,
    },
    {
      id: 5,
      image: Terlintas,
      title: "Kini mereka tahu",
      artist: "Bernadya",
      isDownload: false,
      isLike: true,
    },
    {
      id: 6,
      image: Terlintas,
      title: "Masa sepi",
      artist: "Bernadya",
      isDownload: false,
      isLike: false,
    },
    {
      id: 7,
      image: Terlintas,
      title: "Untungnya, bumi terus berputar",
      artist: "Bernadya",
      isDownload: false,
      isLike: true,
    },
  ];


  // function play () {
  //   new Audio("/audio/bernadya.mp3").play();
  // }

  // useEffect(() => {
  //   const audio = new Audio("/audio/bernadya.mp3"); // Reference as if it’s at the root
  //   audio.play().catch((error) => {
  //     console.error("Failed to play audio:", error);
  //   });

  //   return () => {
  //     audio.pause();
  //     audio.currentTime = 0;
  //   };
  // }, []);


  return (
    <div className="flex flex-col text-black shadow-lg h-full">
      <Topbar />
      <RecommendedSection />
      <div className="grid grid-cols-2 gap-4 flex-1 px-4 pb-4">
        <TopCardSong title="TOP 10 Global" list={globalList} />
        <TopCardSong title="TOP 10 Indonesia" list={indonesiaList} />
      </div>
    </div>
  );
}
