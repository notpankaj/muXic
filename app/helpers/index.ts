export function msConversion(millis: number) {
  return (millis / 100).toFixed(2);
}

export function buildSectionList(data: AudioType[]) {
  const temp = [];
  let prevLetter = '';
  for (let i of data) {
    const firstLetter = i.title.trimStart()[0].toUpperCase();

    if (prevLetter !== firstLetter) {
      const row = data.filter(
        item => item.title.trimStart()[0].toUpperCase() === firstLetter,
      );
      // console.log(row);
      temp.push({title: firstLetter.toUpperCase(), data: row});
      prevLetter = firstLetter;
    }
  }
  return temp;
}
