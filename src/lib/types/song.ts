import { StaticImageData } from "next/image";

export type Song = {
  id: number;
  image: StaticImageData;
  title: string;
  artist: string;
  duration?: string;
  isPlay?: boolean;
  isLike?: boolean;
  isDownload?: boolean;
  music?: string;
};
