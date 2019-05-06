export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRangeArray(start, end) {
  var list = [];
  for (var i = start; i <= end; i++) {
    list.push(i);
  }

  return list;
}
