export function formatDuration(seconds: number, format: "hh:mm:ss" | "mm:ss") {
  const date = new Date(seconds * 1000);

  return format === "hh:mm:ss" ? date.toISOString().slice(11, 19) : date.toISOString().slice(14, 19);
}

export const splitArray = (array: unknown[], size: number) => {
  const chunkedArr = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArr.push(array.slice(i, i + size));
  }
  return chunkedArr;
};